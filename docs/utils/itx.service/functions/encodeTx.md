[**klaster-sdk**](../../../README.md) • **Docs**

***

[klaster-sdk](../../../README.md) / [utils/itx.service](../README.md) / encodeTx

# Function: encodeTx()

> **encodeTx**(`tx`): [`RawTransaction`](../../../types/interfaces/RawTransaction.md)

A syntactic helper for working with RawTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent way
of handling RawTransaction objects.

## Parameters

• **tx**: [`RawTransaction`](../../../types/interfaces/RawTransaction.md)

The RawTransaction object to be "encoded".

## Returns

[`RawTransaction`](../../../types/interfaces/RawTransaction.md)

The same RawTransaction object, unchanged.

## Example

```ts
const tx = encodeTx({ ... });
```

## Defined in

[utils/itx.service.ts:53](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/utils/itx.service.ts#L53)
