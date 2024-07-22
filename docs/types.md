[**klaster-sdk**](README.md) • **Docs**

***

[klaster-sdk](README.md) / types

# types

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

[types.ts:52](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L52)

##### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

###### Defined in

[types.ts:49](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L49)

##### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

###### Defined in

[types.ts:50](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L50)

##### token

> **token**: `string`

The address of the ERC20 token that will be used to pay for
the gas cost and transaction fees associated with the user operation.

###### Defined in

[types.ts:51](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L51)

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

[types.ts:25](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L25)

##### callGasLimit

> **callGasLimit**: `string`

The maximum amount of gas that can be used for the execution
of the callData on the target blockchain. This is part of the ERC-4337 specification for
account abstraction.

###### Defined in

[types.ts:26](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L26)

##### chainId

> **chainId**: `number`

The ID of the blockchain network where the UserOp is to be executed.
This determines which network the operation will be sent to.

###### Defined in

[types.ts:27](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L27)

##### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

###### Defined in

[types.ts:23](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L23)

##### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

###### Defined in

[types.ts:24](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L24)

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

[types.ts:77](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L77)

##### callGasLimit

> **callGasLimit**: `string`

The gas limit for the main execution call.

###### Defined in

[types.ts:78](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L78)

##### initCode

> **initCode**: `string`

The initialization code for the account if it hasn't been deployed yet. Empty string if the account is already deployed.

###### Defined in

[types.ts:76](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L76)

##### maxFeePerGas

> **maxFeePerGas**: `string`

The maximum total fee per gas the sender is willing to pay (including the priority fee).

###### Defined in

[types.ts:81](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L81)

##### maxPriorityFeePerGas

> **maxPriorityFeePerGas**: `string`

The maximum priority fee per gas the sender is willing to pay.

###### Defined in

[types.ts:82](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L82)

##### nonce

> **nonce**: `string`

A unique identifier to prevent replay attacks, typically managed by the account itself.

###### Defined in

[types.ts:75](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L75)

##### paymasterAndData

> **paymasterAndData**: `string`

The address of the paymaster sponsoring the transaction, followed by extra data to send to the paymaster. Empty string if there's no paymaster.

###### Defined in

[types.ts:83](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L83)

##### preVerificationGas

> **preVerificationGas**: `string`

The amount of gas to compensate the bundler for pre-verification execution and calldata.

###### Defined in

[types.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L80)

##### sender

