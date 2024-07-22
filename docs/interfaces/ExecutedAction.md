[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / ExecutedAction

# Interface: ExecutedAction

Represents the model returned by the Klaster Node API after an Action has been executed.
This interface provides detailed information about the execution status and parameters
of a user operation processed by Klaster.

 ExecutedAction

## Properties

### chainId

> **chainId**: `string`

The identifier of the blockchain network on which the userOp is executed.

#### Defined in

[types.ts:112](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L112)

***

### executionData

> **executionData**: `string`

The callData of the executed action, representing the actual operation performed.

#### Defined in

[types.ts:115](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L115)

***

### executionStatus

> **executionStatus**: `"SUCCESS"` \| `"PENDING"` \| `"FAILED"`

The current status of the UserOp execution:
  - "SUCCESS": The operation was successfully executed.
  - "FAILED": The operation failed during execution.
  - "PENDING": The Klaster node is waiting for conditions to be met before execution.
    This status is part of the Klaster spec and is particularly relevant for multichain actions
    where execution conditions on the destination chain may depend on prior token bridging.

#### Defined in

[types.ts:114](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L114)

***

### lowerBoundTimestap

> **lowerBoundTimestap**: `string`

The earliest timestamp at which the userOp will be executed on the target blockchain.

#### Defined in

[types.ts:110](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L110)

***

### maxGasLimit

> **maxGasLimit**: `string`

The maximum gas limit allowed for the execution of this userOp.

#### Defined in

[types.ts:113](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L113)

***

### upperBoundTimestamp

> **upperBoundTimestamp**: `string`

The latest timestamp by which the userOp will be executed on the target blockchain.

#### Defined in

[types.ts:111](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L111)

***

### userOp

> **userOp**: [`ERC4337UserOp`](ERC4337UserOp.md)

The full ERC-4337 UserOperation object that was executed.

#### Defined in

[types.ts:108](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L108)

***

### userOpHash

> **userOpHash**: `string`

The hash of the userOp, serving as a unique identifier for the operation.

#### Defined in

[types.ts:109](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L109)
