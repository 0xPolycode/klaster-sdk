[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [index](../README.md) / KlasterSDK

# Class: KlasterSDK

## Constructors

### new KlasterSDK()

> **new KlasterSDK**(`config`): [`KlasterSDK`](KlasterSDK.md)

#### Parameters

• **config**: [`Config`](../type-aliases/Config.md)

#### Returns

[`KlasterSDK`](KlasterSDK.md)

#### Defined in

[index.ts:42](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L42)

## Properties

### activeAccountSalt

> **activeAccountSalt**: `string`

#### Defined in

[index.ts:38](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L38)

***

### masterAddress

> **masterAddress**: \`0x$\{string\}\`

#### Defined in

[index.ts:40](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L40)

## Methods

### autoExecute()

> **autoExecute**(`itx`, `signHash`): `Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

Fetches the quote and executes the Interchain Transaction.

#### Parameters

• **itx**: [`InterchainTransaction`](../../types/interfaces/InterchainTransaction.md)

The interchain transaction object containing the transactions
you wish to execute.

• **signHash**

A function to sign the iTx hash with a private key. When the
autoExecute function fetches a quote from the Klaster network, it will use this
function to sign the transaction.

#### Returns

`Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

#### Defined in

[index.ts:167](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L167)

***

### changeAccountSalt()

> **changeAccountSalt**(`salt`): `void`

#### Parameters

• **salt**: `string`

#### Returns

`void`

#### Defined in

[index.ts:57](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L57)

***

### changeMasterAddress()

> **changeMasterAddress**(`wallet`): `void`

#### Parameters

• **wallet**: \`0x$\{string\}\`

#### Returns

`void`

#### Defined in

[index.ts:50](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L50)

***

### encodeTxFee()

> **encodeTxFee**(`paymentToken`): `Promise`\<[`ApiPaymentData`](../../types/interfaces/ApiPaymentData.md)\>

#### Parameters

• **paymentToken**: `"ethereum-eth"` \| `"ethereum-weth"` \| `"ethereum-link"` \| `"ethereum-usdc"` \| `"ethereum-wsteth"` \| `"ethereum-usdt"` \| `"ethereum-matic"` \| `"ethereum-wmatic"` \| `"ethereum-stmatic"` \| `"ethereum-avax"` \| `"ethereum-wavax"` \| `"ethereum-bnb"` \| `"ethereum-wbnb"` \| `"ethereum-axlusdc"` \| `"ethereum-crusdc"` \| `"ethereum-bsc-usd"` \| `"optimism-eth"` \| `"optimism-weth"` \| `"optimism-link"` \| `"optimism-usdc"` \| `"optimism-wsteth"` \| `"optimism-usdt"` \| `"optimism-matic"` \| `"optimism-wmatic"` \| `"optimism-stmatic"` \| `"optimism-avax"` \| `"optimism-wavax"` \| `"optimism-bnb"` \| `"optimism-wbnb"` \| `"optimism-axlusdc"` \| `"optimism-crusdc"` \| `"optimism-bsc-usd"` \| `"sepolia-eth"` \| `"sepolia-weth"` \| `"sepolia-link"` \| `"sepolia-usdc"` \| `"sepolia-wsteth"` \| `"sepolia-usdt"` \| `"sepolia-matic"` \| `"sepolia-wmatic"` \| `"sepolia-stmatic"` \| `"sepolia-avax"` \| `"sepolia-wavax"` \| `"sepolia-bnb"` \| `"sepolia-wbnb"` \| `"sepolia-axlusdc"` \| `"sepolia-crusdc"` \| `"sepolia-bsc-usd"` \| `"polygon-eth"` \| `"polygon-weth"` \| `"polygon-link"` \| `"polygon-usdc"` \| `"polygon-wsteth"` \| `"polygon-usdt"` \| `"polygon-matic"` \| `"polygon-wmatic"` \| `"polygon-stmatic"` \| `"polygon-avax"` \| `"polygon-wavax"` \| `"polygon-bnb"` \| `"polygon-wbnb"` \| `"polygon-axlusdc"` \| `"polygon-crusdc"` \| `"polygon-bsc-usd"` \| `"arbitrum-one-eth"` \| `"arbitrum-one-weth"` \| `"arbitrum-one-link"` \| `"arbitrum-one-usdc"` \| `"arbitrum-one-wsteth"` \| `"arbitrum-one-usdt"` \| `"arbitrum-one-matic"` \| `"arbitrum-one-wmatic"` \| `"arbitrum-one-stmatic"` \| `"arbitrum-one-avax"` \| `"arbitrum-one-wavax"` \| `"arbitrum-one-bnb"` \| `"arbitrum-one-wbnb"` \| `"arbitrum-one-axlusdc"` \| `"arbitrum-one-crusdc"` \| `"arbitrum-one-bsc-usd"` \| `"arbitrum-sepolia-eth"` \| `"arbitrum-sepolia-weth"` \| `"arbitrum-sepolia-link"` \| `"arbitrum-sepolia-usdc"` \| `"arbitrum-sepolia-wsteth"` \| `"arbitrum-sepolia-usdt"` \| `"arbitrum-sepolia-matic"` \| `"arbitrum-sepolia-wmatic"` \| `"arbitrum-sepolia-stmatic"` \| `"arbitrum-sepolia-avax"` \| `"arbitrum-sepolia-wavax"` \| `"arbitrum-sepolia-bnb"` \| `"arbitrum-sepolia-wbnb"` \| `"arbitrum-sepolia-axlusdc"` \| `"arbitrum-sepolia-crusdc"` \| `"arbitrum-sepolia-bsc-usd"` \| `"avalanche-c-chain-eth"` \| `"avalanche-c-chain-weth"` \| `"avalanche-c-chain-link"` \| `"avalanche-c-chain-usdc"` \| `"avalanche-c-chain-wsteth"` \| `"avalanche-c-chain-usdt"` \| `"avalanche-c-chain-matic"` \| `"avalanche-c-chain-wmatic"` \| `"avalanche-c-chain-stmatic"` \| `"avalanche-c-chain-avax"` \| `"avalanche-c-chain-wavax"` \| `"avalanche-c-chain-bnb"` \| `"avalanche-c-chain-wbnb"` \| `"avalanche-c-chain-axlusdc"` \| `"avalanche-c-chain-crusdc"` \| `"avalanche-c-chain-bsc-usd"` \| `"scroll-eth"` \| `"scroll-weth"` \| `"scroll-link"` \| `"scroll-usdc"` \| `"scroll-wsteth"` \| `"scroll-usdt"` \| `"scroll-matic"` \| `"scroll-wmatic"` \| `"scroll-stmatic"` \| `"scroll-avax"` \| `"scroll-wavax"` \| `"scroll-bnb"` \| `"scroll-wbnb"` \| `"scroll-axlusdc"` \| `"scroll-crusdc"` \| `"scroll-bsc-usd"` \| `"bnb-smart-chain-eth"` \| `"bnb-smart-chain-weth"` \| `"bnb-smart-chain-link"` \| `"bnb-smart-chain-usdc"` \| `"bnb-smart-chain-wsteth"` \| `"bnb-smart-chain-usdt"` \| `"bnb-smart-chain-matic"` \| `"bnb-smart-chain-wmatic"` \| `"bnb-smart-chain-stmatic"` \| `"bnb-smart-chain-avax"` \| `"bnb-smart-chain-wavax"` \| `"bnb-smart-chain-bnb"` \| `"bnb-smart-chain-wbnb"` \| `"bnb-smart-chain-axlusdc"` \| `"bnb-smart-chain-crusdc"` \| `"bnb-smart-chain-bsc-usd"` \| `"base-eth"` \| `"base-weth"` \| `"base-link"` \| `"base-usdc"` \| `"base-wsteth"` \| `"base-usdt"` \| `"base-matic"` \| `"base-wmatic"` \| `"base-stmatic"` \| `"base-avax"` \| `"base-wavax"` \| `"base-bnb"` \| `"base-wbnb"` \| `"base-axlusdc"` \| `"base-crusdc"` \| `"base-bsc-usd"`

#### Returns

`Promise`\<[`ApiPaymentData`](../../types/interfaces/ApiPaymentData.md)\>

#### Defined in

[index.ts:86](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L86)

***

### execute()

> **execute**(`response`, `signedHash`): `Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

Executes the Interchain Transaction.

After calling the execute function with the signed iTx hash, it's impossible
to prevent the Klaster network from executing the transaction.

#### Parameters

• **response**: [`QuoteResponse`](../../types/interfaces/QuoteResponse.md)

The response object which was returned when calling the `quote`
endpoint

• **signedHash**: `string`

The iTx hash, signed by the wallet.

#### Returns

`Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

An object containing the iTx hash of the executed iTx

#### Remarks

The hash must be signed by using the personalSign method.
Some libraries force a different signing scheme. If you get an
invalid merkle hash error - please make sure you're using the personalSign
method.

#### Example

```ts
const quoteResponse = await getQuote(...);
const signedHash = await client.(quoteResponse.hash);
const executeResponse = await execute(quoteResponse, signedHash);
```

#### Defined in

[index.ts:152](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L152)

***

### getMultichainAccount()

> **getMultichainAccount**(): `Promise`\<[`MultichainAccount`](../../types/interfaces/MultichainAccount.md)\>

#### Returns

`Promise`\<[`MultichainAccount`](../../types/interfaces/MultichainAccount.md)\>

#### Defined in

[index.ts:68](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L68)

***

### getQuote()

> **getQuote**(`itx`): `Promise`\<[`QuoteResponse`](../../types/interfaces/QuoteResponse.md)\>

Fetches a quote for the interchain transaction (iTx). The quote
contains the full iTx information as well as the required payment information.

#### Parameters

• **itx**: [`InterchainTransaction`](../../types/interfaces/InterchainTransaction.md)

The full Interchain Tranasaction object

#### Returns

`Promise`\<[`QuoteResponse`](../../types/interfaces/QuoteResponse.md)\>

#### Defined in

[index.ts:105](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L105)

***

### transferAndExecute()

> **transferAndExecute**(`params`): `Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

Transfers ERC20 tokens to the multichain smart contract account and
executes the desired actions across multiple blockchains.

#### Parameters

• **params**

• **params.executeItx**

• **params.executeItx.iTx**: [`InterchainTransaction`](../../types/interfaces/InterchainTransaction.md)

• **params.executeItx.signItxHashAction**

• **params.transferToSmartAccount**

• **params.transferToSmartAccount.amountToTransfer**: `bigint`

• **params.transferToSmartAccount.chainId**: `number`

• **params.transferToSmartAccount.executeTxAction**

• **params.transferToSmartAccount.tokenToTransfer**: \`0x$\{string\}\`

#### Returns

`Promise`\<[`ExecuteResponse`](../../types/interfaces/ExecuteResponse.md)\>

#### Defined in

[index.ts:186](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/index.ts#L186)
