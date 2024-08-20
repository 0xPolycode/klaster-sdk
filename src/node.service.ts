import { Address, Hex } from "viem";
import {
  TxFeeParams,
  ApiUserOp,
  ExecuteResponse,
  ItxStatusResponse,
  QuoteResponse,
  AccountData,
} from "./types";
import axios, { AxiosInstance } from "axios";
import { parseKlasterNodeError } from "./error.service";
import { MultichainAccount } from "./accounts/account.service";


export class KlasterNodeService {
  private nodeUrl: string;
  client: AxiosInstance;

  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
    this.client = axios.create({
      baseURL: this.nodeUrl,
    });
  }

  async getQuote(multichainAccount: MultichainAccount, userOps: ApiUserOp[], paymentInfo: TxFeeParams) {
    const mappedOps = userOps.map((userOp) => {
      return { ...userOp, chainId: userOp.chainId.toString() };
    });
    try {
      const accountInitData = multichainAccount.accountInitData
      const response = await this.client.post("quote-generic", {
        walletProvider: accountInitData.accountProviderId,
        factoryData: accountInitData.encodeAccountCreationFactoryData(),
        userOps: mappedOps,
        paymentInfo: {
          ...paymentInfo,
          chainId: paymentInfo.chainId.toString(),
        },
      });

      return response.data as QuoteResponse;
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

  async executeTx(quoteResponse: QuoteResponse, signedHash: string): Promise<ExecuteResponse> {
    const request = { ...quoteResponse, signature: signedHash };
    try {
      const response = await this.client.post("execute", request);
      return response.data;
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

  async getWallet(walletProvider: string, factoryData: Hex): Promise<AccountData> {
    try {
      const response = await this.client.get(`address/${walletProvider}/${factoryData}`);
      const data: AccountData = await response.data;
      return {...data, multichainAccount: data.multichainAccount.map(acc => {
        return {...acc, chainId: parseInt(acc.chainId as any)}
      })}
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

  async getItxStatus(hash: string): Promise<ItxStatusResponse> {
    try {
      const response = await this.client.get(`explorer/${hash}`);
      return response.data as ItxStatusResponse;
    } catch (e) {
      throw Error(parseKlasterNodeError(e));
    }
  }
}
