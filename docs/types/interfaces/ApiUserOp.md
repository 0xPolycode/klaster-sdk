[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / ApiUserOp

# Interface: ApiUserOp

Represents the user operation format expected as input by the Klaster Node API.
This interface defines the structure for ERC-4337 compliant user operations
specifically tailored for Klaster Multichain Smart Accounts.

 ApiUserOp

## Properties

### callData

> **callData**: `string`

The encoded function call data to be executed on the blockchain.
This represents the actual operation the user wants to perform.

#### Defined in

[types.ts:25](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L25)

***

### callGasLimit

> **callGasLimit**: `string`

The maximum amount of gas that can be used for the execution
of the callData on the target blockchain. This is part of the ERC-4337 specification for
account abstraction.

#### Defined in

[types.ts:26](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L26)

***

### chainId

> **chainId**: `number`

The ID of the blockchain network where the UserOp is to be executed.
This determines which network the operation will be sent to.

#### Defined in

[types.ts:27](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L27)

***

### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

#### Defined in

[types.ts:23](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L23)

***

### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

#### Defined in

[types.ts:24](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L24)
