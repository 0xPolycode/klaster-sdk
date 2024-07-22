import { PublicClient, Address, getContract, erc20Abi } from "viem";

// Define types
type TokenInfo = {
  chain: number;
  address: Address;
};

type TokenMapping = {
  [chainId: number]: Address;
};

type UnifiedBalanceResult = {
  amount: bigint;
  decimals: number;
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
 *   clients: { ... }
 * });
 *
 * @see For using the created mapping, see the documentation for getUnifiedBalance.
 */ export function createTokenMapping(tokens: TokenInfo[]): TokenMapping {
  return tokens.reduce((acc, { chain, address }) => {
    acc[chain] = address;
    return acc;
  }, {} as TokenMapping);
}

/**
 * Fetches and aggregates token balances across multiple blockchains for a given address.
 *
 * This function retrieves the balance of a specific token (defined by the TokenMapping)
 * for a given address across multiple chains. It then aggregates these balances into
 * a single unified balance.
 *
 * @param {Object} params - The parameters for the function.
 * @param {TokenMapping} params.mapping - An object mapping chain IDs to token addresses.
 *   Use the createTokenMapping function to generate this object.
 * @param {Address} params.address - The address for which to fetch the token balances.
 * @param {Object.<number, PublicClient>} params.clients - An object mapping chain IDs to viem PublicClient instances.
 *   These clients are used to interact with the respective blockchains.
 *
 * @returns {Promise<UnifiedBalanceResult>} A promise that resolves to an object containing:
 *   - amount: The total balance across all chains as a bigint.
 *   - decimals: The number of decimals for the token.
 *
 * @throws {Error} Throws an error in the following cases:
 *   - If no client is provided for a chain ID in the mapping.
 *   - If tokens across different chains have different numbers of decimals.
 *   - If no valid tokens are found in the mapping.
 *
 * @example
 * import { createPublicClient, http } from 'viem';
 * import { mainnet, optimism } from 'viem/chains';
 * import { createTokenMapping, getUnifiedBalance } from 'klaster-sdk';
 *
 * // Create public clients for each chain
 * const clients = {
 *   1: createPublicClient({ chain: mainnet, transport: http() }),
 *   10: createPublicClient({ chain: optimism, transport: http() })
 * };
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
 *     clients
 *   });
 *   console.log(`Unified USDC Balance: ${result.amount} (${result.decimals} decimals)`);
 * } catch (error) {
 *   console.error('Error fetching unified balance:', error.message);
 * }
 *
 * @see For more information on creating token mappings, see the documentation for createTokenMapping.
 * @see For details on creating viem PublicClient instances, refer to the viem documentation: https://viem.sh/docs/clients/public.html
 */ export async function getUnifiedBalance({
  mapping,
  address,
  clients,
}: {
  mapping: TokenMapping;
  address: Address;
  clients: { [chainId: number]: PublicClient };
}): Promise<UnifiedBalanceResult> {
  let totalBalance = BigInt(0);
  let decimals: number | null = null;

  for (const [chainId, tokenAddress] of Object.entries(mapping)) {
    const client = clients[Number(chainId)];
    if (!client) {
      throw new Error(`No client provided for chain ID ${chainId}`);
    }

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
