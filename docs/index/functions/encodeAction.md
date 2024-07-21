[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [index](../README.md) / encodeAction

# Function: encodeAction()

> **encodeAction**(`txs`, `chainId`): `object`

A syntactic helper for creating action objects in the Klaster SDK.

This function combines an array of RawTransactions with a chain ID into an object.
It's used to provide a consistent coding style when working with actions in the Klaster SDK.

## Parameters

• **txs**: [`RawTransaction`](../../types/interfaces/RawTransaction.md)[]

An array of RawTransaction objects.

• **chainId**: `number`

The ID of the blockchain for this action.

## Returns

`object`

An object containing the transactions and chain ID.

### chainId

> **chainId**: `number`

### txs

> **txs**: [`RawTransaction`](../../types/interfaces/RawTransaction.md)[]

## Example

```ts
const action = encodeAction([{ ... }, { ... }], 1);
```

## Defined in

[utils/itx.service.ts:36](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/utils/itx.service.ts#L36)
