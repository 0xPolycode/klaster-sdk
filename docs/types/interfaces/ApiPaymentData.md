[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / ApiPaymentData

# Interface: ApiPaymentData

Represents the payment data structure for gas costs and transaction fees in the Klaster API.
This interface defines the necessary information for processing payments related to
user operations on the Klaster network.

 ApiPaymentData

## Properties

### chainId

> **chainId**: `number`

The ID of the blockchain network on which the payment for
the gas cost and transaction fees will be processed. This determines the specific
blockchain where the payment transaction will occur.

#### Defined in

[types.ts:52](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L52)

***

### masterWallet

> **masterWallet**: \`0x$\{string\}\`

The address of the Externally Owned Account (EOA) from which
the Klaster Multichain Smart Account is derived.

#### Defined in

[types.ts:49](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L49)

***

### salt

> **salt**: `string`

A unique value used in conjunction with the masterWallet address
to calculate the Klaster Multichain Smart Account address. This ensures unique account
addresses for the same EOA.

#### Defined in

[types.ts:50](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L50)

***

### token

> **token**: `string`

The address of the ERC20 token that will be used to pay for
the gas cost and transaction fees associated with the user operation.

#### Defined in

[types.ts:51](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L51)
