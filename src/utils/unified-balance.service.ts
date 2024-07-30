import {
  Address,
  getContract,
  erc20Abi,
  createPublicClient,
  http,
  defineChain,
} from "viem";
import { RawTransaction } from "../types";

type ChainConfig = {
  chainId: number;
  rpcUrl: string;
};

type TokenMapping = {
  [chainId: number]: Address;
};

type UnifiedBalanceResult = {
  amount: bigint;
  decimals: number;
};

/**
 * Represents information about a token on a specific blockchain.
 */
type TokenInfo = {
  chain: number;
  address: Address;
};

/**
 * Creates a TokenMapping object from an array of TokenInfo objects.
 *
 * This function generates a mapping of chain IDs to token addresses, which is used
 * in other Klaster SDK functions like getUnifiedBalance. It allows for easy
 * specification of token addresses across multiple chains.
 *
 * @param {TokenInfo[]} tokens - An array of TokenInfo objects. Each TokenInfo should contain:
 *   - chain: The chain ID (number) where the token is deployed.
 *   - address: The address (string) of the token contract on the specified chain.
 *
 * @returns {TokenMapping} An object where keys are chain IDs and values are token addresses.
 *
 * @throws {Error} Throws an error if duplicate chain IDs are provided in the input array.
 *
 * @example
 * import { createTokenMapping } from 'klaster-sdk';
 *
 * // Create a mapping for USDC across multiple chains
 * const usdcMapping = createTokenMapping([
 *   { chain: 1, address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },  // Ethereum Mainnet
 *   { chain: 10, address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85' }, // Optimism
 *   { chain: 137, address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }  // Polygon
 * ]);
 *
 * console.log(usdcMapping);
 * // Output:
 * // {
 * //   1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
 * //   10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
 * //   137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
 * // }
 *
 * // This mapping can then be used in other SDK functions:
 * const balance = await getUnifiedBalance({
 *   mapping: usdcMapping,
 *   address: '0x...',
 *   chainConfigs: [...]
 * });
 *
 * @see For using the created mapping, see the documentation for getUnifiedBalance.
 */
export function createTokenMapping(tokens: TokenInfo[]): TokenMapping {
  const mapping: TokenMapping = {};

  for (const { chain, address } of tokens) {
    if (mapping[chain]) {
      throw new Error(
        `Duplicate chain ID ${chain} provided in token info array.`,
      );
    }
    mapping[chain] = address;
  }

  return mapping;
}

/**
 * Fetches and aggregates token balances across multiple blockchains for a given address.
 *
 * @param {Object} params - The parameters for the function.
 * @param {TokenMapping} params.mapping - An object mapping chain IDs to token addresses.
 * @param {Address} params.address - The address for which to fetch the token balances.
 * @param {ChainConfig[]} params.chainConfigs - An array of objects, each containing a chainId and an rpcUrl.
 *
 * @returns {Promise<UnifiedBalanceResult>} A promise that resolves to an object containing:
 *   - amount: The total balance across all chains as a bigint.
 *   - decimals: The number of decimals for the token.
 *
 * @throws {Error} Throws an error in the following cases:
 *   - If tokens across different chains have different numbers of decimals.
 *   - If no valid tokens are found in the mapping.
 *
 * @example
 * import { createTokenMapping, getUnifiedBalance } from 'klaster-sdk';
 *
 * // Create a token mapping for USDC
 * const usdcMapping = createTokenMapping([
 *   { chain: 1, address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
 *   { chain: 10, address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85' }
 * ]);
 *
 * // Fetch the unified balance
 * try {
 *   const result = await getUnifiedBalance({
 *     mapping: usdcMapping,
 *     address: '0x063B3184a74C510b5c6f5bBd122CC19689E0c706',
 *     chainConfigs: [
 *       { chainId: 1, rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key' },
 *       { chainId: 10, rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/your-api-key' }
 *     ]
 *   });
 *   console.log(`Unified USDC Balance: ${result.amount} (${result.decimals} decimals)`);
 * } catch (error) {
 *   console.error('Error fetching unified balance:', error.message);
 * }
 */
export async function getUnifiedBalance({
  mapping,
  address,
  chainConfigs,
}: {
  mapping: TokenMapping;
  address: Address;
  chainConfigs: ChainConfig[];
}): Promise<UnifiedBalanceResult> {
  let totalBalance = BigInt(0);
  let decimals: number | null = null;

  for (const { chainId, rpcUrl } of chainConfigs) {
    if (!mapping[chainId]) {
      continue; // Skip this chain if it's not in the mapping
    }

    const chain = defineChain({
      id: chainId,
      network: `chain-${chainId}`,
      name: `Chain ${chainId}`,
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      rpcUrls: {
        default: { http: [rpcUrl] },
        public: { http: [rpcUrl] },
      },
    });

    const client = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });

    const tokenAddress = mapping[chainId];

    const contract = getContract({
      address: tokenAddress,
      abi: erc20Abi,
      client: client,
    });

    const [balance, tokenDecimals] = await Promise.all([
      contract.read.balanceOf([address]),
      contract.read.decimals(),
    ]);

    // Check if this is the first token we're checking
    if (decimals === null) {
      decimals = tokenDecimals;
    } else if (tokenDecimals !== decimals) {
      throw new Error(
        `Tokens with different decimals are not supported in a single mapping. 
        Chain ${chainId} token has ${tokenDecimals} decimals, expected ${decimals}.`,
      );
    }

    totalBalance += balance;
  }

  if (decimals === null) {
    throw new Error("No valid tokens found in the mapping.");
  }

  return { amount: totalBalance, decimals };
}

