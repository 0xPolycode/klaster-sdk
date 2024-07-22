[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / utils/unified-balance.service

# utils/unified-balance.service

## Functions

### createTokenMapping()

> **createTokenMapping**(`tokens`): `TokenMapping`

Creates a TokenMapping object from an array of TokenInfo objects.

This function generates a mapping of chain IDs to token addresses, which is used
in other Klaster SDK functions like getUnifiedBalance. It allows for easy
specification of token addresses across multiple chains.

#### Parameters

• **tokens**: `TokenInfo`[]

An array of TokenInfo objects. Each TokenInfo should contain:
  - chain: The chain ID (number) where the token is deployed.
  - address: The address (string) of the token contract on the specified chain.

#### Returns

`TokenMapping`

An object where keys are chain IDs and values are token addresses.

#### Throws

Throws an error if duplicate chain IDs are provided in the input array.

#### Example

```ts
import { createTokenMapping } from 'klaster-sdk';

// Create a mapping for USDC across multiple chains
const usdcMapping = createTokenMapping([
  { chain: 1, address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },  // Ethereum Mainnet
  { chain: 10, address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85' }, // Optimism
  { chain: 137, address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }  // Polygon
]);

console.log(usdcMapping);
// Output:
// {
//   1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
//   10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
//   137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
// }

// This mapping can then be used in other SDK functions:
const balance = await getUnifiedBalance({
  mapping: usdcMapping,
  address: '0x...',
  clients: { ... }
});
```

#### See

For using the created mapping, see the documentation for getUnifiedBalance.

#### Defined in

[utils/unified-balance.service.ts:59](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/unified-balance.service.ts#L59)

***

### getUnifiedBalance()

> **getUnifiedBalance**(`params`): `Promise`\<`UnifiedBalanceResult`\>

Fetches and aggregates token balances across multiple blockchains for a given address.

This function retrieves the balance of a specific token (defined by the TokenMapping)
for a given address across multiple chains. It then aggregates these balances into
a single unified balance.

#### Parameters

• **params**

The parameters for the function.

• **params.address**: \`0x$\{string\}\`

The address for which to fetch the token balances.

• **params.clients**

An object mapping chain IDs to viem PublicClient instances.
  These clients are used to interact with the respective blockchains.

• **params.mapping**: `TokenMapping`

An object mapping chain IDs to token addresses.
  Use the createTokenMapping function to generate this object.

#### Returns

`Promise`\<`UnifiedBalanceResult`\>

A promise that resolves to an object containing:
  - amount: The total balance across all chains as a bigint.
  - decimals: The number of decimals for the token.

#### Throws

Throws an error in the following cases:
  - If no client is provided for a chain ID in the mapping.
  - If tokens across different chains have different numbers of decimals.
  - If no valid tokens are found in the mapping.

#### Example

```ts
import { createPublicClient, http } from 'viem';
import { mainnet, optimism } from 'viem/chains';
import { createTokenMapping, getUnifiedBalance } from 'klaster-sdk';

// Create public clients for each chain
const clients = {
  1: createPublicClient({ chain: mainnet, transport: http() }),
  10: createPublicClient({ chain: optimism, transport: http() })
};

// Create a token mapping for USDC
const usdcMapping = createTokenMapping([
  { chain: 1, address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { chain: 10, address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85' }
]);

// Fetch the unified balance
try {
  const result = await getUnifiedBalance({
    mapping: usdcMapping,
    address: '0x063B3184a74C510b5c6f5bBd122CC19689E0c706',
    clients
  });
  console.log(`Unified USDC Balance: ${result.amount} (${result.decimals} decimals)`);
} catch (error) {
  console.error('Error fetching unified balance:', error.message);
}
```

#### See

 - For more information on creating token mappings, see the documentation for createTokenMapping.
 - For details on creating viem PublicClient instances, refer to the viem documentation: https://viem.sh/docs/clients/public.html

#### Defined in

[utils/unified-balance.service.ts:120](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/unified-balance.service.ts#L120)
