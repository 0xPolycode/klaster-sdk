[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / QuoteResponse

# Interface: QuoteResponse

Represents the model returned by the Klaster Node API when a user requests a quote for an interchain transaction.
This interface provides detailed information about the quote, including the transaction hash,
node commitment, and the user operations to be executed across multiple chains.

 QuoteResponse

## Properties

### commitment

> **commitment**: `string`

The cryptographic commitment generated by the Klaster node.
This commitment guarantees the execution of the quoted interchain transaction.

#### Defined in

[types.ts:138](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L138)

***

### itxHash

> **itxHash**: \`0x$\{string\}\`

The hash of the Klaster Interchain Transaction. This serves
as a unique identifier for the entire interchain operation.

#### Defined in

[types.ts:137](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L137)

***

### node

> **node**: \`0x$\{string\}\`

The address of the Klaster node that has returned the quote and
committed itself to executing the interchain transaction.

#### Defined in

[types.ts:139](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L139)

***

### paymentInfo

> **paymentInfo**: [`ApiPaymentData`](ApiPaymentData.md)

Contains information about the payment for the
transaction, including the token to be used and the chain on which the payment will occur.

#### Defined in

[types.ts:140](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L140)

***

### userOps

> **userOps**: [`ERC4337UserOp`](ERC4337UserOp.md)[]

An array of all UserOperations across all chains that
the node has committed to executing as part of this interchain transaction. Each UserOp
represents a specific action on a particular blockchain within the interchain transaction.

#### Defined in

[types.ts:141](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L141)