> **sender**: \`0x$\{string\}\`

The address of the smart contract account that will make the transaction.

###### Defined in

[types.ts:74](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L74)

##### signature

> **signature**: `string`

The signature over the entire UserOperation, to be validated during verification.

###### Defined in

[types.ts:84](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L84)

##### verificationGasLimit

> **verificationGasLimit**: `string`

The gas limit for the verification step.

###### Defined in

[types.ts:79](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L79)

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

[types.ts:154](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L154)

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

[types.ts:112](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L112)

##### executionData

> **executionData**: `string`

The callData of the executed action, representing the actual operation performed.

###### Defined in

[types.ts:115](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L115)

##### executionStatus

> **executionStatus**: `"SUCCESS"` \| `"PENDING"` \| `"FAILED"`

The current status of the UserOp execution:
  - "SUCCESS": The operation was successfully executed.
  - "FAILED": The operation failed during execution.
  - "PENDING": The Klaster node is waiting for conditions to be met before execution.
    This status is part of the Klaster spec and is particularly relevant for multichain actions
    where execution conditions on the destination chain may depend on prior token bridging.

###### Defined in

[types.ts:114](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L114)

##### lowerBoundTimestap

> **lowerBoundTimestap**: `string`

The earliest timestamp at which the userOp will be executed on the target blockchain.

###### Defined in

[types.ts:110](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L110)

##### maxGasLimit

> **maxGasLimit**: `string`

The maximum gas limit allowed for the execution of this userOp.

###### Defined in

[types.ts:113](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L113)

##### upperBoundTimestamp

> **upperBoundTimestamp**: `string`

The latest timestamp by which the userOp will be executed on the target blockchain.

###### Defined in

[types.ts:111](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L111)

##### userOp

> **userOp**: [`ERC4337UserOp`](types.md#erc4337userop)

The full ERC-4337 UserOperation object that was executed.

###### Defined in

[types.ts:108](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L108)

##### userOpHash

> **userOpHash**: `string`

The hash of the userOp, serving as a unique identifier for the operation.

###### Defined in

[types.ts:109](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L109)

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

[types.ts:212](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L212)

##### lowerBoundTime?

> `optional` **lowerBoundTime**: `number`

Optional. The earliest timestamp at which the transaction(s) can be executed.

###### Defined in

[types.ts:214](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L214)

##### txs

> **txs**: [`RawTransaction`](types.md#rawtransaction)[]

An array of raw transactions to be executed on the specified chain.
  - If this array contains a single transaction, the 'execute' function will be called on the smart contract account.
  - If this array contains multiple transactions, the 'batchExecute' function will be called on the smart contract account.

###### Defined in

[types.ts:211](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L211)

##### upperBoundTime?

> `optional` **upperBoundTime**: `number`

Optional. The latest timestamp by which the transaction(s) should be executed.

###### Defined in

[types.ts:213](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L213)

***

### InterchainTransaction

#### Properties

##### actions

> **actions**: [`ITxUserOp`](types.md#itxuserop)[]

###### Defined in

[types.ts:193](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L193)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](types.md#apipaymentdata)

###### Defined in

[types.ts:194](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L194)

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

[types.ts:183](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L183)

##### itxHash

> **itxHash**: `string`

The hash of the Klaster Interchain Transaction (iTx). Serves as a unique identifier
for the interchain transaction.

###### Defined in

[types.ts:181](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L181)

##### node

> **node**: \`0x$\{string\}\`

The address of the Klaster node that is responsible for executing the interchain transaction.

###### Defined in

[types.ts:182](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L182)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](types.md#apipaymentdata) & `object`

Contains information about the payment for the transaction, including the token
used and the actual amount quoted for the execution.

###### Type declaration

###### tokenAmount

> **tokenAmount**: `string`

###### tokenValue

> **tokenValue**: `string`

###### Defined in

[types.ts:184](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L184)

##### userOps

> **userOps**: [`ExecutedAction`](types.md#executedaction)[]

An array of ExecutedAction objects, each representing the status and
details of a user operation executed as part of this interchain transaction across different chains.

###### Defined in

[types.ts:188](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L188)

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

[types.ts:258](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L258)

##### salt

> **salt**: `string`

A unique value used in the account creation process.
  The salt, combined with other parameters (such as the owner's address),
  ensures that the account address is unique and deterministically generated
  across all supported chains.

###### Defined in

[types.ts:259](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L259)

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

[types.ts:138](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L138)

##### itxHash

> **itxHash**: \`0x$\{string\}\`

The hash of the Klaster Interchain Transaction. This serves
as a unique identifier for the entire interchain operation.

###### Defined in

[types.ts:137](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L137)

##### node

> **node**: \`0x$\{string\}\`

The address of the Klaster node that has returned the quote and
committed itself to executing the interchain transaction.

###### Defined in

[types.ts:139](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L139)

##### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](types.md#apipaymentdata)

Contains information about the payment for the
transaction, including the token to be used and the chain on which the payment will occur.

###### Defined in

[types.ts:140](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L140)

##### userOps

> **userOps**: [`ERC4337UserOp`](types.md#erc4337userop)[]

An array of all UserOperations across all chains that
the node has committed to executing as part of this interchain transaction. Each UserOp
represents a specific action on a particular blockchain within the interchain transaction.

###### Defined in

[types.ts:141](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L141)

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

[types.ts:236](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L236)

##### gasLimit

> **gasLimit**: `bigint`

The maximum amount of gas that can be used for executing
  this transaction, represented as a bigint. This helps prevent unexpectedly high gas costs.

###### Defined in

[types.ts:237](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L237)

##### to

> **to**: \`0x$\{string\}\`

The recipient address of the transaction. This can be a contract
  address for contract interactions or an EOA for simple transfers.

###### Defined in

[types.ts:234](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L234)

##### value

> **value**: `bigint`

The amount of native currency (e.g., ETH) to be sent with the
  transaction, represented as a bigint. Use 0n for transactions that don't transfer value.

###### Defined in

[types.ts:235](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L235)

***

### SupportedPaymentTokenInfo

#### Properties

##### node

> **node**: \`0x$\{string\}\`

###### Defined in

[types.ts:267](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L267)

##### supported\_chains

> **supported\_chains**: `object`[]

###### Defined in

[types.ts:268](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L268)

##### supported\_gas\_tokens

> **supported\_gas\_tokens**: `object`[]

###### Defined in

[types.ts:272](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L272)

##### version

> **version**: `string`

###### Defined in

[types.ts:266](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/types.ts#L266)
