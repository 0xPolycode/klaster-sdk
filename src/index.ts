import { Address } from "viem";
import { KlasterNodeService } from "./node.service";
import {
  ApiPaymentData,
  ExecuteResponse,
  InterchainTransaction,
  MultichainAccount,
  QuoteResponse,
  RawTransaction,
} from "./types";
import { EncodingService } from "./utils/encoding.service";
import { SaltUtil } from "./utils/salt.service";
import {
  ChainTokenPair,
  getPaymentToken,
} from "./utils/token-resolver.service";
import { buildTransferERC20FromEoaTx } from "./utils/utils.service";

export * from "./types";
export * from "./utils/encoding.service";
export * from "./utils/itx.service";
export * from "./utils/salt.service";
export * from "./utils/token-resolver.service";
export * from "./utils/utils.service";

export type Config = {
  nodeUrl: string;
  masterAddress: Address;
};

// Initialize the Klaster SDK
export function initKlaster(config: Config) {
  return new KlasterSDK(config);
}

export class KlasterSDK {
  private nodeService: KlasterNodeService;
  activeAccountSalt = SaltUtil.firstAccount();

  masterAddress: Address;

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
    const multichainAccount = await this.nodeService.getWallet(
      this.masterAddress,
      this.activeAccountSalt,
    );
    return {
      salt: this.activeAccountSalt,
      address: multichainAccount,
    };
  }

  // A helper function, which makes preparing the ApiPaymentData object
  // developer friendly.
  //
  // @param token - the human-readable representation of the accepted
  // payment token (e.g. usdc, link, eth ...)
  // @param chainId - the chainId of the chain on which you plan to pay
  // for the transaction fee.
  async encodeTxFee(paymentToken: ChainTokenPair): Promise<ApiPaymentData> {
    const account = await this.getMultichainAccount();

    const tokenAddress = getPaymentToken(paymentToken)!

    return {
      chainId: 10,
      masterWallet: this.masterAddress,
      salt: account.salt,
      token: tokenAddress,
    };
  }

  /** 
   * Fetches a quote for the interchain transaction (iTx). The quote
  * contains the full iTx information as well as the required payment information.
  *
  * @param {InterchainTransaction} itx - The full Interchain Tranasaction object
  */
  async getQuote(itx: InterchainTransaction) {
    const actions = itx.actions;
    if (actions.length === 0) {
      throw Error(`An iTx cannot have an empty actions array.`);
    }

    const userOps = actions.map((action) => {
      return action.txs.length === 1
        ? EncodingService.encodeUserOpCall(
            action.txs[0],
            action.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          )
        : EncodingService.encodeBatchCall(
            action.txs,
            action.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          );
    });

    return await this.nodeService.getQuote(userOps, itx.paymentInfo);
  }

  /**
   * Executes the Interchain Transaction.
   *
   * After calling the execute function with the signed iTx hash, it's impossible
   * to prevent the Klaster network from executing the transaction.
   *
   * @remarks
   * The hash must be signed by using the personalSign method.
   * Some libraries force a different signing scheme. If you get an
   * invalid merkle hash error - please make sure you're using the personalSign
   * method.
   *
   * @param {QuoteResponse} response - The response object which was returned when calling the `quote`
   * endpoint
   * @param {string} signedHash - The iTx hash, signed by the wallet.
   * @returns {Promise<ExecuteResponse>} An object containing the iTx hash of the executed iTx
   *
   * @example
   * const quoteResponse = await getQuote(...);
   * const signedHash = await client.(quoteResponse.hash);
   * const executeResponse = await execute(quoteResponse, signedHash);
   */
  async execute(
    response: QuoteResponse,
    signedHash: string,
  ): Promise<ExecuteResponse> {
    return await this.nodeService.executeTx(response, signedHash);
  }

  /** Fetches the quote and executes the Interchain Transaction.
   *
   * @param itx - The interchain transaction object containing the transactions
   * you wish to execute.
   * @param signHash - A function to sign the iTx hash with a private key. When the
   * autoExecute function fetches a quote from the Klaster network, it will use this
   * function to sign the transaction.
   */
  async autoExecute(
    itx: InterchainTransaction,
    signHash: (hash: `0x${string}`) => Promise<string>,
  ) {
    const quote = await this.getQuote(itx);
    const signedHash = await signHash(quote.itxHash);
    return await this.execute(quote, signedHash);
  }

  /** Transfers ERC20 tokens to the multichain smart contract account and
   * executes the desired actions across multiple blockchains.
   * @param transferToSmartAccount - The instructions for the transfer of the ERC20 token to the
   * smart account address. Use `executeTxAction` to send the generated `RawTransaction` to the
   * blockchain, with the provider you are using. Consult the Klaster docs for details.
   *
   * @param executeItx - The instructions for executing the iTx. The iTx will be executed after
   * the `transferToSmartAccount` has been accepted on the blockchain. Use the `signItxHashAction`
   * to sign the generated iTx hash with the provider you are using. Consult Kalaster docs for details.
   */
  async transferAndExecute(params: {
    transferToSmartAccount: {
      tokenToTransfer: Address;
      amountToTransfer: bigint;
      chainId: number;
      executeTxAction: (tx: RawTransaction) => Promise<void>;
    };
    executeItx: {
      iTx: InterchainTransaction;
      signItxHashAction: (hash: Address) => Promise<string>;
    };
  }) {
    const multichainAcc = await this.getMultichainAccount();
    const transferTx = buildTransferERC20FromEoaTx({
      token: params.transferToSmartAccount.tokenToTransfer,
      amount: params.transferToSmartAccount.amountToTransfer,
      chainId: params.transferToSmartAccount.chainId,
      recipient: multichainAcc.address,
    });
    await params.transferToSmartAccount.executeTxAction(transferTx);
    const quote = await this.getQuote(params.executeItx.iTx);
    const signed = await params.executeItx.signItxHashAction(quote.itxHash);
    return await this.execute(quote, signed);
  }
}
