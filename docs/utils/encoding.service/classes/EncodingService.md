[**klaster-sdk**](../../../README.md) • **Docs**

***

[klaster-sdk](../../../README.md) / [utils/encoding.service](../README.md) / EncodingService

# Class: EncodingService

## Constructors

### new EncodingService()

> **new EncodingService**(): [`EncodingService`](EncodingService.md)

#### Returns

[`EncodingService`](EncodingService.md)

## Methods

### encodeBatchCall()

> `static` **encodeBatchCall**(`txs`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](../../../types/interfaces/ApiUserOp.md)

#### Parameters

• **txs**: [`RawTransaction`](../../../types/interfaces/RawTransaction.md)[]

• **chainId**: `number`

• **masterWallet**: \`0x$\{string\}\`

• **salt**: `string`

#### Returns

[`ApiUserOp`](../../../types/interfaces/ApiUserOp.md)

#### Defined in

[utils/encoding.service.ts:27](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/utils/encoding.service.ts#L27)

***

### encodeUserOpCall()

> `static` **encodeUserOpCall**(`tx`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](../../../types/interfaces/ApiUserOp.md)

#### Parameters

• **tx**: [`RawTransaction`](../../../types/interfaces/RawTransaction.md)

• **chainId**: `number`

• **masterWallet**: \`0x$\{string\}\`

• **salt**: `string`

#### Returns

[`ApiUserOp`](../../../types/interfaces/ApiUserOp.md)

#### Defined in

[utils/encoding.service.ts:6](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/utils/encoding.service.ts#L6)
