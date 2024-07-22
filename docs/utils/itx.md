[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / utils/itx.service

# utils/itx.service

## Functions

### encodeAction()

> **encodeAction**(`txs`, `chainId`): `object`

A syntactic helper for creating action objects in the Klaster SDK.

This function combines an array of RawTransactions with a chain ID into an object.
It's used to provide a consistent coding style when working with actions in the Klaster SDK.

#### Parameters

• **txs**: [`RawTransaction`](../types.md#rawtransaction)[]

An array of RawTransaction objects.

• **chainId**: `number`

The ID of the blockchain for this action.

#### Returns

`object`

An object containing the transactions and chain ID.

##### chainId

> **chainId**: `number`

##### txs

> **txs**: [`RawTransaction`](../types.md#rawtransaction)[]

#### Example

```ts
const action = encodeAction([{ ... }, { ... }], 1);
```

#### Defined in

[utils/itx.service.ts:36](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/itx.service.ts#L36)

***

### encodeItx()

> **encodeItx**(`itx`): [`InterchainTransaction`](../types.md#interchaintransaction)

A syntactic helper for creating InterchainTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent and 
readable way of creating InterchainTransaction objects.

#### Parameters

• **itx**: [`InterchainTransaction`](../types.md#interchaintransaction)

The InterchainTransaction object to be "encoded".

#### Returns

[`InterchainTransaction`](../types.md#interchaintransaction)

The same InterchainTransaction object, unchanged.

#### Example

```ts
// Instead of:
// const iTx: InterchainTransaction = { ... };
// Use:
const iTx = encodeItx({ ... });
```

#### Defined in

[utils/itx.service.ts:19](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/itx.service.ts#L19)

***

### encodeTx()

> **encodeTx**(`tx`): [`RawTransaction`](../types.md#rawtransaction)

A syntactic helper for working with RawTransaction objects in the Klaster SDK.

This function returns its input unchanged. Its purpose is to provide a consistent
coding style when working with the Klaster SDK, allowing for a more fluent way
of handling RawTransaction objects.

#### Parameters

• **tx**: [`RawTransaction`](../types.md#rawtransaction)

The RawTransaction object to be "encoded".

#### Returns

[`RawTransaction`](../types.md#rawtransaction)

The same RawTransaction object, unchanged.

#### Example

```ts
const tx = encodeTx({ ... });
```

#### Defined in

[utils/itx.service.ts:53](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/itx.service.ts#L53)
