import { Address } from "viem";
import { KlasterNodeService } from "./node.service";
import {
  ApiPaymentData,
  ExecuteResponse,
  InterchainTransaction,
  MultichainAccount,
  QuoteResponse,
} from "./types";
import { EncodingService } from "./utils/encoding.service";
import { SaltUtil } from "./utils/salt.service";
import { resolveToken } from "./utils/token-resolver.service";

export * from "./types";
export * from "./utils/encoding.service";
export * from "./utils/itx.service";
export * from "./utils/salt.service";
export * from "./utils/token-resolver.service";

export type Config = {
  nodeUrl: string,
  masterAddress: Address
};

export class KlasterSDK {
  private nodeService: KlasterNodeService;
  activeAccountSalt = SaltUtil.firstAccount();

  private masterAddress: Address | null;

  constructor(config: Config) {
    this.nodeService = new KlasterNodeService(config.nodeUrl);
    this.masterAddress = config.masterAddress;
  }

  // Changes the `masterWallet` parameter, which is used to 
  // derive an ERC4337 multichain smart account in 
  // tandem with the `salt` parameter.
  changeMasterAddress(wallet: Address) {
    this.masterAddress = wallet;
  }

  // Changes the `salt` parameter, which is used to 
  // derive an ERC4337 multichain smart account from 
  // the connected EOA account
  changeAccountSalt(salt: string) {
    this.activeAccountSalt = salt;
  }

  // Fetches the multichain ERC4337 account derived by taking 
  // the `masterWallet` and `salt` parameters which were set when
  // initializing the SDK. 
  // 
  // If you wish to fetch a different wallet, please call the 
  // `changeMasterAddress` or `changeAccountSalt` functions to set
  // different masterWallet and salt variables.
  async getMultichainAccount(): Promise<MultichainAccount> {
    const masterWallet = await this.getMasterWallet();
    const multichainAccount = await this.nodeService.getWallet(
      masterWallet,
      this.activeAccountSalt
    );
    return {
      salt: this.activeAccountSalt,
      address: multichainAccount,
    };
  }

  // Fetches the wallet which was set as the master wallet when
  // initializing the SDK. If you wish to change the master wallet, 
  // please call the `changeMasterWallet` function on the SDK object.
  async getMasterWallet(): Promise<Address> {
    if (this.masterAddress) {
      return this.masterAddress;
    }
    throw Error("Master wallet not hoisted to KlasterSDK.");
  }

  // A helper function, which makes preparing the ApiPaymentData object 
  // developer friendly.
  // 
  // @param token - the human-readable representation of the accepted 
  // payment token (e.g. usdc, link, eth ...)
  // @param chainId - the chainId of the chain on which you plan to pay
  // for the transaction fee.
  async encodeTxFee(
    token: Token,
    chainId: number,
  ): Promise<ApiPaymentData> {
    const account = await this.getMultichainAccount();

    const masterWallet = await this.getMasterWallet();
    const tokenAddress = resolveToken(token, chainId);
    return {
      chainId: chainId,
      masterWallet: masterWallet,
      salt: account.salt,
      token: tokenAddress,
    };
  }

  setActiveAccountSalt(salt: string) {
    this.activeAccountSalt = salt;
  }

  // Fetches a quote for the interchain transaction (iTx). The quote 
  // contains the full iTx information as well as the required payment information.
  // 
  // @param itx - The full Interchain Tranasaction object
  async getQuote(itx: InterchainTransaction) {
    const actions = itx.actions;
    if (actions.length === 0) {
      throw Error(`Actions array empty for iTx`);
    }

    const masterWallet = await this.getMasterWallet();
    const userOps = actions.map((action) => {
      return action.txs.length === 0
        ? EncodingService.encodeUserOpCall(
            action.txs[0],
            action.chainId,
            masterWallet,
            this.activeAccountSalt
          )
        : EncodingService.encodeBatchCall(
            action.txs,
            action.chainId,
            masterWallet,
            this.activeAccountSalt
          );
    });

    return await this.nodeService.getQuote(userOps, itx.paymentInfo);
  }

  // Executes the Interchain Transaction. After calling the execute function with
  // the signed iTx hash, it's impossible to prevent the Klaster network from
  // executing the transaction
  // 
  // @remarks
  // 
  // The hash must be signed by using the personalSign method.
  // Some libraries force a different signing scheme. If you get an 
  // invalid merkle hash error - please make sure you're using the personalSign 
  // method.
  // 
  // @param response - The response object which was returned when calling the `quote`
  // endpoint
  // @param signedHash - The iTx hash, signed by the wallet. 
  // 
  async execute(response: QuoteResponse, signedHash: string): Promise<ExecuteResponse> {
    return await this.nodeService.executeTx(response, signedHash);
  }
}

export type Token = "usdt" | "usdc" | "steth" | "link" | "eth" | "matic";
