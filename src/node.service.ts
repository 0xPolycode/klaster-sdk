import { Address } from "viem";
import {
  ApiPaymentData,
  ApiUserOp,
  ItxStatusResponse,
  QuoteResponse,
} from "./types";
import axios, { AxiosInstance } from "axios";
import { parseKlasterNodeError } from "./utils/error.service";

export class KlasterNodeService {
  private nodeUrl: string;
  client: AxiosInstance;

  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
    this.client = axios.create({
      baseURL: this.nodeUrl,
    });
  }

  async getQuote(userOps: ApiUserOp[], paymentInfo: ApiPaymentData) {
    const mappedOps = userOps.map((userOp) => {
      return { ...userOp, chainId: userOp.chainId.toString() };
    });
    try {
      const response = await this.client.post("quote", {
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

  async executeTx(quoteResponse: QuoteResponse, signedHash: string) {
    const request = { ...quoteResponse, signature: signedHash };
    try {
      const response = await this.client.post("execute", request);
      return response.data;
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

  async getWallet(masterWallet: string, salt: string): Promise<Address> {
    try {
      const response = await this.client.get(`address/${masterWallet}/${salt}`);
      return response.data.wallet;
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
