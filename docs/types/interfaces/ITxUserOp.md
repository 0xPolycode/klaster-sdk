[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / ITxUserOp

# Interface: ITxUserOp

Represents the minimal UserOperation required for a fully described Klaster Interchain Transaction model.
This interface defines the structure for actions that can be performed on a single chain within
a Klaster Interchain Transaction.

 ITxUserOp

## Properties

### chainId

> **chainId**: `number`

The identifier of the blockchain network on which the transaction(s) will be executed.

#### Defined in

[types.ts:212](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L212)

***

### lowerBoundTime?

> `optional` **lowerBoundTime**: `number`

Optional. The earliest timestamp at which the transaction(s) can be executed.

#### Defined in

[types.ts:214](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L214)

***

### txs

> **txs**: [`RawTransaction`](RawTransaction.md)[]

An array of raw transactions to be executed on the specified chain.
  - If this array contains a single transaction, the 'execute' function will be called on the smart contract account.
  - If this array contains multiple transactions, the 'batchExecute' function will be called on the smart contract account.

#### Defined in

[types.ts:211](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L211)

***

### upperBoundTime?

> `optional` **upperBoundTime**: `number`

Optional. The latest timestamp by which the transaction(s) should be executed.

#### Defined in

[types.ts:213](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L213)
