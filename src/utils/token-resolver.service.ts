import axios from "axios";

interface TokenInfo {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
}

interface ChainInfo {
  chainId: string;
  name: string;
}

interface ApiResponse {
  version: string;
  node: string;
  supported_chains: ChainInfo[];
  supported_gas_tokens: {
    chainId: string;
    paymentTokens: TokenInfo[];
  }[];
}

class ChainTokenService {
  private data: ApiResponse | null = null;

  /**
   * Creates an instance of ChainTokenService.
   * @param {string} apiUrl - The URL of the API endpoint
   */
  constructor(
    private apiUrl: string = "https://klaster-node.polycode.sh/info",
  ) {}

  /**
   * Initializes the service by fetching and processing data from the API
   * @returns {Promise<void>}
   * @throws {Error} If there's an error fetching or processing the data
   */
  async init(): Promise<void> {
    try {
      const response = await axios.get<ApiResponse>(this.apiUrl);
      this.data = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * Resolves a token based on its symbol and chain ID.
   *
   * @param {string} symbol - The symbol of the token to resolve.
   * @param {number} chainId - The ID of the blockchain.
   * @throws {Error} If no payment tokens are found for the specified chain ID.
   * @throws {Error} If the specified token symbol is not supported on the given chain.
   * @returns {void}
   */
  resolveToken(symbol: string, chainId: number) {
    const tokensForChain = this.data?.supported_gas_tokens.find(
      (x) => x.chainId === chainId.toString(),
    );
    if (!tokensForChain) {
      throw Error(`No payment tokens found for chain ${chainId}. This may indicate that the node does not support
        ${chainId}`);
    }
    const token = tokensForChain.paymentTokens.find(
      (x) => x.symbol.toLowerCase() === symbol.toLowerCase(),
    );
    if (!token) {
      throw Error(
        `The token ${symbol} is not supported as a payment token on chain ${chainId}. Please change the payment token`,
      );
    }
    return token
  }
}

const service = new ChainTokenService();
service.init();

/**
 * Represents the symbol of a payment token supported by the system.
 * These symbols correspond to various tokens
 * that can be used for payments across different blockchain networks.
 */
export type PaymentTokenSymbol =
  | "ETH"
  | "WETH"
  | "LINK"
  | "USDC"
  | "wstETH"
  | "USDT"
  | "MATIC"
  | "WMATIC"
  | "stMATIC"
  | "AVAX"
  | "WAVAX"
  | "BNB"
  | "WBNB"
  | "axlUSDC"
  | "crUSDC"
  | "BSC-USD";

/**
 * Resolves a payment token based on its symbol and the chain ID.
 * 
 * @param {PaymentTokenSymbol} symbol - The symbol of the payment token to resolve.
 * @param {number} chainId - The ID of the blockchain network.
 * @returns {Promise<ResolvedToken>} A promise that resolves to the token information.
 * @throws {Error} If the token cannot be resolved for the given chain ID.
 */
export function resolveToken(symbol: PaymentTokenSymbol, chainId: number) {
  return service.resolveToken(symbol, chainId);
}
