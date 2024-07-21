[**klaster-sdk**](../../README.md) • **Docs**

***

[klaster-sdk](../../README.md) / [types](../README.md) / ExecuteResponse

# Interface: ExecuteResponse

Represents the response model returned by the /execute route of the Klaster Node API.
This interface encapsulates the result of initiating the execution of an interchain transaction.

 ExecuteResponse

## Properties

### iTxHash

> **iTxHash**: `string`

The hash of the Klaster Interchain Transaction (iTx) that has been
submitted for execution. This hash serves as a unique identifier for the interchain transaction
and can be used to track or reference the transaction's status and outcome across multiple chains.

#### Defined in

[types.ts:154](https://github.com/0xPolycode/klaster-sdk/blob/df98c9e368e7c318a0e9124db84ae28b572c7361/src/types.ts#L154)
