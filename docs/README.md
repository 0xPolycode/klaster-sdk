**klaster-sdk** • **Docs**

***

# klaster-sdk

## Classes

### EncodingService

A service for encoding user operations (UserOps) for Smart Contract Accounts in the Klaster ecosystem.

This service provides methods to encode single and batch transactions into UserOps
that can be processed by the Klaster Node. It intelligently chooses between single
and batch encoding to optimize for gas efficiency and ensure atomic execution of
multiple transactions when needed.

#### Constructors

##### new EncodingService()

> **new EncodingService**(): [`EncodingService`](README.md#encodingservice)

###### Returns

[`EncodingService`](README.md#encodingservice)

#### Methods

##### encodeBatchCall()

> `static` **encodeBatchCall**(`txs`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](README.md#apiuserop)

Encodes multiple transactions into a single UserOp for batch execution on a Smart Contract Account.

This method prepares a UserOp that, when executed, will call the 'executeBatch' function
on the Smart Contract Account, allowing multiple transactions to be executed atomically.
This can lead to significant gas savings compared to executing transactions individually.

###### Parameters

• **txs**: [`RawTransaction`](README.md#rawtransaction)[]

An array of transactions to be encoded for batch execution.

• **chainId**: `number`

The ID of the blockchain where the transactions will be executed.

• **masterWallet**: \`0x$\{string\}\`

The address of the master wallet from which the Smart Contract Account is derived.

• **salt**: `string`

A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.

###### Returns

[`ApiUserOp`](README.md#apiuserop)

A UserOp object representing the batch execution, which can be sent to the Klaster Node for quoting and execution.

###### Example

```ts
const userOp = EncodingService.encodeBatchCall(
  [
    { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
    { to: '0x...', value: 2000n, data: '0x...', gasLimit: 50000n }
  ],
  1,
  '0x...',
  'uniqueSalt'
);
```

###### Defined in

[utils/encoding.service.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/encoding.service.ts#L80)

##### encodeUserOpCall()

> `static` **encodeUserOpCall**(`tx`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](README.md#apiuserop)

Encodes a single transaction into a UserOp for execution on a Smart Contract Account.

This method prepares a UserOp that, when executed, will call the 'execute' function
on the Smart Contract Account derived from the provided masterWallet and salt.

###### Parameters

• **tx**: [`RawTransaction`](README.md#rawtransaction)

The transaction to be encoded.

• **chainId**: `number`

The ID of the blockchain where the transaction will be executed.

• **masterWallet**: \`0x$\{string\}\`

The address of the master wallet from which the Smart Contract Account is derived.

• **salt**: `string`

A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.

###### Returns

[`ApiUserOp`](README.md#apiuserop)

A UserOp object that can be sent to the Klaster Node for quoting and execution.

###### Example

```ts
const userOp = EncodingService.encodeUserOpCall(
  { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
  1,
  '0x...',
  'uniqueSalt'
);
```

###### Defined in

[utils/encoding.service.ts:35](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/encoding.service.ts#L35)

***

### KlasterSDK

KlasterSDK creates an instance of the SDK used to communicate with
the Klaster protocol. It offers typed information for all the types 
used to communicate with the protocol, as well as utility functions
for encoding tokens, transactions and accounts.

#### Constructors

##### new KlasterSDK()

> **new KlasterSDK**(`config`): [`KlasterSDK`](README.md#klastersdk)

###### Parameters

• **config**: [`Config`](README.md#config)

###### Returns

[`KlasterSDK`](README.md#klastersdk)

###### Defined in

[index.ts:81](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L81)

#### Properties

##### activeAccountSalt

> **activeAccountSalt**: `string`

###### Defined in

[index.ts:77](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L77)

##### masterAddress

> **masterAddress**: \`0x$\{string\}\`

###### Defined in

[index.ts:79](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L79)

#### Methods

##### autoExecute()

> **autoExecute**(`itx`, `signHash`): `Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

Automatically fetches a quote and executes the Interchain Transaction (iTx).

This function streamlines the process of executing an iTx by combining the quote
fetching and execution steps. It automatically handles the flow of getting a quote,
signing the iTx hash, and executing the transaction.

###### Parameters

• **itx**: [`InterchainTransaction`](README.md#interchaintransaction)

The interchain transaction object containing
       the transactions you wish to execute. This should include all necessary
       information for the iTx, such as actions and payment details.

• **signHash**

A function to sign the iTx hash with a private key.
       This function should take a hash string (prefixed with '0x') and return
       a Promise resolving to the signed hash string.

###### Returns

`Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

A promise that resolves to an ExecuteResponse object,
         containing the iTx hash of the executed transaction.

###### Async

###### Throws

May throw errors during the quote fetching, signing, or execution phases.
                These could include network errors, signing failures, or execution issues.

###### Example

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

###### Remarks

- The signHash function must return a properly signed hash. Ensure you're using
  the correct signing method (e.g., personalSign) to avoid execution errors.
- This function abstracts away the separate steps of quoting and executing,
  making it more convenient for straightforward iTx executions.

###### See

 - [getQuote](README.md#getquote) - Used internally to fetch the quote.
 - [execute](README.md#execute) - Used internally to execute the transaction.

###### Defined in

[index.ts:398](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L398)

##### changeAccountSalt()

> **changeAccountSalt**(`salt`): `void`

Changes the salt value used for deriving ERC4337 multichain smart accounts.

This function updates the `activeAccountSalt` parameter of the SDK instance. The salt,
in combination with the connected Externally Owned Account (EOA), is used to
deterministically derive ERC4337 compliant multichain smart contract accounts.
Changing this salt will result in deriving a different smart contract account
for all subsequent operations.

###### Parameters

• **salt**: `string`

The new salt value to be used for account derivation.
                       This should be a unique string that, when combined with
                       the EOA address, produces a unique smart account address.

###### Returns

`void`

###### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
klasterSDK.changeAccountSalt('uniqueSaltValue123');
```

###### Note

Changing the account salt will affect all future account derivations and operations.
It does not affect previously derived accounts or ongoing transactions. Ensure you understand
the implications of changing this salt in the context of your application.

###### See

For more information on ERC4337 and account abstraction, visit:
[Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337|EIP-4337:)

###### Defined in

[index.ts:139](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L139)

##### changeMasterAddress()

> **changeMasterAddress**(`wallet`): `void`

Changes the master wallet address used for deriving ERC4337 multichain smart accounts.

This function updates the `masterAddress` parameter of the SDK instance. The master address,
in combination with a salt value, is used to deterministically derive ERC4337 compliant
multichain smart contract accounts. Changing this address will result in deriving
different smart contract accounts for all subsequent operations.

###### Parameters

• **wallet**: \`0x$\{string\}\`

The new master wallet address to be used for account derivation.
                          This should be a valid Ethereum address.

###### Returns

`void`

###### Throws

May throw an error if the provided address is invalid.

###### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
klasterSDK.changeMasterAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

###### Note

Changing the master address will affect all future account derivations and operations.
It does not affect previously derived accounts or ongoing transactions. Ensure you understand
the implications of changing this address in the context of your application.

###### See

For more information on ERC4337 and account abstraction, visit:
[Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337|EIP-4337:)

###### Defined in

[index.ts:110](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L110)

##### encodeTxFee()

> **encodeTxFee**(`paymentToken`): `Promise`\<[`ApiPaymentData`](README.md#apipaymentdata)\>

A helper function that prepares an ApiPaymentData object for transaction fee payments.

This asynchronous function simplifies the process of creating an ApiPaymentData object,
which is used to specify how transaction fees should be paid on the Klaster Protocol.
It combines information from the multichain account, the current SDK configuration,
and the specified payment token to create a complete payment data structure.

###### Parameters

• **paymentToken**: `"ethereum-eth"` \| `"ethereum-weth"` \| `"ethereum-link"` \| `"ethereum-usdc"` \| `"ethereum-wsteth"` \| `"ethereum-usdt"` \| `"ethereum-matic"` \| `"ethereum-wmatic"` \| `"ethereum-stmatic"` \| `"ethereum-avax"` \| `"ethereum-wavax"` \| `"ethereum-bnb"` \| `"ethereum-wbnb"` \| `"ethereum-axlusdc"` \| `"ethereum-crusdc"` \| `"ethereum-bsc-usd"` \| `"optimism-eth"` \| `"optimism-weth"` \| `"optimism-link"` \| `"optimism-usdc"` \| `"optimism-wsteth"` \| `"optimism-usdt"` \| `"optimism-matic"` \| `"optimism-wmatic"` \| `"optimism-stmatic"` \| `"optimism-avax"` \| `"optimism-wavax"` \| `"optimism-bnb"` \| `"optimism-wbnb"` \| `"optimism-axlusdc"` \| `"optimism-crusdc"` \| `"optimism-bsc-usd"` \| `"sepolia-eth"` \| `"sepolia-weth"` \| `"sepolia-link"` \| `"sepolia-usdc"` \| `"sepolia-wsteth"` \| `"sepolia-usdt"` \| `"sepolia-matic"` \| `"sepolia-wmatic"` \| `"sepolia-stmatic"` \| `"sepolia-avax"` \| `"sepolia-wavax"` \| `"sepolia-bnb"` \| `"sepolia-wbnb"` \| `"sepolia-axlusdc"` \| `"sepolia-crusdc"` \| `"sepolia-bsc-usd"` \| `"polygon-eth"` \| `"polygon-weth"` \| `"polygon-link"` \| `"polygon-usdc"` \| `"polygon-wsteth"` \| `"polygon-usdt"` \| `"polygon-matic"` \| `"polygon-wmatic"` \| `"polygon-stmatic"` \| `"polygon-avax"` \| `"polygon-wavax"` \| `"polygon-bnb"` \| `"polygon-wbnb"` \| `"polygon-axlusdc"` \| `"polygon-crusdc"` \| `"polygon-bsc-usd"` \| `"arbitrum-one-eth"` \| `"arbitrum-one-weth"` \| `"arbitrum-one-link"` \| `"arbitrum-one-usdc"` \| `"arbitrum-one-wsteth"` \| `"arbitrum-one-usdt"` \| `"arbitrum-one-matic"` \| `"arbitrum-one-wmatic"` \| `"arbitrum-one-stmatic"` \| `"arbitrum-one-avax"` \| `"arbitrum-one-wavax"` \| `"arbitrum-one-bnb"` \| `"arbitrum-one-wbnb"` \| `"arbitrum-one-axlusdc"` \| `"arbitrum-one-crusdc"` \| `"arbitrum-one-bsc-usd"` \| `"arbitrum-sepolia-eth"` \| `"arbitrum-sepolia-weth"` \| `"arbitrum-sepolia-link"` \| `"arbitrum-sepolia-usdc"` \| `"arbitrum-sepolia-wsteth"` \| `"arbitrum-sepolia-usdt"` \| `"arbitrum-sepolia-matic"` \| `"arbitrum-sepolia-wmatic"` \| `"arbitrum-sepolia-stmatic"` \| `"arbitrum-sepolia-avax"` \| `"arbitrum-sepolia-wavax"` \| `"arbitrum-sepolia-bnb"` \| `"arbitrum-sepolia-wbnb"` \| `"arbitrum-sepolia-axlusdc"` \| `"arbitrum-sepolia-crusdc"` \| `"arbitrum-sepolia-bsc-usd"` \| `"avalanche-c-chain-eth"` \| `"avalanche-c-chain-weth"` \| `"avalanche-c-chain-link"` \| `"avalanche-c-chain-usdc"` \| `"avalanche-c-chain-wsteth"` \| `"avalanche-c-chain-usdt"` \| `"avalanche-c-chain-matic"` \| `"avalanche-c-chain-wmatic"` \| `"avalanche-c-chain-stmatic"` \| `"avalanche-c-chain-avax"` \| `"avalanche-c-chain-wavax"` \| `"avalanche-c-chain-bnb"` \| `"avalanche-c-chain-wbnb"` \| `"avalanche-c-chain-axlusdc"` \| `"avalanche-c-chain-crusdc"` \| `"avalanche-c-chain-bsc-usd"` \| `"scroll-eth"` \| `"scroll-weth"` \| `"scroll-link"` \| `"scroll-usdc"` \| `"scroll-wsteth"` \| `"scroll-usdt"` \| `"scroll-matic"` \| `"scroll-wmatic"` \| `"scroll-stmatic"` \| `"scroll-avax"` \| `"scroll-wavax"` \| `"scroll-bnb"` \| `"scroll-wbnb"` \| `"scroll-axlusdc"` \| `"scroll-crusdc"` \| `"scroll-bsc-usd"` \| `"bnb-smart-chain-eth"` \| `"bnb-smart-chain-weth"` \| `"bnb-smart-chain-link"` \| `"bnb-smart-chain-usdc"` \| `"bnb-smart-chain-wsteth"` \| `"bnb-smart-chain-usdt"` \| `"bnb-smart-chain-matic"` \| `"bnb-smart-chain-wmatic"` \| `"bnb-smart-chain-stmatic"` \| `"bnb-smart-chain-avax"` \| `"bnb-smart-chain-wavax"` \| `"bnb-smart-chain-bnb"` \| `"bnb-smart-chain-wbnb"` \| `"bnb-smart-chain-axlusdc"` \| `"bnb-smart-chain-crusdc"` \| `"bnb-smart-chain-bsc-usd"` \| `"base-eth"` \| `"base-weth"` \| `"base-link"` \| `"base-usdc"` \| `"base-wsteth"` \| `"base-usdt"` \| `"base-matic"` \| `"base-wmatic"` \| `"base-stmatic"` \| `"base-avax"` \| `"base-wavax"` \| `"base-bnb"` \| `"base-wbnb"` \| `"base-axlusdc"` \| `"base-crusdc"` \| `"base-bsc-usd"`

A string representing the chain and token to be used for payment,
                                       in the format "chainName-tokenSymbol" (e.g., "optimism-usdc").

###### Returns

`Promise`\<[`ApiPaymentData`](README.md#apipaymentdata)\>

A promise that resolves to an ApiPaymentData object containing:
  - chainId: The chain ID where the payment will be processed
  - masterWallet: The address of the master wallet used in the SDK.
  - salt: The salt used for deriving the multichain account.
  - token: The address of the token to be used for payment.

###### Async

###### Throws

May throw an error if:
  - There's an issue retrieving the multichain account.
  - The specified payment token is not found or invalid.
  - Any other unexpected error occurs during the process.

###### Example

```ts
// Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
try {
  const paymentData = await klasterSDK.encodeTxFee('optimism-usdc');
  console.log('Payment data:', paymentData);
} catch (error) {
  console.error('Failed to encode transaction fee:', error);
}
```

###### Note

This function uses the current state of the SDK, including the master wallet address.
Make sure these are set correctly before calling this function.

###### See

 - [getMultichainAccount](README.md#getmultichainaccount) - Used internally to fetch the current multichain account.
 - [getPaymentToken](README.md#getpaymenttoken) - Used internally to resolve the token address from the ChainTokenPair.

###### Defined in

[index.ts:228](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L228)

##### execute()

> **execute**(`response`, `signedHash`): `Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

Executes the Interchain Transaction (iTx) based on a quote response and signed hash.

This function triggers the execution of an iTx on the Klaster network. Once called
with a valid signed hash, the execution becomes irreversible.

###### Parameters

• **response**: [`QuoteResponse`](README.md#quoteresponse)

The response object returned from calling the `quote`
                                  endpoint. This contains necessary information for execution.

• **signedHash**: `string`

The iTx hash, signed by the wallet using the personalSign method.

###### Returns

`Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

A promise that resolves to an ExecuteResponse object
                                    containing the iTx hash of the executed transaction.

###### Async

###### Throws

May throw an error if the execution fails, if the signed hash is invalid,
                or if there are network issues.

###### Remarks

IMPORTANT: The hash must be signed using the personalSign method.
If you encounter an "invalid merkle hash" error, ensure you're using the correct
signing method. Some libraries may default to a different signing scheme.

###### Example

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

###### See

 - [getQuote](README.md#getquote) - Used to obtain the necessary QuoteResponse.
 - [https://eips.ethereum.org/EIPS/eip-191](https://eips.ethereum.org/EIPS/eip-191) - EIP-191 for signed data standard.

###### Defined in

[index.ts:343](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L343)

##### getMultichainAccount()

> **getMultichainAccount**(): `Promise`\<[`MultichainAccount`](README.md#multichainaccount)\>

Fetches the multichain ERC4337 account derived from the current masterWallet and salt.

This asynchronous function retrieves the multichain smart contract account that is
deterministically derived using the `masterWallet` and `salt` parameters set during
SDK initialization or subsequently updated.

The derived account is compliant with the ERC4337 standard for account abstraction
and can be used across multiple blockchain networks.

###### Returns

`Promise`\<[`MultichainAccount`](README.md#multichainaccount)\>

A promise that resolves to a MultichainAccount object.
  The object contains:
  - salt: The current active account salt used for derivation.
  - address: The derived multichain smart contract account address.

###### Async

###### Throws

May throw an error if there's an issue communicating with the node service
  or if the account derivation fails.

###### Example

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

###### Note

This function uses the current values of `masterWallet` and `salt`. If you need
to derive a different account, use `changeMasterAddress()` or `changeAccountSalt()`
before calling this function.

###### See

 - [changeMasterAddress](README.md#changemasteraddress) - To change the master wallet address.
 - [changeAccountSalt](README.md#changeaccountsalt) - To change the account salt.

###### Defined in

[index.ts:179](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L179)

##### getQuote()

> **getQuote**(`itx`): `Promise`\<[`QuoteResponse`](README.md#quoteresponse)\>

Fetches a quote for the interchain transaction (iTx).

This asynchronous function processes an InterchainTransaction object to obtain a quote
from the Klaster Node. The quote contains the full iTx information as well as the
required payment information for executing the transaction.

###### Parameters

• **itx**: [`InterchainTransaction`](README.md#interchaintransaction)

The full Interchain Transaction object. This object
       should contain an array of actions and payment information.

###### Returns

`Promise`\<[`QuoteResponse`](README.md#quoteresponse)\>

A promise that resolves to a QuoteResponse object
         containing the full iTx information and required payment details.

###### Async

###### Throws

Throws an error if the actions array in the iTx is empty.

###### Throws

May throw errors from the EncodingService or the node service if there
                are issues encoding the actions or fetching the quote.

###### Example

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

###### Note

This function uses the current values of `masterAddress` and `activeAccountSalt`
      from the SDK instance for encoding user operations.

###### See

 - [EncodingService.encodeUserOpCall](README.md#encodeuseropcall) - Used for encoding single transaction actions.
 - [EncodingService.encodeBatchCall](README.md#encodebatchcall) - Used for encoding multi-transaction actions.

###### Defined in

[index.ts:283](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L283)

##### transferAndExecute()

> **transferAndExecute**(`params`): `Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

Transfers ERC20 tokens to the multichain smart contract account and
executes the desired actions across multiple blockchains.

This function performs two main operations:
1. Transfers ERC20 tokens to the smart contract account.
2. Executes an interchain transaction (iTx) after the transfer is confirmed.

###### Parameters

• **params**

The parameters object containing transfer and execution instructions.

• **params.executeItx**

Instructions for executing the interchain transaction.

• **params.executeItx.iTx**: [`InterchainTransaction`](README.md#interchaintransaction)

• **params.executeItx.signItxHashAction**

• **params.transferToSmartAccount**

Instructions for transferring ERC20 tokens to the smart account.

• **params.transferToSmartAccount.amountToTransfer**: `bigint`

• **params.transferToSmartAccount.chainId**: `number`

• **params.transferToSmartAccount.executeTxAction**

• **params.transferToSmartAccount.tokenToTransfer**: \`0x$\{string\}\`

###### Returns

`Promise`\<[`ExecuteResponse`](README.md#executeresponse)\>

A promise that resolves to the execution response of the iTx.

###### Async

###### Throws

May throw errors during the token transfer, quote fetching, signing, or execution phases.

###### Example

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

###### Remarks

- The `executeTxAction` function should handle the actual sending of the transfer transaction to the blockchain.
  Consult the Klaster documentation for details on implementing this with your specific provider.
- The `signItxHashAction` function should handle the signing of the iTx hash.
  Ensure you're using the correct signing method as specified in the Klaster documentation.
- This function will wait for the transfer transaction to be accepted before proceeding with the iTx execution.

###### See

 - Klaster documentation for detailed information on implementing `executeTxAction` and `signItxHashAction`.
 - [buildTransferERC20FromEoaTx](README.md#buildtransfererc20fromeoatx) - Used internally to construct the transfer transaction.
 - [getQuote](README.md#getquote) - Used internally to fetch the quote for the iTx.
 - [execute](README.md#execute) - Used internally to execute the iTx.

###### Defined in

[index.ts:467](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L467)

***

### SaltUtil

Utility class for generating salt values used in KlasterSDK functions.

Salt values are crucial for deriving unique smart contract accounts within the Klaster ecosystem.
This class provides methods to generate salts for different account scenarios.

#### Constructors

##### new SaltUtil()

> **new SaltUtil**(): [`SaltUtil`](README.md#saltutil)

###### Returns

[`SaltUtil`](README.md#saltutil)

#### Methods

##### accountAt()

> `static` **accountAt**(`i`): `string`

Generates a salt for an account at a specific index.

This method allows for deterministic generation of salts for multiple accounts.

###### Parameters

• **i**: `number`

The index of the account, starting from 0.

###### Returns

`string`

A salt value corresponding to the given index.

###### Example

```ts
const thirdAccountSalt = SaltUtil.accountAt(2);
console.log(thirdAccountSalt); // Outputs: "2"
```

###### Defined in

[utils/salt.service.ts:33](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/salt.service.ts#L33)

##### customAccount()

> `static` **customAccount**(`salt`): `string`

Allows for the use of a custom salt value.

This method provides flexibility for users who want to use their own salt values.

###### Parameters

• **salt**: `string`

A custom salt value.

###### Returns

`string`

The provided custom salt value.

###### Example

```ts
const customSalt = SaltUtil.customAccount("mySuperUniqueValue");
console.log(customSalt); // Outputs: "mySuperUniqueValue"
```

###### Remarks

When using custom salts, ensure they are unique to avoid account collisions.
Custom salts should be securely generated and managed to maintain account security.

###### Defined in

[utils/salt.service.ts:53](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/salt.service.ts#L53)

##### firstAccount()

> `static` **firstAccount**(): `string`

Generates a salt for the first (default) account.

###### Returns

`string`

A salt value of "0", representing the first account.

###### Example

```ts
const firstAccountSalt = SaltUtil.firstAccount();
console.log(firstAccountSalt); // Outputs: "0"
```

###### Defined in

[utils/salt.service.ts:17](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/salt.service.ts#L17)

## Interfaces

### ApiPaymentData

Represents the payment data structure for gas costs and transaction fees in the Klaster API.
This interface defines the necessary information for processing payments related to
user operations on the Klaster network.

 ApiPaymentData

#### Properties

##### chainId

> **chainId**: `number`

The ID of the blockchain network on which the payment for
the gas cost and transaction fees will be processed. This determines the specific
blockchain where the payment transaction will occur.

###### Defined in

[types.ts:52](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L52)

##### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

###### Defined in

[types.ts:49](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L49)

##### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

###### Defined in

[types.ts:50](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L50)

##### token

> **token**: `string`

The address of the ERC20 token that will be used to pay for
the gas cost and transaction fees associated with the user operation.

###### Defined in

[types.ts:51](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L51)

***

### ApiUserOp

Represents the user operation format expected as input by the Klaster Node API.
This interface defines the structure for ERC-4337 compliant user operations
specifically tailored for Klaster Multichain Smart Accounts.

 ApiUserOp

#### Properties

##### callData

> **callData**: `string`

The encoded function call data to be executed on the blockchain.
This represents the actual operation the user wants to perform.

###### Defined in

[types.ts:25](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L25)

##### callGasLimit

> **callGasLimit**: `string`

The maximum amount of gas that can be used for the execution
of the callData on the target blockchain. This is part of the ERC-4337 specification for
account abstraction.

###### Defined in

[types.ts:26](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L26)

##### chainId

> **chainId**: `number`

The ID of the blockchain network where the UserOp is to be executed.
This determines which network the operation will be sent to.

###### Defined in

[types.ts:27](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L27)

##### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

###### Defined in

[types.ts:23](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L23)

##### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

###### Defined in

[types.ts:24](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L24)

***

### ERC4337UserOp

Represents the full ERC-4337 UserOperation standard object format.
This interface defines the structure of a user operation as specified in the ERC-4337 standard
for account abstraction in Ethereum.

 ERC4337UserOp

#### Properties

##### callData

> **callData**: `string`

The data to be passed to the sender during the main execution call.

###### Defined in

[types.ts:77](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L77)

##### callGasLimit

> **callGasLimit**: `string`

The gas limit for the main execution call.

###### Defined in

[types.ts:78](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L78)

##### initCode

> **initCode**: `string`

The initialization code for the account if it hasn't been deployed yet. Empty string if the account is already deployed.

###### Defined in

[types.ts:76](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L76)

##### maxFeePerGas

> **maxFeePerGas**: `string`

The maximum total fee per gas the sender is willing to pay (including the priority fee).

###### Defined in

[types.ts:81](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L81)

##### maxPriorityFeePerGas

> **maxPriorityFeePerGas**: `string`

The maximum priority fee per gas the sender is willing to pay.

###### Defined in

[types.ts:82](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L82)

##### nonce

> **nonce**: `string`

A unique identifier to prevent replay attacks, typically managed by the account itself.

###### Defined in

[types.ts:75](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L75)

##### paymasterAndData

> **paymasterAndData**: `string`

The address of the paymaster sponsoring the transaction, followed by extra data to send to the paymaster. Empty string if there's no paymaster.

###### Defined in

[types.ts:83](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L83)

##### preVerificationGas

> **preVerificationGas**: `string`

The amount of gas to compensate the bundler for pre-verification execution and calldata.

###### Defined in

[types.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L80)

##### sender

> **sender**: \`0x$\{string\}\`

The address of the smart contract account that will make the transaction.

###### Defined in

[types.ts:74](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L74)

##### signature

> **signature**: `string`

The signature over the entire UserOperation, to be validated during verification.

###### Defined in

[types.ts:84](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L84)

##### verificationGasLimit

> **verificationGasLimit**: `string`

The gas limit for the verification step.

###### Defined in

[types.ts:79](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L79)

***

### ExecuteResponse

Represents the response model returned by the /execute route of the Klaster Node API.
This interface encapsulates the result of initiating the execution of an interchain transaction.

 ExecuteResponse

#### Properties

##### iTxHash

> **iTxHash**: `string`

The hash of the Klaster Interchain Transaction (iTx) that has been
submitted for execution. This hash serves as a unique identifier for the interchain transaction
and can be used to track or reference the transaction's status and outcome across multiple chains.

###### Defined in

[types.ts:154](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L154)

***

### ExecutedAction

Represents the model returned by the Klaster Node API after an Action has been executed.
This interface provides detailed information about the execution status and parameters
of a user operation processed by Klaster.

 ExecutedAction

#### Properties

##### chainId

> **chainId**: `string`

The identifier of the blockchain network on which the userOp is executed.

###### Defined in

[types.ts:112](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L112)

##### executionData

> **executionData**: `string`

The callData of the executed action, representing the actual operation performed.

###### Defined in

[types.ts:115](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L115)

##### executionStatus

> **executionStatus**: `"SUCCESS"` \| `"PENDING"` \| `"FAILED"`

The current status of the UserOp execution:
  - "SUCCESS": The operation was successfully executed.
  - "FAILED": The operation failed during execution.
  - "PENDING": The Klaster node is waiting for conditions to be met before execution.
    This status is part of the Klaster spec and is particularly relevant for multichain actions
    where execution conditions on the destination chain may depend on prior token bridging.

###### Defined in

[types.ts:114](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L114)

##### lowerBoundTimestap

> **lowerBoundTimestap**: `string`

The earliest timestamp at which the userOp will be executed on the target blockchain.

###### Defined in

[types.ts:110](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L110)

##### maxGasLimit

> **maxGasLimit**: `string`

The maximum gas limit allowed for the execution of this userOp.

###### Defined in

[types.ts:113](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L113)

##### upperBoundTimestamp

> **upperBoundTimestamp**: `string`

The latest timestamp by which the userOp will be executed on the target blockchain.

###### Defined in

[types.ts:111](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L111)

##### userOp

> **userOp**: [`ERC4337UserOp`](README.md#erc4337userop)

The full ERC-4337 UserOperation object that was executed.

###### Defined in

[types.ts:108](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L108)

##### userOpHash

> **userOpHash**: `string`

The hash of the userOp, serving as a unique identifier for the operation.

###### Defined in

[types.ts:109](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L109)

***

### ITxUserOp

Represents the minimal UserOperation required for a fully described Klaster Interchain Transaction model.
This interface defines the structure for actions that can be performed on a single chain within
a Klaster Interchain Transaction.

 ITxUserOp

#### Properties

##### chainId

> **chainId**: `number`

The identifier of the blockchain network on which the transaction(s) will be executed.

###### Defined in

[types.ts:212](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L212)

##### lowerBoundTime?

> `optional` **lowerBoundTime**: `number`

Optional. The earliest timestamp at which the transaction(s) can be executed.

###### Defined in

[types.ts:214](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L214)

##### txs

> **txs**: [`RawTransaction`](README.md#rawtransaction)[]

An array of raw transactions to be executed on the specified chain.
  - If this array contains a single transaction, the 'execute' function will be called on the smart contract account.
  - If this array contains multiple transactions, the 'batchExecute' function will be called on the smart contract account.

###### Defined in

[types.ts:211](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L211)

##### upperBoundTime?

> `optional` **upperBoundTime**: `number`

Optional. The latest timestamp by which the transaction(s) should be executed.

###### Defined in

[types.ts:213](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L213)

***

### InterchainTransaction

#### Properties

##### actions

> **actions**: [`ITxUserOp`](README.md#itxuserop)[]

###### Defined in

[types.ts:193](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L193)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](README.md#apipaymentdata)

###### Defined in

[types.ts:194](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L194)

***

### ItxStatusResponse

Represents the response model returned by the /explorer route of the Klaster Node API.
This interface provides detailed information about the status and execution details of an interchain transaction.

 ItxStatusResponse

#### Properties

##### commitment

> **commitment**: `string`

The cryptographic commitment generated by the Klaster node, guaranteeing
the execution of the interchain transaction.

###### Defined in

[types.ts:183](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L183)

##### itxHash

> **itxHash**: `string`

The hash of the Klaster Interchain Transaction (iTx). Serves as a unique identifier
for the interchain transaction.

###### Defined in

[types.ts:181](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L181)

##### node

> **node**: \`0x$\{string\}\`

The address of the Klaster node that is responsible for executing the interchain transaction.

###### Defined in

[types.ts:182](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L182)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](README.md#apipaymentdata) & `object`

Contains information about the payment for the transaction, including the token
used and the actual amount quoted for the execution.

###### Type declaration

###### tokenAmount

> **tokenAmount**: `string`

###### tokenValue

> **tokenValue**: `string`

###### Defined in

[types.ts:184](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L184)

##### userOps

> **userOps**: [`ExecutedAction`](README.md#executedaction)[]

An array of ExecutedAction objects, each representing the status and
details of a user operation executed as part of this interchain transaction across different chains.

###### Defined in

[types.ts:188](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L188)

***

### MultichainAccount

Represents a Klaster Multichain Smart Contract account model.
This interface defines the essential properties of a smart contract account
that can operate across multiple blockchain networks.

 MultichainAccount

#### Properties

##### address

> **address**: \`0x$\{string\}\`

The unique address of the multichain smart contract account.
  This address is (mostly) consistent across all supported blockchain networks, allowing
  for unified identity and seamless cross-chain operations. Some exceptions to the generated
  address being consistent are blockchains in the zkSync ecosystem & any other ecosystem where
  the CREATE2 opcode doesn't behave the same way as on Ethereum mainnet.

###### Defined in

[types.ts:258](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L258)

##### salt

> **salt**: `string`

A unique value used in the account creation process.
  The salt, combined with other parameters (such as the owner's address),
  ensures that the account address is unique and deterministically generated
  across all supported chains.

###### Defined in

[types.ts:259](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L259)

***

### QuoteResponse

Represents the model returned by the Klaster Node API when a user requests a quote for an interchain transaction.
This interface provides detailed information about the quote, including the transaction hash,
node commitment, and the user operations to be executed across multiple chains.

 QuoteResponse

#### Properties

##### commitment

> **commitment**: `string`

The cryptographic commitment generated by the Klaster node.
This commitment guarantees the execution of the quoted interchain transaction.

###### Defined in

[types.ts:138](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L138)

##### itxHash

> **itxHash**: \`0x$\{string\}\`

The hash of the Klaster Interchain Transaction. This serves
as a unique identifier for the entire interchain operation.

###### Defined in

[types.ts:137](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L137)

##### node

> **node**: \`0x$\{string\}\`

The address of the Klaster node that has returned the quote and
committed itself to executing the interchain transaction.

###### Defined in

[types.ts:139](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L139)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](README.md#apipaymentdata)

Contains information about the payment for the
transaction, including the token to be used and the chain on which the payment will occur.

###### Defined in

[types.ts:140](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L140)

##### userOps

> **userOps**: [`ERC4337UserOp`](README.md#erc4337userop)[]

An array of all UserOperations across all chains that
the node has committed to executing as part of this interchain transaction. Each UserOp
represents a specific action on a particular blockchain within the interchain transaction.

###### Defined in

[types.ts:141](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L141)

***

### RawTransaction

Represents a raw transaction as expected by the `execute` and `batchExecute` functions
of smart contract wallets compliant with the ERC-4337 standard.
This interface defines the structure for a single transaction to be executed
as part of a user operation in account abstraction.

 RawTransaction

#### Properties

##### data

> **data**: `string`

The input data of the transaction, typically the encoded function
  call for contract interactions. For simple value transfers, this can be an empty string.

###### Defined in

[types.ts:236](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L236)

##### gasLimit

> **gasLimit**: `bigint`

The maximum amount of gas that can be used for executing
  this transaction, represented as a bigint. This helps prevent unexpectedly high gas costs.

###### Defined in

[types.ts:237](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L237)

##### to

> **to**: \`0x$\{string\}\`

The recipient address of the transaction. This can be a contract
  address for contract interactions or an EOA for simple transfers.

###### Defined in

[types.ts:234](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L234)

##### value

> **value**: `bigint`

The amount of native currency (e.g., ETH) to be sent with the
  transaction, represented as a bigint. Use 0n for transactions that don't transfer value.

###### Defined in

[types.ts:235](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L235)

***

### SupportedPaymentTokenInfo

#### Properties

##### node

> **node**: \`0x$\{string\}\`

###### Defined in

[types.ts:267](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L267)

##### supported\_chains

> **supported\_chains**: `object`[]

###### Defined in

[types.ts:268](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L268)

##### supported\_gas\_tokens

> **supported\_gas\_tokens**: `object`[]

###### Defined in

[types.ts:272](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L272)

##### version

> **version**: `string`

###### Defined in

[types.ts:266](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/types.ts#L266)

## Type Aliases

### ChainTokenPair

> **ChainTokenPair**: \`$\{ChainConstrainer\}-$\{TokenConstrainer\}\`

Represents a valid combination of a chain name and a token symbol for gas fee payments.

This type ensures type safety when specifying chain-token pairs for gas fee payments in the Klaster SDK.
It combines a ChainConstrainer and a TokenConstrainer with a hyphen separator.

#### Example

```ts
const validGasPaymentPair: ChainTokenPair = 'ethereum-usdc';
// const invalidGasPaymentPair: ChainTokenPair = 'ethereum-btc'; // This would cause a TypeScript error
```

#### Remarks

- This type is specifically used to validate payment tokens for covering gas fees in the Klaster ecosystem.
- Not all combinations of chains and tokens may be valid or supported for gas fee payments.
- The availability of specific tokens for gas fee payments may vary by chain.
- Refer to the Klaster documentation for the most up-to-date list of supported chain-token pairs for gas payments.

#### Defined in

[utils/token-resolver.service.ts:101](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/token-resolver.service.ts#L101)

***

### Config

> **Config**: `object`

Configuration options for initializing the Klaster SDK.

#### Type declaration

##### masterAddress

> **masterAddress**: `Address`

##### nodeUrl

> **nodeUrl**: `string`

#### Defined in

[index.ts:37](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L37)

## Functions

### buildTransferERC20FromEoaTx()

> **buildTransferERC20FromEoaTx**(`params`): [`RawTransaction`](README.md#rawtransaction)

Builds a transaction to transfer ERC20 tokens from an Externally Owned Account (EOA)
to another account, typically a smart contract account.

This function constructs a RawTransaction object that, when executed, will transfer
the specified amount of ERC20 tokens from the sending EOA to the recipient address.
It's commonly used to fund smart contract accounts with tokens.

#### Parameters

• **params**

The parameters for building the transaction.

• **params.amount**: `bigint`

The amount of tokens to transfer, in the token's smallest unit (e.g., wei for ETH-like tokens).

• **params.chainId**: `number`

The ID of the blockchain network where the transaction will be executed.

• **params.recipient**: \`0x$\{string\}\`

The address of the account receiving the tokens.

• **params.token**: \`0x$\{string\}\`

The address of the ERC20 token contract.

#### Returns

[`RawTransaction`](README.md#rawtransaction)

A RawTransaction object ready to be signed and broadcasted.
  The object includes:
  - to: The address of the ERC20 token contract.
  - value: Always 0n for ERC20 transfers.
  - data: The encoded function call data for the ERC20 'transfer' function.
  - gasLimit: A predefined gas limit set to 55000 (adjust if necessary for different tokens or networks).

#### Example

```ts
const txParams = {
  recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  amount: BigInt(1000000), // 1 USDC if USDC has 6 decimals
  chainId: 1,
  token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC on Ethereum mainnet
};
const rawTx = buildTransferERC20FromEoaTx(txParams);
// rawTx can now be signed and sent to the network
```

#### Defined in

[utils/utils.service.ts:127](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/utils.service.ts#L127)

***

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

[utils/unified-balance.service.ts:45](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/unified-balance.service.ts#L45)

***

### encodeAction()

> **encodeAction**(`txs`, `chainId`): `object`

A syntactic helper for creating action objects in the Klaster SDK.

This function combines an array of RawTransactions with a chain ID into an object.
It's used to provide a consistent coding style when working with actions in the Klaster SDK.

#### Parameters

• **txs**: [`RawTransaction`](README.md#rawtransaction)[]

An array of RawTransaction objects.

• **chainId**: `number`

The ID of the blockchain for this action.

#### Returns

`object`

An object containing the transactions and chain ID.

##### chainId

> **chainId**: `number`

##### txs

> **txs**: [`RawTransaction`](README.md#rawtransaction)[]

#### Example

```ts
const action = encodeAction([{ ... }, { ... }], 1);
```

#### Defined in

[utils/itx.service.ts:36](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/itx.service.ts#L36)

***

### encodeItx()

> **encodeItx**(`itx`): [`InterchainTransaction`](README.md#interchaintransaction)

A syntactic helper for creating InterchainTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent and 
readable way of creating InterchainTransaction objects.

#### Parameters

• **itx**: [`InterchainTransaction`](README.md#interchaintransaction)

The InterchainTransaction object to be "encoded".

#### Returns

[`InterchainTransaction`](README.md#interchaintransaction)

The same InterchainTransaction object, unchanged.

#### Example

```ts
// Instead of:
// const iTx: InterchainTransaction = { ... };
// Use:
const iTx = encodeItx({ ... });
```

#### Defined in

[utils/itx.service.ts:19](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/itx.service.ts#L19)

***

### encodeTx()

> **encodeTx**(`tx`): [`RawTransaction`](README.md#rawtransaction)

A syntactic helper for working with RawTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent way
of handling RawTransaction objects.

#### Parameters

• **tx**: [`RawTransaction`](README.md#rawtransaction)

The RawTransaction object to be "encoded".

#### Returns

[`RawTransaction`](README.md#rawtransaction)

The same RawTransaction object, unchanged.

#### Example

```ts
const tx = encodeTx({ ... });
```

#### Defined in

[utils/itx.service.ts:53](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/itx.service.ts#L53)

***

### fetchInjectedAddress()

> **fetchInjectedAddress**(): `Promise`\<`Address` \| `undefined`\>

Fetches the primary Ethereum address from an injected web3 wallet provider (e.g., MetaMask).

This function creates a wallet client using the viem library and the injected Ethereum provider.
It then retrieves the list of addresses associated with the wallet and returns the first address.

#### Returns

`Promise`\<`Address` \| `undefined`\>

A promise that resolves to:
  - The primary Ethereum address (type Address) if available.
  - undefined if no addresses are associated with the wallet or if the wallet is locked.

#### Async

#### Function

fetchInjectedAddress

#### Throws

Throws an error if:
  - No injected Ethereum provider is detected (i.e., window.ethereum is undefined).
  - The user denies permission to access their accounts.
  - There's an issue connecting to the Ethereum network.

#### Example

```ts
try {
  const address = await fetchInjectedAddress();
  if (address) {
    console.log('Connected wallet address:', address);
  } else {
    console.log('No wallet address found or wallet is locked');
  }
} catch (error) {
  console.error('Error fetching wallet address:', error);
}
```

#### Requires

viem

#### See

[Wallet Client Documentation](https://viem.sh/docs/clients/wallet.html|Viem)

#### Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

#### Defined in

[utils/utils.service.ts:47](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/utils.service.ts#L47)

***

### getPaymentToken()

> **getPaymentToken**(`chainTokenPair`): `undefined` \| `string`

Retrieves the payment token address for a given chain-token pair.

This function uses the ChainTokenService to look up the token address
based on the provided chain-token pair.

#### Parameters

• **chainTokenPair**: `"ethereum-eth"` \| `"ethereum-weth"` \| `"ethereum-link"` \| `"ethereum-usdc"` \| `"ethereum-wsteth"` \| `"ethereum-usdt"` \| `"ethereum-matic"` \| `"ethereum-wmatic"` \| `"ethereum-stmatic"` \| `"ethereum-avax"` \| `"ethereum-wavax"` \| `"ethereum-bnb"` \| `"ethereum-wbnb"` \| `"ethereum-axlusdc"` \| `"ethereum-crusdc"` \| `"ethereum-bsc-usd"` \| `"optimism-eth"` \| `"optimism-weth"` \| `"optimism-link"` \| `"optimism-usdc"` \| `"optimism-wsteth"` \| `"optimism-usdt"` \| `"optimism-matic"` \| `"optimism-wmatic"` \| `"optimism-stmatic"` \| `"optimism-avax"` \| `"optimism-wavax"` \| `"optimism-bnb"` \| `"optimism-wbnb"` \| `"optimism-axlusdc"` \| `"optimism-crusdc"` \| `"optimism-bsc-usd"` \| `"sepolia-eth"` \| `"sepolia-weth"` \| `"sepolia-link"` \| `"sepolia-usdc"` \| `"sepolia-wsteth"` \| `"sepolia-usdt"` \| `"sepolia-matic"` \| `"sepolia-wmatic"` \| `"sepolia-stmatic"` \| `"sepolia-avax"` \| `"sepolia-wavax"` \| `"sepolia-bnb"` \| `"sepolia-wbnb"` \| `"sepolia-axlusdc"` \| `"sepolia-crusdc"` \| `"sepolia-bsc-usd"` \| `"polygon-eth"` \| `"polygon-weth"` \| `"polygon-link"` \| `"polygon-usdc"` \| `"polygon-wsteth"` \| `"polygon-usdt"` \| `"polygon-matic"` \| `"polygon-wmatic"` \| `"polygon-stmatic"` \| `"polygon-avax"` \| `"polygon-wavax"` \| `"polygon-bnb"` \| `"polygon-wbnb"` \| `"polygon-axlusdc"` \| `"polygon-crusdc"` \| `"polygon-bsc-usd"` \| `"arbitrum-one-eth"` \| `"arbitrum-one-weth"` \| `"arbitrum-one-link"` \| `"arbitrum-one-usdc"` \| `"arbitrum-one-wsteth"` \| `"arbitrum-one-usdt"` \| `"arbitrum-one-matic"` \| `"arbitrum-one-wmatic"` \| `"arbitrum-one-stmatic"` \| `"arbitrum-one-avax"` \| `"arbitrum-one-wavax"` \| `"arbitrum-one-bnb"` \| `"arbitrum-one-wbnb"` \| `"arbitrum-one-axlusdc"` \| `"arbitrum-one-crusdc"` \| `"arbitrum-one-bsc-usd"` \| `"arbitrum-sepolia-eth"` \| `"arbitrum-sepolia-weth"` \| `"arbitrum-sepolia-link"` \| `"arbitrum-sepolia-usdc"` \| `"arbitrum-sepolia-wsteth"` \| `"arbitrum-sepolia-usdt"` \| `"arbitrum-sepolia-matic"` \| `"arbitrum-sepolia-wmatic"` \| `"arbitrum-sepolia-stmatic"` \| `"arbitrum-sepolia-avax"` \| `"arbitrum-sepolia-wavax"` \| `"arbitrum-sepolia-bnb"` \| `"arbitrum-sepolia-wbnb"` \| `"arbitrum-sepolia-axlusdc"` \| `"arbitrum-sepolia-crusdc"` \| `"arbitrum-sepolia-bsc-usd"` \| `"avalanche-c-chain-eth"` \| `"avalanche-c-chain-weth"` \| `"avalanche-c-chain-link"` \| `"avalanche-c-chain-usdc"` \| `"avalanche-c-chain-wsteth"` \| `"avalanche-c-chain-usdt"` \| `"avalanche-c-chain-matic"` \| `"avalanche-c-chain-wmatic"` \| `"avalanche-c-chain-stmatic"` \| `"avalanche-c-chain-avax"` \| `"avalanche-c-chain-wavax"` \| `"avalanche-c-chain-bnb"` \| `"avalanche-c-chain-wbnb"` \| `"avalanche-c-chain-axlusdc"` \| `"avalanche-c-chain-crusdc"` \| `"avalanche-c-chain-bsc-usd"` \| `"scroll-eth"` \| `"scroll-weth"` \| `"scroll-link"` \| `"scroll-usdc"` \| `"scroll-wsteth"` \| `"scroll-usdt"` \| `"scroll-matic"` \| `"scroll-wmatic"` \| `"scroll-stmatic"` \| `"scroll-avax"` \| `"scroll-wavax"` \| `"scroll-bnb"` \| `"scroll-wbnb"` \| `"scroll-axlusdc"` \| `"scroll-crusdc"` \| `"scroll-bsc-usd"` \| `"bnb-smart-chain-eth"` \| `"bnb-smart-chain-weth"` \| `"bnb-smart-chain-link"` \| `"bnb-smart-chain-usdc"` \| `"bnb-smart-chain-wsteth"` \| `"bnb-smart-chain-usdt"` \| `"bnb-smart-chain-matic"` \| `"bnb-smart-chain-wmatic"` \| `"bnb-smart-chain-stmatic"` \| `"bnb-smart-chain-avax"` \| `"bnb-smart-chain-wavax"` \| `"bnb-smart-chain-bnb"` \| `"bnb-smart-chain-wbnb"` \| `"bnb-smart-chain-axlusdc"` \| `"bnb-smart-chain-crusdc"` \| `"bnb-smart-chain-bsc-usd"` \| `"base-eth"` \| `"base-weth"` \| `"base-link"` \| `"base-usdc"` \| `"base-wsteth"` \| `"base-usdt"` \| `"base-matic"` \| `"base-wmatic"` \| `"base-stmatic"` \| `"base-avax"` \| `"base-wavax"` \| `"base-bnb"` \| `"base-wbnb"` \| `"base-axlusdc"` \| `"base-crusdc"` \| `"base-bsc-usd"`

A string representing the chain and token,
                                         in the format "chainName-tokenSymbol".
                                         For example: "ethereum-usdc" or "arbitrumOne-link".

#### Returns

`undefined` \| `string`

The address of the payment token if found,
                              or undefined if the token is not found for the given chain.

#### Throws

May throw an error if the ChainTokenService encounters issues
                (e.g., network errors when fetching data).

#### Example

```ts
const usdcAddress = getPaymentToken('ethereum-usdc');
console.log(usdcAddress); // '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
```

#### Defined in

[utils/token-resolver.service.ts:267](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/token-resolver.service.ts#L267)

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

[utils/unified-balance.service.ts:107](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/unified-balance.service.ts#L107)

***

### initKlaster()

> **initKlaster**(`config`): [`KlasterSDK`](README.md#klastersdk)

Initializes the Klaster SDK with the provided configuration.

This function serves as the entry point for using the Klaster SDK. It creates and
returns a new instance of the KlasterSDK class, configured with the provided options.

#### Parameters

• **config**: [`Config`](README.md#config)

The configuration options for the Klaster SDK.

#### Returns

[`KlasterSDK`](README.md#klastersdk)

A new instance of the KlasterSDK, ready for use.

#### Example

```ts
import { initKlaster, Config } from 'klaster-sdk';

const config: Config = {
  nodeUrl: 'https://klaster-node.example.com',
  masterAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
};

const klasterSDK = initKlaster(config);

// Now you can use klasterSDK to interact with the Klaster ecosystem
```

#### Throws

Throws an error if the provided configuration is invalid or if
  the SDK fails to initialize for any reason.

#### Defined in

[index.ts:65](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/index.ts#L65)

***

### signWithInjectedWallet()

> **signWithInjectedWallet**(`address`, `message`): `Promise`\<`string`\>

Signs a message using the injected Ethereum provider (e.g., MetaMask) in the browser.

This function uses the `personal_sign` method to create a signature with the user's
Ethereum account. It requires a web3-enabled browser with an injected Ethereum provider.

#### Parameters

• **address**: \`0x$\{string\}\`

The Ethereum address to sign the message with. This should
                           be an address that the user controls in their injected wallet.

• **message**: `string`

The message to be signed. This will be converted to UTF-8
                          and prefixed with "\x19Ethereum Signed Message:\n" before signing.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature string.
                           The signature is in hexadecimal format.

#### Throws

Throws an error if the injected Ethereum provider is not available,
                if the user rejects the signature request, or if there's any other
                issue during the signing process.

#### Example

```ts
try {
  const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  const message = 'Hello, Ethereum!';
  const signature = await signWithInjectedWallet(address, message);
  console.log('Signature:', signature);
} catch (error) {
  console.error('Error signing message:', error);
}
```

#### Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

#### Defined in

[utils/utils.service.ts:86](https://github.com/0xPolycode/klaster-sdk/blob/52050b3d5fce2921b820be9d0e1e05b64455118e/src/utils/utils.service.ts#L86)
