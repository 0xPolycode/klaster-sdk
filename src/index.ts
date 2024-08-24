import { Address } from "viem";
import { KlasterNodeService } from "./node.service";
import {
  TxFeeParams,
  ExecuteResponse,
  InterchainTransaction,
  QuoteResponse,
  RawTransaction,
  MultichainTokenMapping,
} from "./types";
import { encodeSmartAccountCall } from "./utils/encoding.service";
import { SaltUtil } from "./utils/salt.service";
import { AccountInitData, MultichainAccount } from "./accounts/account.service";
import { sepolia } from "viem/chains";
import { PaymentTokenSymbol, resolveToken } from "./utils/token-utils/token-resolver.service";

export * from "./types";
export * from "./utils/encoding.service";
export * from "./utils/itx.service";
export * from "./utils/salt.service";
export * from "./utils/token-utils/token-resolver.service";
export * from "./utils/token-utils/token-utilization-strategy.service";
export * from "./utils/token-utils/erc20-encoder.service";
export * from "./utils/constants/node-url.constants";
export * from "./utils/chains.service";
export * from "./utils/token-mapping.service";
export * from "./utils/constants/common-tokens.constants";
export * from './accounts/account.service'
export * from './accounts/account-vendors/biconomy.account'
export * from './accounts/account-vendors/safe.account'

export { Address } from "viem";

export type Config<T> = {
  nodeUrl: string;
  accountInitData: T;
};

export async function initKlaster<T extends AccountInitData<Object>>(
  config: Config<T>,
) {
  return await KlasterSDK.init(config);
}

export class KlasterSDK<T extends AccountInitData<Object>> {
  private nodeService: KlasterNodeService;
  activeAccountSalt = SaltUtil.firstAccount();
  private accountInitData: T;

  // Multichain account can't be accessed until it's set since the constructor is set to private
  // and the init function is async and will not return a value until a multichain account is set.
  account!: MultichainAccount;

  private constructor(config: Config<T>) {
    this.nodeService = new KlasterNodeService(config.nodeUrl);
    this.accountInitData = config.accountInitData;
  }

  public static async init<T extends AccountInitData<Object>>(config: Config<T>) {
    const sdk = new KlasterSDK(config);
    await sdk.initMultichainAccount();
    return sdk;
  }

  private async initMultichainAccount() {
    const accountData = await this.nodeService.getWallet(this.accountInitData.accountProviderId, 
      this.accountInitData.encodeAccountCreationFactoryData())
    this.account = new MultichainAccount(accountData.multichainAccount, this.accountInitData);
  }

  async getQuote(itx: InterchainTransaction) {
    const batches = itx.steps;
    if (batches.length === 0) {
      throw Error(`An iTx cannot have an empty batches array.`);
    }

    const userOps = batches.map((batch) => {
      const address = this.account.getAddress(batch.chainId);
      if (!address) {
        throw Error(
          `Smart contract account not avaialble on chain ${batch.chainId}. Account data: ${this.accountInitData}`,
        );
      }
      return encodeSmartAccountCall(batch.chainId, batch.txs)
    });

    return await this.nodeService.getQuote(this.account, userOps, itx.feeTx)
  }

  encodePaymentFee(chainId: number, token: PaymentTokenSymbol): TxFeeParams {
    const tokenInfo = resolveToken(token, chainId)
    return {
      chainId: chainId,
      token: tokenInfo.address
    }
  }

  async execute(
    response: QuoteResponse,
    signedHash: string,
  ): Promise<ExecuteResponse> {
    const walletProvider = this.accountInitData.accountProviderId
    return await this.nodeService.executeTx(response, signedHash, walletProvider);
  }

  async autoExecute(
    itx: InterchainTransaction,
    signHash: (hash: `0x${string}`) => Promise<string>,
  ) {
    const quote = await this.getQuote(itx);
    const signedHash = await signHash(quote.itxHash);
    return await this.execute(quote, signedHash);
  }
}
