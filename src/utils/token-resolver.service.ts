import axios from 'axios';

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

/**
 * Represents the supported blockchain networks for gas fee payments in the Klaster ecosystem.
 * 
 * This type ensures that only valid chain names are used when specifying
 * blockchain networks for gas fee payment operations within the Klaster SDK.
 * 
 * @typedef {('ethereum' | 'optimism' | 'sepolia' | 'polygon' | 'arbitrum-one' | 
*            'arbitrum-sepolia' | 'avalanche-c-chain' | 'scroll' | 
*            'bnb-smart-chain' | 'base')} ChainConstrainer
* 
* @example
* const validGasPaymentChain: ChainConstrainer = 'ethereum';
* // const invalidGasPaymentChain: ChainConstrainer = 'bitcoin'; // This would cause a TypeScript error
*/
type ChainConstrainer =
  | 'ethereum'
  | 'optimism'
  | 'sepolia'
  | 'polygon'
  | 'arbitrum-one'
  | 'arbitrum-sepolia'
  | 'avalanche-c-chain'
  | 'scroll'
  | 'bnb-smart-chain'
  | 'base';

/**
 * Represents the supported token symbols for gas fee payments in the Klaster ecosystem.
 * 
 * This type ensures that only valid token symbols are used when specifying
 * tokens for gas fee payment operations within the Klaster SDK.
 * 
 * @typedef {('eth' | 'weth' | 'link' | 'usdc' | 'wsteth' | 'usdt' | 'matic' | 
*            'wmatic' | 'stmatic' | 'avax' | 'wavax' | 'bnb' | 'wbnb' | 
*            'axlusdc' | 'crusdc' | 'bsc-usd')} TokenConstrainer
* 
* @example
* const validGasPaymentToken: TokenConstrainer = 'usdc';
* // const invalidGasPaymentToken: TokenConstrainer = 'dai'; // This would cause a TypeScript error
*/
type TokenConstrainer =
  | 'eth'
  | 'weth'
  | 'link'
  | 'usdc'
  | 'wsteth'
  | 'usdt'
  | 'matic'
  | 'wmatic'
  | 'stmatic'
  | 'avax'
  | 'wavax'
  | 'bnb'
  | 'wbnb'
  | 'axlusdc'
  | 'crusdc'
  | 'bsc-usd';

/**
 * Represents a valid combination of a chain name and a token symbol for gas fee payments.
 * 
 * This type ensures type safety when specifying chain-token pairs for gas fee payments in the Klaster SDK.
 * It combines a ChainConstrainer and a TokenConstrainer with a hyphen separator.
 * 
 * @typedef {`${ChainConstrainer}-${TokenConstrainer}`} ChainTokenPair
 * 
 * @example
 * const validGasPaymentPair: ChainTokenPair = 'ethereum-usdc';
 * // const invalidGasPaymentPair: ChainTokenPair = 'ethereum-btc'; // This would cause a TypeScript error
 * 
 * @remarks
 * - This type is specifically used to validate payment tokens for covering gas fees in the Klaster ecosystem.
 * - Not all combinations of chains and tokens may be valid or supported for gas fee payments.
 * - The availability of specific tokens for gas fee payments may vary by chain.
 * - Refer to the Klaster documentation for the most up-to-date list of supported chain-token pairs for gas payments.
 */
export type ChainTokenPair = `${ChainConstrainer}-${TokenConstrainer}`;

/**
 * Service class for managing chain and token information
 */
class ChainTokenService {
  private data: ApiResponse | null = null;
  private chainMap: Map<string, Map<string, TokenInfo>> = new Map();
  private chainNameToId: Map<string, string> = new Map();

  /**
   * Creates an instance of ChainTokenService.
   * @param {string} apiUrl - The URL of the API endpoint
   */
  constructor(private apiUrl: string = 'https://klaster-node.polycode.sh/info') {}

