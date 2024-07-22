[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / KlasterSDK

# Class: KlasterSDK

KlasterSDK creates an instance of the SDK used to communicate with
the Klaster protocol. It offers typed information for all the types 
used to communicate with the protocol, as well as utility functions
for encoding tokens, transactions and accounts.

## Constructors

### new KlasterSDK()

> **new KlasterSDK**(`config`): [`KlasterSDK`](KlasterSDK.md)

#### Parameters

• **config**: [`Config`](../type-aliases/Config.md)

#### Returns

[`KlasterSDK`](KlasterSDK.md)

#### Defined in

[index.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L80)

## Properties

### activeAccountSalt

> **activeAccountSalt**: `string`

#### Defined in

[index.ts:76](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L76)

***

### masterAddress

> **masterAddress**: \`0x$\{string\}\`

#### Defined in

[index.ts:78](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L78)

## Methods

### autoExecute()

> **autoExecute**(`itx`, `signHash`): `Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

Automatically fetches a quote and executes the Interchain Transaction (iTx).

This function streamlines the process of executing an iTx by combining the quote
fetching and execution steps. It automatically handles the flow of getting a quote,
signing the iTx hash, and executing the transaction.

#### Parameters

• **itx**: [`InterchainTransaction`](../interfaces/InterchainTransaction.md)

The interchain transaction object containing
       the transactions you wish to execute. This should include all necessary
       information for the iTx, such as actions and payment details.

• **signHash**

A function to sign the iTx hash with a private key.
       This function should take a hash string (prefixed with '0x') and return
       a Promise resolving to the signed hash string.

#### Returns

`Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

A promise that resolves to an ExecuteResponse object,
         containing the iTx hash of the executed transaction.

#### Async

#### Throws

May throw errors during the quote fetching, signing, or execution phases.
                These could include network errors, signing failures, or execution issues.

#### Example

```ts
const itx = {
  actions: [...],  // Array of actions to be executed
  paymentInfo: ... // Payment information
};

const signHash = async (hash) => {
  // Implement your signing logic here
  return signedHash;
};

try {
  const result = await klasterSDK.autoExecute(itx, signHash);
  console.log('iTx executed successfully. Hash:', result.iTxHash);
} catch (error) {
  console.error('AutoExecute failed:', error);
}
```

#### Remarks

- The signHash function must return a properly signed hash. Ensure you're using
  the correct signing method (e.g., personalSign) to avoid execution errors.
- This function abstracts away the separate steps of quoting and executing,
  making it more convenient for straightforward iTx executions.

#### See

 - [getQuote](KlasterSDK.md#getquote) - Used internally to fetch the quote.
 - [execute](KlasterSDK.md#execute) - Used internally to execute the transaction.

#### Defined in

[index.ts:397](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L397)

***

### changeAccountSalt()

> **changeAccountSalt**(`salt`): `void`

Changes the salt value used for deriving ERC4337 multichain smart accounts.

This function updates the `activeAccountSalt` parameter of the SDK instance. The salt,
in combination with the connected Externally Owned Account (EOA), is used to
deterministically derive ERC4337 compliant multichain smart contract accounts.
Changing this salt will result in deriving a different smart contract account
for all subsequent operations.

#### Parameters

• **salt**: `string`

The new salt value to be used for account derivation.
                       This should be a unique string that, when combined with
                       the EOA address, produces a unique smart account address.

#### Returns

`void`

#### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
klasterSDK.changeAccountSalt('uniqueSaltValue123');
```

#### Note

Changing the account salt will affect all future account derivations and operations.
It does not affect previously derived accounts or ongoing transactions. Ensure you understand
the implications of changing this salt in the context of your application.

#### See

For more information on ERC4337 and account abstraction, visit:
[Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337|EIP-4337:)

#### Defined in

[index.ts:138](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L138)

***

### changeMasterAddress()

> **changeMasterAddress**(`wallet`): `void`

Changes the master wallet address used for deriving ERC4337 multichain smart accounts.

This function updates the `masterAddress` parameter of the SDK instance. The master address,
in combination with a salt value, is used to deterministically derive ERC4337 compliant
multichain smart contract accounts. Changing this address will result in deriving
different smart contract accounts for all subsequent operations.

#### Parameters

• **wallet**: \`0x$\{string\}\`

The new master wallet address to be used for account derivation.
                          This should be a valid Ethereum address.

#### Returns

`void`

#### Throws

May throw an error if the provided address is invalid.

#### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
klasterSDK.changeMasterAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

#### Note

Changing the master address will affect all future account derivations and operations.
It does not affect previously derived accounts or ongoing transactions. Ensure you understand
the implications of changing this address in the context of your application.

#### See

For more information on ERC4337 and account abstraction, visit:
[Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337|EIP-4337:)

#### Defined in

[index.ts:109](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L109)

***

### encodeTxFee()

> **encodeTxFee**(`paymentToken`): `Promise`\<[`ApiPaymentData`](../interfaces/ApiPaymentData.md)\>

A helper function that prepares an ApiPaymentData object for transaction fee payments.

This asynchronous function simplifies the process of creating an ApiPaymentData object,
which is used to specify how transaction fees should be paid on the Klaster Protocol.
It combines information from the multichain account, the current SDK configuration,
and the specified payment token to create a complete payment data structure.

#### Parameters

• **paymentToken**: `"ethereum-eth"` \| `"ethereum-weth"` \| `"ethereum-link"` \| `"ethereum-usdc"` \| `"ethereum-wsteth"` \| `"ethereum-usdt"` \| `"ethereum-matic"` \| `"ethereum-wmatic"` \| `"ethereum-stmatic"` \| `"ethereum-avax"` \| `"ethereum-wavax"` \| `"ethereum-bnb"` \| `"ethereum-wbnb"` \| `"ethereum-axlusdc"` \| `"ethereum-crusdc"` \| `"ethereum-bsc-usd"` \| `"optimism-eth"` \| `"optimism-weth"` \| `"optimism-link"` \| `"optimism-usdc"` \| `"optimism-wsteth"` \| `"optimism-usdt"` \| `"optimism-matic"` \| `"optimism-wmatic"` \| `"optimism-stmatic"` \| `"optimism-avax"` \| `"optimism-wavax"` \| `"optimism-bnb"` \| `"optimism-wbnb"` \| `"optimism-axlusdc"` \| `"optimism-crusdc"` \| `"optimism-bsc-usd"` \| `"sepolia-eth"` \| `"sepolia-weth"` \| `"sepolia-link"` \| `"sepolia-usdc"` \| `"sepolia-wsteth"` \| `"sepolia-usdt"` \| `"sepolia-matic"` \| `"sepolia-wmatic"` \| `"sepolia-stmatic"` \| `"sepolia-avax"` \| `"sepolia-wavax"` \| `"sepolia-bnb"` \| `"sepolia-wbnb"` \| `"sepolia-axlusdc"` \| `"sepolia-crusdc"` \| `"sepolia-bsc-usd"` \| `"polygon-eth"` \| `"polygon-weth"` \| `"polygon-link"` \| `"polygon-usdc"` \| `"polygon-wsteth"` \| `"polygon-usdt"` \| `"polygon-matic"` \| `"polygon-wmatic"` \| `"polygon-stmatic"` \| `"polygon-avax"` \| `"polygon-wavax"` \| `"polygon-bnb"` \| `"polygon-wbnb"` \| `"polygon-axlusdc"` \| `"polygon-crusdc"` \| `"polygon-bsc-usd"` \| `"arbitrum-one-eth"` \| `"arbitrum-one-weth"` \| `"arbitrum-one-link"` \| `"arbitrum-one-usdc"` \| `"arbitrum-one-wsteth"` \| `"arbitrum-one-usdt"` \| `"arbitrum-one-matic"` \| `"arbitrum-one-wmatic"` \| `"arbitrum-one-stmatic"` \| `"arbitrum-one-avax"` \| `"arbitrum-one-wavax"` \| `"arbitrum-one-bnb"` \| `"arbitrum-one-wbnb"` \| `"arbitrum-one-axlusdc"` \| `"arbitrum-one-crusdc"` \| `"arbitrum-one-bsc-usd"` \| `"arbitrum-sepolia-eth"` \| `"arbitrum-sepolia-weth"` \| `"arbitrum-sepolia-link"` \| `"arbitrum-sepolia-usdc"` \| `"arbitrum-sepolia-wsteth"` \| `"arbitrum-sepolia-usdt"` \| `"arbitrum-sepolia-matic"` \| `"arbitrum-sepolia-wmatic"` \| `"arbitrum-sepolia-stmatic"` \| `"arbitrum-sepolia-avax"` \| `"arbitrum-sepolia-wavax"` \| `"arbitrum-sepolia-bnb"` \| `"arbitrum-sepolia-wbnb"` \| `"arbitrum-sepolia-axlusdc"` \| `"arbitrum-sepolia-crusdc"` \| `"arbitrum-sepolia-bsc-usd"` \| `"avalanche-c-chain-eth"` \| `"avalanche-c-chain-weth"` \| `"avalanche-c-chain-link"` \| `"avalanche-c-chain-usdc"` \| `"avalanche-c-chain-wsteth"` \| `"avalanche-c-chain-usdt"` \| `"avalanche-c-chain-matic"` \| `"avalanche-c-chain-wmatic"` \| `"avalanche-c-chain-stmatic"` \| `"avalanche-c-chain-avax"` \| `"avalanche-c-chain-wavax"` \| `"avalanche-c-chain-bnb"` \| `"avalanche-c-chain-wbnb"` \| `"avalanche-c-chain-axlusdc"` \| `"avalanche-c-chain-crusdc"` \| `"avalanche-c-chain-bsc-usd"` \| `"scroll-eth"` \| `"scroll-weth"` \| `"scroll-link"` \| `"scroll-usdc"` \| `"scroll-wsteth"` \| `"scroll-usdt"` \| `"scroll-matic"` \| `"scroll-wmatic"` \| `"scroll-stmatic"` \| `"scroll-avax"` \| `"scroll-wavax"` \| `"scroll-bnb"` \| `"scroll-wbnb"` \| `"scroll-axlusdc"` \| `"scroll-crusdc"` \| `"scroll-bsc-usd"` \| `"bnb-smart-chain-eth"` \| `"bnb-smart-chain-weth"` \| `"bnb-smart-chain-link"` \| `"bnb-smart-chain-usdc"` \| `"bnb-smart-chain-wsteth"` \| `"bnb-smart-chain-usdt"` \| `"bnb-smart-chain-matic"` \| `"bnb-smart-chain-wmatic"` \| `"bnb-smart-chain-stmatic"` \| `"bnb-smart-chain-avax"` \| `"bnb-smart-chain-wavax"` \| `"bnb-smart-chain-bnb"` \| `"bnb-smart-chain-wbnb"` \| `"bnb-smart-chain-axlusdc"` \| `"bnb-smart-chain-crusdc"` \| `"bnb-smart-chain-bsc-usd"` \| `"base-eth"` \| `"base-weth"` \| `"base-link"` \| `"base-usdc"` \| `"base-wsteth"` \| `"base-usdt"` \| `"base-matic"` \| `"base-wmatic"` \| `"base-stmatic"` \| `"base-avax"` \| `"base-wavax"` \| `"base-bnb"` \| `"base-wbnb"` \| `"base-axlusdc"` \| `"base-crusdc"` \| `"base-bsc-usd"`

A string representing the chain and token to be used for payment,
                                       in the format "chainName-tokenSymbol" (e.g., "optimism-usdc").

#### Returns

`Promise`\<[`ApiPaymentData`](../interfaces/ApiPaymentData.md)\>

A promise that resolves to an ApiPaymentData object containing:
  - chainId: The chain ID where the payment will be processed
  - masterWallet: The address of the master wallet used in the SDK.
  - salt: The salt used for deriving the multichain account.
  - token: The address of the token to be used for payment.

#### Async

#### Throws

May throw an error if:
  - There's an issue retrieving the multichain account.
  - The specified payment token is not found or invalid.
  - Any other unexpected error occurs during the process.

#### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
try {
  const paymentData = await klasterSDK.encodeTxFee('optimism-usdc');
  console.log('Payment data:', paymentData);
} catch (error) {
  console.error('Failed to encode transaction fee:', error);
}
```

#### Note

This function uses the current state of the SDK, including the master wallet address.
Make sure these are set correctly before calling this function.

#### See

 - [getMultichainAccount](KlasterSDK.md#getmultichainaccount) - Used internally to fetch the current multichain account.
 - [getPaymentToken](../functions/getPaymentToken.md) - Used internally to resolve the token address from the ChainTokenPair.

#### Defined in

[index.ts:227](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L227)

***

### execute()

> **execute**(`response`, `signedHash`): `Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

Executes the Interchain Transaction (iTx) based on a quote response and signed hash.

This function triggers the execution of an iTx on the Klaster network. Once called
with a valid signed hash, the execution becomes irreversible.

#### Parameters

• **response**: [`QuoteResponse`](../interfaces/QuoteResponse.md)

The response object returned from calling the `quote`
                                  endpoint. This contains necessary information for execution.

• **signedHash**: `string`

The iTx hash, signed by the wallet using the personalSign method.

#### Returns

`Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

A promise that resolves to an ExecuteResponse object
                                    containing the iTx hash of the executed transaction.

#### Async

#### Throws

May throw an error if the execution fails, if the signed hash is invalid,
                or if there are network issues.

#### Remarks

IMPORTANT: The hash must be signed using the personalSign method.
If you encounter an "invalid merkle hash" error, ensure you're using the correct
signing method. Some libraries may default to a different signing scheme.

#### Example

```ts
try {
  const quoteResponse = await klasterSDK.getQuote(...);
  const signedHash = await wallet.personalSign(quoteResponse.hash);
  const executeResponse = await klasterSDK.execute(quoteResponse, signedHash);
  console.log('Execution successful. iTx hash:', executeResponse.iTxHash);
} catch (error) {
  console.error('Execution failed:', error);
}
```

#### See

 - [getQuote](KlasterSDK.md#getquote) - Used to obtain the necessary QuoteResponse.
 - [https://eips.ethereum.org/EIPS/eip-191](https://eips.ethereum.org/EIPS/eip-191) - EIP-191 for signed data standard.

#### Defined in

[index.ts:342](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L342)

***

### getMultichainAccount()

> **getMultichainAccount**(): `Promise`\<[`MultichainAccount`](../interfaces/MultichainAccount.md)\>

Fetches the multichain ERC4337 account derived from the current masterWallet and salt.

This asynchronous function retrieves the multichain smart contract account that is
deterministically derived using the `masterWallet` and `salt` parameters set during
SDK initialization or subsequently updated.

The derived account is compliant with the ERC4337 standard for account abstraction
and can be used across multiple blockchain networks.

#### Returns

`Promise`\<[`MultichainAccount`](../interfaces/MultichainAccount.md)\>

A promise that resolves to a MultichainAccount object.
  The object contains:
  - salt: The current active account salt used for derivation.
  - address: The derived multichain smart contract account address.

#### Async

#### Throws

May throw an error if there's an issue communicating with the node service
  or if the account derivation fails.

#### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
try {
  const account = await klasterSDK.getMultichainAccount();
  console.log('Derived account:', account.address);
  console.log('Used salt:', account.salt);
} catch (error) {
  console.error('Failed to fetch multichain account:', error);
}
```

#### Note

This function uses the current values of `masterWallet` and `salt`. If you need
to derive a different account, use `changeMasterAddress()` or `changeAccountSalt()`
before calling this function.

#### See

 - [changeMasterAddress](KlasterSDK.md#changemasteraddress) - To change the master wallet address.
 - [changeAccountSalt](KlasterSDK.md#changeaccountsalt) - To change the account salt.

#### Defined in

[index.ts:178](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L178)

***

### getQuote()

> **getQuote**(`itx`): `Promise`\<[`QuoteResponse`](../interfaces/QuoteResponse.md)\>

Fetches a quote for the interchain transaction (iTx).

This asynchronous function processes an InterchainTransaction object to obtain a quote
from the Klaster Node. The quote contains the full iTx information as well as the
required payment information for executing the transaction.

#### Parameters

• **itx**: [`InterchainTransaction`](../interfaces/InterchainTransaction.md)

The full Interchain Transaction object. This object
       should contain an array of actions and payment information.

#### Returns

`Promise`\<[`QuoteResponse`](../interfaces/QuoteResponse.md)\>

A promise that resolves to a QuoteResponse object
         containing the full iTx information and required payment details.

#### Async

#### Throws

Throws an error if the actions array in the iTx is empty.

#### Throws

May throw errors from the EncodingService or the node service if there
                are issues encoding the actions or fetching the quote.

#### Example

```ts
const itx = {
  actions: [
    {
      txs: [{ to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n }],
      chainId: 1
    }
  ],
  paymentInfo: { ... } // ApiPaymentData object
};

try {
  const quote = await klasterSDK.getQuote(itx);
  console.log('Received quote:', quote);
} catch (error) {
  console.error('Failed to get quote:', error);
}
```

#### Note

This function uses the current values of `masterAddress` and `activeAccountSalt`
      from the SDK instance for encoding user operations.

#### See

 - [EncodingService.encodeUserOpCall](EncodingService.md#encodeuseropcall) - Used for encoding single transaction actions.
 - [EncodingService.encodeBatchCall](EncodingService.md#encodebatchcall) - Used for encoding multi-transaction actions.

#### Defined in

[index.ts:282](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L282)

***

### transferAndExecute()

> **transferAndExecute**(`params`): `Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

Transfers ERC20 tokens to the multichain smart contract account and
executes the desired actions across multiple blockchains.

This function performs two main operations:
1. Transfers ERC20 tokens to the smart contract account.
2. Executes an interchain transaction (iTx) after the transfer is confirmed.

#### Parameters

• **params**

The parameters object containing transfer and execution instructions.

• **params.executeItx**

Instructions for executing the interchain transaction.

• **params.executeItx.iTx**: [`InterchainTransaction`](../interfaces/InterchainTransaction.md)

• **params.executeItx.signItxHashAction**

• **params.transferToSmartAccount**

Instructions for transferring ERC20 tokens to the smart account.

• **params.transferToSmartAccount.amountToTransfer**: `bigint`

• **params.transferToSmartAccount.chainId**: `number`

• **params.transferToSmartAccount.executeTxAction**

• **params.transferToSmartAccount.tokenToTransfer**: \`0x$\{string\}\`

#### Returns

`Promise`\<[`ExecuteResponse`](../interfaces/ExecuteResponse.md)\>

A promise that resolves to the execution response of the iTx.

#### Async

#### Throws

May throw errors during the token transfer, quote fetching, signing, or execution phases.

#### Example

```ts
const result = await klasterSDK.transferAndExecute({
  transferToSmartAccount: {
    tokenToTransfer: '0x...',  // ERC20 token address
    amountToTransfer: BigInt(1000000),  // Amount in smallest unit
    chainId: 1,  // Ethereum mainnet
    executeTxAction: async (tx) => {
      // Implement your transaction execution logic here
      await yourProvider.sendTransaction(tx);
    }
  },
  executeItx: {
    iTx: {
      // Your interchain transaction object
    },
    signItxHashAction: async (hash) => {
      // Implement your signing logic here
      return await yourSigner.signMessage(hash);
    }
  }
});
```

#### Remarks

- The `executeTxAction` function should handle the actual sending of the transfer transaction to the blockchain.
  Consult the Klaster documentation for details on implementing this with your specific provider.
- The `signItxHashAction` function should handle the signing of the iTx hash.
  Ensure you're using the correct signing method as specified in the Klaster documentation.
- This function will wait for the transfer transaction to be accepted before proceeding with the iTx execution.

#### See

 - Klaster documentation for detailed information on implementing `executeTxAction` and `signItxHashAction`.
 - [buildTransferERC20FromEoaTx](../functions/buildTransferERC20FromEoaTx.md) - Used internally to construct the transfer transaction.
 - [getQuote](KlasterSDK.md#getquote) - Used internally to fetch the quote for the iTx.
 - [execute](KlasterSDK.md#execute) - Used internally to execute the iTx.

#### Defined in

[index.ts:466](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L466)