type TokenStrategyItem = {
  chainId: number;
  amount: bigint;
};

type TokenStrategy = TokenStrategyItem[] | null;
type BalanceStrategy = "descending" | "ascending";

type BuildTokenStrategyOptions = {
  tokenMapping: TokenMapping;
  chainConfigs: ChainConfig[];
  amount: bigint;
  address: Address;
  strategy?: BalanceStrategy;
};

/**
 * Builds a strategy for using tokens across multiple chains to satisfy a given amount.
 * Ensures all tokens have the same number of decimals.
 *
 * @param {TokenMapping} tokenMapping - An object mapping chain IDs to token addresses.
 * @param {ChainConfig[]} chainConfigs - An array of objects, each containing a chainId and an rpcUrl.
 * @param {bigint} amount - The total amount of tokens needed.
 * @param {Address} address - The address for which to fetch the token balances.
 * @param {BalanceStrategy} strategy - The strategy for using tokens: "descending" (default) uses chains with the most tokens first, "ascending" uses chains with the least tokens first.
 *
 * @returns {Promise<Strategy>} A promise that resolves to either:
 *   - An array of StrategyItem objects, each containing a chainId and an amount to use from that chain.
 *   - null if the total balance across all chains is insufficient to satisfy the requested amount.
 *
 * @throws {Error} Throws an error if:
 *   - There's an issue fetching balances or decimals
 *   - The token addresses are invalid
 *   - Tokens across different chains have different numbers of decimals
 *
 * @example
 * const tokenMapping = {
 *   10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',  // USDC on Optimism
 *   8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // USDC on Base
 * };
 *
 * const chainConfigs = [
 *   { chainId: 10, rpcUrl: 'https://mainnet.optimism.io' },
 *   { chainId: 8453, rpcUrl: 'https://mainnet.base.org' }
 * ];
 *
 * const strategy = await buildTokenStrategy(tokenMapping, chainConfigs, BigInt("25000"), '0x...', "ascending");
 * if (strategy) {
 *   console.log('Strategy found:', strategy);
 *   // Possible output: [{ chainId: 8453, amount: BigInt("4000") }, { chainId: 10, amount: BigInt("21000") }]
 * } else {
 *   console.log('Not enough tokens available across all chains');
 * }
 */
export async function buildTokenStrategy({
  tokenMapping,
  chainConfigs,
  amount,
  address,
  strategy = "descending",
}: BuildTokenStrategyOptions): Promise<TokenStrategy> {
  let decimals: number | null = null;

  // First, fetch decimals and balances for all chains
  const balances = await Promise.all(
    chainConfigs.map(async ({ chainId, rpcUrl }) => {
      if (!tokenMapping[chainId]) {
        return { chainId, balance: BigInt(0), decimals: 0 };
      }

      const chain = defineChain({
        id: chainId,
        network: `chain-${chainId}`,
        name: `Chain ${chainId}`,
        nativeCurrency: {
          decimals: 18,
          name: "Ether",
          symbol: "ETH",
        },
        rpcUrls: {
          default: { http: [rpcUrl] },
          public: { http: [rpcUrl] },
        },
      });

      const client = createPublicClient({
        chain: chain,
        transport: http(rpcUrl),
      });

      const contract = getContract({
        address: tokenMapping[chainId],
        abi: erc20Abi,
        client: client,
      });

      const [balance, tokenDecimals] = await Promise.all([
        contract.read.balanceOf([address]),
        contract.read.decimals(),
      ]);

      // Check if this is the first token we're checking
      if (decimals === null) {
        decimals = tokenDecimals;
      } else if (tokenDecimals !== decimals) {
        throw new Error(
          `Tokens with different decimals are not supported. 
          Chain ${chainId} token has ${tokenDecimals} decimals, expected ${decimals}.`,
        );
      }

      return { chainId, balance, decimals: tokenDecimals };
    }),
  );

  // Sort balances based on the specified strategy
  balances.sort((a, b) => {
    const comparison = a.balance > b.balance ? 1 : -1;
    return strategy === "descending" ? -comparison : comparison;
  });

  let remainingAmount = amount;
  const result: TokenStrategyItem[] = [];

  for (const { chainId, balance } of balances) {
    if (remainingAmount <= BigInt(0)) break;

    if (balance > BigInt(0)) {
      const amountToUse =
        balance >= remainingAmount ? remainingAmount : balance;
      result.push({ chainId, amount: amountToUse });
      remainingAmount -= amountToUse;
    }
  }

  if (remainingAmount > BigInt(0)) {
    return null;
  }

  return result;
}

