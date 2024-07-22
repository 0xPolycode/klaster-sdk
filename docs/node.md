[**klaster-sdk**](README.md) • **Docs**

***

[klaster-sdk](README.md) / node.service

# node.service

## Classes

### KlasterNodeService

Service class for interacting with a Klaster Node.

This class provides methods to communicate with a Klaster Node, including
operations like getting quotes, executing transactions, retrieving wallet
addresses, and checking transaction statuses.

#### Constructors

##### new KlasterNodeService()

> **new KlasterNodeService**(`nodeUrl`): [`KlasterNodeService`](node.md#klasternodeservice)

Creates an instance of KlasterNodeService.

###### Parameters

• **nodeUrl**: `string`

The URL of the Klaster Node to connect to.

###### Returns

[`KlasterNodeService`](node.md#klasternodeservice)

###### Defined in

[node.service.ts:28](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L28)

#### Properties

##### client

> **client**: `AxiosInstance`

###### Defined in

[node.service.ts:21](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L21)

#### Methods

##### executeTx()

> **executeTx**(`quoteResponse`, `signedHash`): `Promise`\<[`ExecuteResponse`](types.md#executeresponse)\>

Executes a transaction on the Klaster Node based on a quote response and signed hash.

###### Parameters

• **quoteResponse**: [`QuoteResponse`](types.md#quoteresponse)

The quote response object.

• **signedHash**: `string`

The signed hash of the transaction.

###### Returns

`Promise`\<[`ExecuteResponse`](types.md#executeresponse)\>

A promise that resolves to the execution response.

###### Async

###### Throws

Throws an error if the execution fails, with a parsed error message.

###### Defined in

[node.service.ts:72](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L72)

##### getItxStatus()

> **getItxStatus**(`hash`): `Promise`\<[`ItxStatusResponse`](types.md#itxstatusresponse)\>

Fetches the status of an interchain transaction (iTx) by its hash.

###### Parameters

• **hash**: `string`

The hash of the interchain transaction.

###### Returns

`Promise`\<[`ItxStatusResponse`](types.md#itxstatusresponse)\>

A promise that resolves to the iTx status response.

###### Async

###### Throws

Throws an error if the status retrieval fails, with a parsed error message.

###### Defined in

[node.service.ts:109](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L109)

##### getQuote()

> **getQuote**(`userOps`, `paymentInfo`): `Promise`\<[`QuoteResponse`](types.md#quoteresponse)\>

Fetches a quote for user operations from the Klaster Node.

###### Parameters

• **userOps**: [`ApiUserOp`](types.md#apiuserop)[]

An array of user operations to get a quote for.

• **paymentInfo**: [`ApiPaymentData`](types.md#apipaymentdata)

Payment information for the quote.

###### Returns

`Promise`\<[`QuoteResponse`](types.md#quoteresponse)\>

A promise that resolves to the quote response.

###### Async

###### Throws

Throws an error if the request fails, with a parsed error message.

###### Defined in

[node.service.ts:44](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L44)

##### getWallet()

> **getWallet**(`masterWallet`, `salt`): `Promise`\<\`0x$\{string\}\`\>

Retrieves a wallet address for a given master wallet and salt. This uses ERC4337
account derivation to derive the address of the smart contract wallet.

###### Parameters

• **masterWallet**: `string`

The address of the master wallet.

• **salt**: `string`

The salt value used for address derivation.

###### Returns

`Promise`\<\`0x$\{string\}\`\>

A promise that resolves to the derived wallet address.

###### Async

###### Throws

Throws an error if the retrieval fails, with a parsed error message.

###### Defined in

[node.service.ts:92](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/node.service.ts#L92)
