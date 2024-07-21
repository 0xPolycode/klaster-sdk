[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / ERC4337UserOp

# Interface: ERC4337UserOp

Represents the full ERC-4337 UserOperation standard object format.
This interface defines the structure of a user operation as specified in the ERC-4337 standard
for account abstraction in Ethereum.

 ERC4337UserOp

## Properties

### callData

> **callData**: `string`

The data to be passed to the sender during the main execution call.

#### Defined in

[types.ts:77](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L77)

***

### callGasLimit

> **callGasLimit**: `string`

The gas limit for the main execution call.

#### Defined in

[types.ts:78](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L78)

***

### initCode

> **initCode**: `string`

The initialization code for the account if it hasn't been deployed yet. Empty string if the account is already deployed.

#### Defined in

[types.ts:76](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L76)

***

### maxFeePerGas

> **maxFeePerGas**: `string`

The maximum total fee per gas the sender is willing to pay (including the priority fee).

#### Defined in

[types.ts:81](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L81)

***

### maxPriorityFeePerGas

> **maxPriorityFeePerGas**: `string`

The maximum priority fee per gas the sender is willing to pay.

#### Defined in

[types.ts:82](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L82)

***

### nonce

> **nonce**: `string`

A unique identifier to prevent replay attacks, typically managed by the account itself.

#### Defined in

[types.ts:75](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L75)

***

### paymasterAndData

> **paymasterAndData**: `string`

The address of the paymaster sponsoring the transaction, followed by extra data to send to the paymaster. Empty string if there's no paymaster.

#### Defined in

[types.ts:83](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L83)

***

### preVerificationGas

> **preVerificationGas**: `string`

The amount of gas to compensate the bundler for pre-verification execution and calldata.

#### Defined in

[types.ts:80](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L80)

***

### sender

> **sender**: \`0x$\{string\}\`

The address of the smart contract account that will make the transaction.

#### Defined in

[types.ts:74](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L74)

***

### signature

> **signature**: `string`

The signature over the entire UserOperation, to be validated during verification.

#### Defined in

[types.ts:84](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L84)

***

### verificationGasLimit

> **verificationGasLimit**: `string`

The gas limit for the verification step.

#### Defined in

[types.ts:79](https://github.com/0xPolycode/klaster-sdk/blob/3cf08fc5b4200ded4c039f2f5c07003d95710139/src/types.ts#L79)
