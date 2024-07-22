[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / encodeItx

# Function: encodeItx()

> **encodeItx**(`itx`): [`InterchainTransaction`](../interfaces/InterchainTransaction.md)

A syntactic helper for creating InterchainTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent and 
readable way of creating InterchainTransaction objects.

## Parameters

• **itx**: [`InterchainTransaction`](../interfaces/InterchainTransaction.md)

The InterchainTransaction object to be "encoded".

## Returns

[`InterchainTransaction`](../interfaces/InterchainTransaction.md)

The same InterchainTransaction object, unchanged.

## Example

```ts
// Instead of:
// const iTx: InterchainTransaction = { ... };
// Use:
const iTx = encodeItx({ ... });
```

## Defined in

[utils/itx.service.ts:19](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/itx.service.ts#L19)