  /**
   * Initializes the service by fetching and processing data from the API
   * @returns {Promise<void>}
   * @throws {Error} If there's an error fetching or processing the data
   */
  async init(): Promise<void> {
    try {
      const response = await axios.get<ApiResponse>(this.apiUrl);
      this.data = response.data;
      this.processData();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  /**
   * Processes the fetched data and populates internal data structures
   * @private
   */
  private processData(): void {
    if (!this.data) return;

    this.data.supported_chains.forEach(chain => {
      const camelCaseName = this.toCamelCase(chain.name);
      this.chainNameToId.set(camelCaseName, chain.chainId);
    });

    this.data.supported_gas_tokens.forEach(chain => {
      const tokenMap = new Map<string, TokenInfo>();
      chain.paymentTokens.forEach(token => {
        tokenMap.set(token.symbol.toLowerCase(), token);
      });
      this.chainMap.set(chain.chainId, tokenMap);
    });
  }

  /**
   * Converts a string to camelCase
   * @param {string} str - The string to convert
   * @returns {string} The camelCase version of the input string
   * @private
   */
  private toCamelCase(str: string): string {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  }

  /**
   * Gets the chain ID for a given chain identifier (name or ID)
   * @param {string} chainIdentifier - The chain name or ID
   * @returns {string | undefined} The chain ID, or undefined if not found
   * @private
   */
  private getChainId(chainIdentifier: string): string | undefined {
    if (this.chainMap.has(chainIdentifier)) {
      return chainIdentifier; // It's already a chain ID
    }
    return this.chainNameToId.get(this.toCamelCase(chainIdentifier));
  }

  /**
   * Gets the token address for a given chain and token symbol
   * @param {string} chainIdentifier - The chain name or ID
   * @param {string} tokenSymbol - The token symbol
   * @returns {string | undefined} The token address, or undefined if not found
   */
  getTokenAddress(chainIdentifier: string, tokenSymbol: string): string | undefined {
    const chainId = this.getChainId(chainIdentifier);
    if (!chainId) return undefined;

    const chainTokens = this.chainMap.get(chainId);
    if (!chainTokens) return undefined;

    const token = chainTokens.get(tokenSymbol.toLowerCase());
    return token?.address;
  }

  /**
   * Gets the token address for a given chain-token pair
   * @param {ChainTokenPair} pair - The chain-token pair
   * @returns {string | undefined} The token address, or undefined if not found
   */
  getTokenAddressByPair(pair: ChainTokenPair): string | undefined {
    const [chainName, tokenSymbol] = pair.split('-');
    return this.getTokenAddress(chainName, tokenSymbol);
  }

  /**
   * Gets all supported chains
   * @returns {ChainInfo[]} An array of supported chains
   */
  getSupportedChains(): ChainInfo[] {
    return this.data?.supported_chains || [];
  }

  /**
   * Gets all supported tokens for a given chain
   * @param {string} chainIdentifier - The chain name or ID
   * @returns {TokenInfo[] | undefined} An array of supported tokens, or undefined if the chain is not found
   */
  getSupportedTokens(chainIdentifier: string): TokenInfo[] | undefined {
    const chainId = this.getChainId(chainIdentifier);
    if (!chainId) return undefined;

    return this.data?.supported_gas_tokens.find(chain => chain.chainId === chainId)?.paymentTokens;
  }

  /**
   * Gets all valid chain-token pairs
   * @returns {ChainTokenPair[]} An array of all valid chain-token pairs
   */
  getChainTokenPairs(): ChainTokenPair[] {
    const pairs: ChainTokenPair[] = [];
    this.data?.supported_gas_tokens.forEach(chain => {
      const chainInfo = this.data?.supported_chains.find(c => c.chainId === chain.chainId);
      if (chainInfo) {
        const chainName = this.toCamelCase(chainInfo.name);
        chain.paymentTokens.forEach(token => {
          pairs.push(`${chainName}-${token.symbol.toLowerCase()}` as ChainTokenPair);
        });
      }
    });
    return pairs;
  }
}

const service = new ChainTokenService()
service.init()

/**
 * Retrieves the payment token address for a given chain-token pair.
 * 
 * This function uses the ChainTokenService to look up the token address
 * based on the provided chain-token pair.
 * 
 * @param {ChainTokenPair} chainTokenPair - A string representing the chain and token,
 *                                          in the format "chainName-tokenSymbol".
 *                                          For example: "ethereum-usdc" or "arbitrumOne-link".
 * 
 * @returns {string | undefined} The address of the payment token if found,
 *                               or undefined if the token is not found for the given chain.
 * 
 * @throws {Error} May throw an error if the ChainTokenService encounters issues
 *                 (e.g., network errors when fetching data).
 * 
 * @example
 * const usdcAddress = getPaymentToken('ethereum-usdc');
 * console.log(usdcAddress); // '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
 * 
 */
export function getPaymentToken(chainTokenPair: ChainTokenPair) {
  return service.getTokenAddressByPair(chainTokenPair);
}