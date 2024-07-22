[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / utils/encoding.service

# utils/encoding.service

## Classes

### EncodingService

A service for encoding user operations (UserOps) for Smart Contract Accounts in the Klaster ecosystem.

This service provides methods to encode single and batch transactions into UserOps
that can be processed by the Klaster Node. It intelligently chooses between single
and batch encoding to optimize for gas efficiency and ensure atomic execution of
multiple transactions when needed.

#### Constructors

##### new EncodingService()

> **new EncodingService**(): [`EncodingService`](encoding.md#encodingservice)

###### Returns

[`EncodingService`](encoding.md#encodingservice)

#### Methods

##### encodeBatchCall()

> `static` **encodeBatchCall**(`txs`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](../types.md#apiuserop)

Encodes multiple transactions into a single UserOp for batch execution on a Smart Contract Account.

This method prepares a UserOp that, when executed, will call the 'executeBatch' function
on the Smart Contract Account, allowing multiple transactions to be executed atomically.
This can lead to significant gas savings compared to executing transactions individually.

###### Parameters

• **txs**: [`RawTransaction`](../types.md#rawtransaction)[]

An array of transactions to be encoded for batch execution.

• **chainId**: `number`

The ID of the blockchain where the transactions will be executed.

• **masterWallet**: \`0x$\{string\}\`

The address of the master wallet from which the Smart Contract Account is derived.

• **salt**: `string`

A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.

###### Returns

[`ApiUserOp`](../types.md#apiuserop)

A UserOp object representing the batch execution, which can be sent to the Klaster Node for quoting and execution.

###### Example

```ts
const userOp = EncodingService.encodeBatchCall(
  [
    { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
    { to: '0x...', value: 2000n, data: '0x...', gasLimit: 50000n }
  ],
  1,
  '0x...',
  'uniqueSalt'
);
```

###### Defined in

[utils/encoding.service.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/encoding.service.ts#L80)

##### encodeUserOpCall()

> `static` **encodeUserOpCall**(`tx`, `chainId`, `masterWallet`, `salt`): [`ApiUserOp`](../types.md#apiuserop)

Encodes a single transaction into a UserOp for execution on a Smart Contract Account.

This method prepares a UserOp that, when executed, will call the 'execute' function
on the Smart Contract Account derived from the provided masterWallet and salt.

###### Parameters

• **tx**: [`RawTransaction`](../types.md#rawtransaction)

The transaction to be encoded.

• **chainId**: `number`

The ID of the blockchain where the transaction will be executed.

• **masterWallet**: \`0x$\{string\}\`

The address of the master wallet from which the Smart Contract Account is derived.

• **salt**: `string`

A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.

###### Returns

[`ApiUserOp`](../types.md#apiuserop)

A UserOp object that can be sent to the Klaster Node for quoting and execution.

###### Example

```ts
const userOp = EncodingService.encodeUserOpCall(
  { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
  1,
  '0x...',
  'uniqueSalt'
);
```

###### Defined in

[utils/encoding.service.ts:35](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/encoding.service.ts#L35)
