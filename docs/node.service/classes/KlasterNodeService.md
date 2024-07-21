[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [node.service](../README.md) / KlasterNodeService

# Class: KlasterNodeService

## Constructors

### new KlasterNodeService()

> **new KlasterNodeService**(`nodeUrl`): [`KlasterNodeService`](KlasterNodeService.md)

#### Parameters

• **nodeUrl**: `string`

#### Returns

[`KlasterNodeService`](KlasterNodeService.md)

#### Defined in

[node.service.ts:15](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L15)

## Properties

### client

> **client**: `AxiosInstance`

#### Defined in

[node.service.ts:13](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L13)

## Methods

### executeTx()

> **executeTx**(`quoteResponse`, `signedHash`): `Promise`\<`any`\>

#### Parameters

• **quoteResponse**: [`QuoteResponse`](../../types/interfaces/QuoteResponse.md)

• **signedHash**: `string`

#### Returns

`Promise`\<`any`\>

#### Defined in

[node.service.ts:41](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L41)

***

### getItxStatus()

> **getItxStatus**(`hash`): `Promise`\<[`ItxStatusResponse`](../../types/interfaces/ItxStatusResponse.md)\>

#### Parameters

• **hash**: `string`

#### Returns

`Promise`\<[`ItxStatusResponse`](../../types/interfaces/ItxStatusResponse.md)\>

#### Defined in

[node.service.ts:60](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L60)

***

### getQuote()

> **getQuote**(`userOps`, `paymentInfo`): `Promise`\<[`QuoteResponse`](../../types/interfaces/QuoteResponse.md)\>

#### Parameters

• **userOps**: [`ApiUserOp`](../../types/interfaces/ApiUserOp.md)[]

• **paymentInfo**: [`ApiPaymentData`](../../types/interfaces/ApiPaymentData.md)

#### Returns

`Promise`\<[`QuoteResponse`](../../types/interfaces/QuoteResponse.md)\>

#### Defined in

[node.service.ts:22](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L22)

***

### getWallet()

> **getWallet**(`masterWallet`, `salt`): `Promise`\<\`0x$\{string\}\`\>

#### Parameters

• **masterWallet**: `string`

• **salt**: `string`

#### Returns

`Promise`\<\`0x$\{string\}\`\>

#### Defined in

[node.service.ts:51](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/node.service.ts#L51)