/**
 * Options for encoding bridging data from a token strategy.
 *
 * @typedef {Object} EncodeBridgingDataFromStrategyOptions
 * @property {TokenStrategy} strategy - The token strategy to encode, typically returned by buildTokenStrategy.
 * @property {TokenMapping} tokenMapping - An object mapping chain IDs to token addresses.
 * @property {number} destinationChainId - The chain ID of the destination chain for the bridge operation.
 * @property {Address} multichainAddress - The address of the multichain contract used for bridging.
 * @property {function} encodeSingleBridgeData - An async function that encodes the bridging data for a single chain.
 * @property {Address} encodeSingleBridgeData.tokenAddress - The address of the token to bridge.
 * @property {number} encodeSingleBridgeData.sourceChainId - The chain ID of the source chain.
 * @property {number} encodeSingleBridgeData.destinationChainId - The chain ID of the destination chain.
 * @property {bigint} encodeSingleBridgeData.amount - The amount of tokens to bridge.
 * @property {Address} encodeSingleBridgeData.multichainAddress - The address of the multichain contract.
 * @returns {Promise<RawTransaction>} A promise that resolves to a RawTransaction object.
 */
type EncodeBridgingDataFromStrategyOptions = {
  strategy: TokenStrategy;
  tokenMapping: TokenMapping;
  destinationChainId: number;
  multichainAddress: Address;
  encodeSingleBridgeData: (
    tokenAddress: Address,
    sourceChainId: number,
    destinationChainId: number,
    amount: bigint,
    multichainAddress: Address,
  ) => Promise<RawTransaction>;
};

/**
 * Encodes bridging data from a token strategy for multiple chains.
 *
 * This function takes a token strategy (typically generated by buildTokenStrategy) and encodes
 * the necessary data for bridging tokens from multiple source chains to a single destination chain.
 * It uses the provided encodeSingleBridgeData function to generate the specific bridging data for each chain.
 *
 * @param {EncodeBridgingDataFromStrategyOptions} options - The options for encoding bridging data.
 * @param {TokenStrategy} options.strategy - The token strategy to encode.
 * @param {TokenMapping} options.tokenMapping - An object mapping chain IDs to token addresses.
 * @param {number} options.destinationChainId - The chain ID of the destination chain.
 * @param {Address} options.multichainAddress - The address of the multichain contract.
 * @param {function} options.encodeSingleBridgeData - An async function that encodes the bridging data for a single chain.
 *
 * @returns {Promise<RawTransaction[]>} A promise that resolves to an array of RawTransaction objects,
 * each containing the encoded bridging data for a single chain in the strategy.
 *
 * @throws {Error} Throws an error if the strategy is null, indicating no feasible strategy exists,
 * or if a token address is not found for a chain in the strategy.
 *
 * @example
 * const tokenMapping = {
 *   10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',  // USDC on Optimism
 *   8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // USDC on Base
 * };
 *
 * const strategy = [
 *   { chainId: 10, amount: BigInt("15000") },
 *   { chainId: 8453, amount: BigInt("5000") }
 * ];
 *
 * const encodeSingleBridgeData = async (
 *   tokenAddress,
 *   sourceChainId,
 *   destinationChainId,
 *   amount,
 *   multichainAddress
 * ) => {
 *   // Implement your specific bridge encoding logic here
 *   // This is just a placeholder implementation
 *   return {
 *     to: multichainAddress,
 *     value: //
 *     gasLimit: //
 *     data: // Data encoded by your bridge encoding implementation
 *   };
 * };
 *
 * try {
 *   const bridgingData = await encodeBridgingDataFromStrategy({
 *     strategy,
 *     tokenMapping,
 *     destinationChainId: 1,  // Ethereum mainnet
 *     multichainAddress: '0x1234567890123456789012345678901234567890',
 *     encodeSingleBridgeData
 *   });
 *
 *   console.log(bridgingData);
 *   // Output will be an array of RawTransaction objects, one for each chain in the strategy
 * } catch (error) {
 *   console.error('Error encoding bridging data:', error.message);
 * }
 */
export async function encodeBridgingDataFromStrategy({
  strategy,
  tokenMapping,
  destinationChainId,
  multichainAddress,
  encodeSingleBridgeData,
}: EncodeBridgingDataFromStrategyOptions) {
  if (!strategy) {
    throw Error(`Token strategy is null. This indicates that there is no feasible strategy to execute your 
      desired multi-bridge action. Most likely, 
      this is caused by the user not having enough funds.`);
  }

  return Promise.all(
    strategy
      // No need for bridging if the origin and destination chains are the same
      .filter(({ chainId, amount }) => chainId !== destinationChainId)
      .map(async ({ chainId, amount }) => {
        const tokenAddress = tokenMapping[chainId];
        if (!tokenAddress) {
          throw new Error(
            `Token address not found for chain ID ${chainId} inside of the provided tokenMapping. 
            Please check the tokenMapping.`,
          );
        }

        const singleBridgeData = await encodeSingleBridgeData(
          tokenAddress,
          chainId,
          destinationChainId,
          amount,
          multichainAddress,
        );
        return {
          bridgeCallData: singleBridgeData,
          chainId: chainId
        }
      }),
  );
}
