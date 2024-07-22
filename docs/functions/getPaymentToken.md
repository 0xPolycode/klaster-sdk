[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / getPaymentToken

# Function: getPaymentToken()

> **getPaymentToken**(`chainTokenPair`): `undefined` \| `string`

Retrieves the payment token address for a given chain-token pair.

This function uses the ChainTokenService to look up the token address
based on the provided chain-token pair.

## Parameters

• **chainTokenPair**: `"ethereum-eth"` \| `"ethereum-weth"` \| `"ethereum-link"` \| `"ethereum-usdc"` \| `"ethereum-wsteth"` \| `"ethereum-usdt"` \| `"ethereum-matic"` \| `"ethereum-wmatic"` \| `"ethereum-stmatic"` \| `"ethereum-avax"` \| `"ethereum-wavax"` \| `"ethereum-bnb"` \| `"ethereum-wbnb"` \| `"ethereum-axlusdc"` \| `"ethereum-crusdc"` \| `"ethereum-bsc-usd"` \| `"optimism-eth"` \| `"optimism-weth"` \| `"optimism-link"` \| `"optimism-usdc"` \| `"optimism-wsteth"` \| `"optimism-usdt"` \| `"optimism-matic"` \| `"optimism-wmatic"` \| `"optimism-stmatic"` \| `"optimism-avax"` \| `"optimism-wavax"` \| `"optimism-bnb"` \| `"optimism-wbnb"` \| `"optimism-axlusdc"` \| `"optimism-crusdc"` \| `"optimism-bsc-usd"` \| `"sepolia-eth"` \| `"sepolia-weth"` \| `"sepolia-link"` \| `"sepolia-usdc"` \| `"sepolia-wsteth"` \| `"sepolia-usdt"` \| `"sepolia-matic"` \| `"sepolia-wmatic"` \| `"sepolia-stmatic"` \| `"sepolia-avax"` \| `"sepolia-wavax"` \| `"sepolia-bnb"` \| `"sepolia-wbnb"` \| `"sepolia-axlusdc"` \| `"sepolia-crusdc"` \| `"sepolia-bsc-usd"` \| `"polygon-eth"` \| `"polygon-weth"` \| `"polygon-link"` \| `"polygon-usdc"` \| `"polygon-wsteth"` \| `"polygon-usdt"` \| `"polygon-matic"` \| `"polygon-wmatic"` \| `"polygon-stmatic"` \| `"polygon-avax"` \| `"polygon-wavax"` \| `"polygon-bnb"` \| `"polygon-wbnb"` \| `"polygon-axlusdc"` \| `"polygon-crusdc"` \| `"polygon-bsc-usd"` \| `"arbitrum-one-eth"` \| `"arbitrum-one-weth"` \| `"arbitrum-one-link"` \| `"arbitrum-one-usdc"` \| `"arbitrum-one-wsteth"` \| `"arbitrum-one-usdt"` \| `"arbitrum-one-matic"` \| `"arbitrum-one-wmatic"` \| `"arbitrum-one-stmatic"` \| `"arbitrum-one-avax"` \| `"arbitrum-one-wavax"` \| `"arbitrum-one-bnb"` \| `"arbitrum-one-wbnb"` \| `"arbitrum-one-axlusdc"` \| `"arbitrum-one-crusdc"` \| `"arbitrum-one-bsc-usd"` \| `"arbitrum-sepolia-eth"` \| `"arbitrum-sepolia-weth"` \| `"arbitrum-sepolia-link"` \| `"arbitrum-sepolia-usdc"` \| `"arbitrum-sepolia-wsteth"` \| `"arbitrum-sepolia-usdt"` \| `"arbitrum-sepolia-matic"` \| `"arbitrum-sepolia-wmatic"` \| `"arbitrum-sepolia-stmatic"` \| `"arbitrum-sepolia-avax"` \| `"arbitrum-sepolia-wavax"` \| `"arbitrum-sepolia-bnb"` \| `"arbitrum-sepolia-wbnb"` \| `"arbitrum-sepolia-axlusdc"` \| `"arbitrum-sepolia-crusdc"` \| `"arbitrum-sepolia-bsc-usd"` \| `"avalanche-c-chain-eth"` \| `"avalanche-c-chain-weth"` \| `"avalanche-c-chain-link"` \| `"avalanche-c-chain-usdc"` \| `"avalanche-c-chain-wsteth"` \| `"avalanche-c-chain-usdt"` \| `"avalanche-c-chain-matic"` \| `"avalanche-c-chain-wmatic"` \| `"avalanche-c-chain-stmatic"` \| `"avalanche-c-chain-avax"` \| `"avalanche-c-chain-wavax"` \| `"avalanche-c-chain-bnb"` \| `"avalanche-c-chain-wbnb"` \| `"avalanche-c-chain-axlusdc"` \| `"avalanche-c-chain-crusdc"` \| `"avalanche-c-chain-bsc-usd"` \| `"scroll-eth"` \| `"scroll-weth"` \| `"scroll-link"` \| `"scroll-usdc"` \| `"scroll-wsteth"` \| `"scroll-usdt"` \| `"scroll-matic"` \| `"scroll-wmatic"` \| `"scroll-stmatic"` \| `"scroll-avax"` \| `"scroll-wavax"` \| `"scroll-bnb"` \| `"scroll-wbnb"` \| `"scroll-axlusdc"` \| `"scroll-crusdc"` \| `"scroll-bsc-usd"` \| `"bnb-smart-chain-eth"` \| `"bnb-smart-chain-weth"` \| `"bnb-smart-chain-link"` \| `"bnb-smart-chain-usdc"` \| `"bnb-smart-chain-wsteth"` \| `"bnb-smart-chain-usdt"` \| `"bnb-smart-chain-matic"` \| `"bnb-smart-chain-wmatic"` \| `"bnb-smart-chain-stmatic"` \| `"bnb-smart-chain-avax"` \| `"bnb-smart-chain-wavax"` \| `"bnb-smart-chain-bnb"` \| `"bnb-smart-chain-wbnb"` \| `"bnb-smart-chain-axlusdc"` \| `"bnb-smart-chain-crusdc"` \| `"bnb-smart-chain-bsc-usd"` \| `"base-eth"` \| `"base-weth"` \| `"base-link"` \| `"base-usdc"` \| `"base-wsteth"` \| `"base-usdt"` \| `"base-matic"` \| `"base-wmatic"` \| `"base-stmatic"` \| `"base-avax"` \| `"base-wavax"` \| `"base-bnb"` \| `"base-wbnb"` \| `"base-axlusdc"` \| `"base-crusdc"` \| `"base-bsc-usd"`

A string representing the chain and token,
                                         in the format "chainName-tokenSymbol".
                                         For example: "ethereum-usdc" or "arbitrumOne-link".

## Returns

`undefined` \| `string`

The address of the payment token if found,
                              or undefined if the token is not found for the given chain.

## Throws

May throw an error if the ChainTokenService encounters issues
                (e.g., network errors when fetching data).

## Example

```ts
const usdcAddress = getPaymentToken('ethereum-usdc');
console.log(usdcAddress); // '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
```

## Defined in

[utils/token-resolver.service.ts:267](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/token-resolver.service.ts#L267)
