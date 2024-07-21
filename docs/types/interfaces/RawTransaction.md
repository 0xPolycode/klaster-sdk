[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / RawTransaction

# Interface: RawTransaction

Represents a raw transaction as expected by the `execute` and `batchExecute` functions
of smart contract wallets compliant with the ERC-4337 standard.
This interface defines the structure for a single transaction to be executed
as part of a user operation in account abstraction.

 RawTransaction

## Properties

### data

> **data**: `string`

The input data of the transaction, typically the encoded function
  call for contract interactions. For simple value transfers, this can be an empty string.

#### Defined in

[types.ts:236](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L236)

***

### gasLimit

> **gasLimit**: `bigint`

The maximum amount of gas that can be used for executing
  this transaction, represented as a bigint. This helps prevent unexpectedly high gas costs.

#### Defined in

[types.ts:237](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L237)

***

### to

> **to**: \`0x$\{string\}\`

The recipient address of the transaction. This can be a contract
  address for contract interactions or an EOA for simple transfers.

#### Defined in

[types.ts:234](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L234)

***

### value

> **value**: `bigint`

The amount of native currency (e.g., ETH) to be sent with the
  transaction, represented as a bigint. Use 0n for transactions that don't transfer value.

#### Defined in

[types.ts:235](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L235)
