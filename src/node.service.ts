import { Address } from "viem";
import {
  TxFeeParams,
  ApiUserOp,
  ExecuteResponse,
  ItxStatusResponse,
  QuoteResponse,
} from "./types";
import axios, { AxiosInstance } from "axios";
import { parseKlasterNodeError } from "./error.service";

/**
 * Service class for interacting with a Klaster Node.
 * 
 * This class provides methods to communicate with a Klaster Node, including
 * operations like getting quotes, executing transactions, retrieving wallet
 * addresses, and checking transaction statuses.
 */
export class KlasterNodeService {
  private nodeUrl: string;
  client: AxiosInstance;

  /**
   * Creates an instance of KlasterNodeService.
   * 
   * @param {string} nodeUrl - The URL of the Klaster Node to connect to.
   */
  constructor(nodeUrl: string) {
    this.nodeUrl = nodeUrl;
    this.client = axios.create({
      baseURL: this.nodeUrl,
    });
  }

  /**
   * Fetches a quote for user operations from the Klaster Node.
   * 
   * @async
   * @param {ApiUserOp[]} userOps - An array of user operations to get a quote for.
   * @param {TxFeeParams} paymentInfo - Payment information for the quote.
   * @returns {Promise<QuoteResponse>} A promise that resolves to the quote response.
   * @throws {Error} Throws an error if the request fails, with a parsed error message.
   */
  async getQuote(userOps: ApiUserOp[], paymentInfo: TxFeeParams) {
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

  /**
   * Executes a transaction on the Klaster Node based on a quote response and signed hash.
   * 
   * @async
   * @param {QuoteResponse} quoteResponse - The quote response object.
   * @param {string} signedHash - The signed hash of the transaction.
   * @returns {Promise<ExecuteResponse>} A promise that resolves to the execution response.
   * @throws {Error} Throws an error if the execution fails, with a parsed error message.
   */
  async executeTx(quoteResponse: QuoteResponse, signedHash: string): Promise<ExecuteResponse> {
    const request = { ...quoteResponse, signature: signedHash };
    try {
      const response = await this.client.post("execute", request);
      return response.data;
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

   /**
   * Retrieves a wallet address for a given master wallet and salt. This uses ERC4337
   * account derivation to derive the address of the smart contract wallet.
   * 
   * @async
   * @param {string} masterWallet - The address of the master wallet.
   * @param {string} salt - The salt value used for address derivation.
   * @returns {Promise<Address>} A promise that resolves to the derived wallet address.
   * @throws {Error} Throws an error if the retrieval fails, with a parsed error message.
   */
  async getWallet(masterWallet: string, salt: string): Promise<Address> {
    try {
      const response = await this.client.get(`address/${masterWallet}/${salt}`);
      return response.data.wallet;
    } catch (e: any) {
      throw Error(parseKlasterNodeError(e));
    }
  }

  /**
   * Fetches the status of an interchain transaction (iTx) by its hash.
   * 
   * @async
   * @param {string} hash - The hash of the interchain transaction.
   * @returns {Promise<ItxStatusResponse>} A promise that resolves to the iTx status response.
   * @throws {Error} Throws an error if the status retrieval fails, with a parsed error message.
   */
  async getItxStatus(hash: string): Promise<ItxStatusResponse> {
    try {
      const response = await this.client.get(`explorer/${hash}`);
      return response.data as ItxStatusResponse;
    } catch (e) {
      throw Error(parseKlasterNodeError(e));
    }
  }
}
