[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / initKlaster

# Function: initKlaster()

> **initKlaster**(`config`): [`KlasterSDK`](../classes/KlasterSDK.md)

Initializes the Klaster SDK with the provided configuration.

This function serves as the entry point for using the Klaster SDK. It creates and
returns a new instance of the KlasterSDK class, configured with the provided options.

## Parameters

• **config**: [`Config`](../type-aliases/Config.md)

The configuration options for the Klaster SDK.

## Returns

[`KlasterSDK`](../classes/KlasterSDK.md)

A new instance of the KlasterSDK, ready for use.

## Example

```ts
import { initKlaster, Config } from 'klaster-sdk';

const config: Config = {
  nodeUrl: 'https://klaster-node.example.com',
  masterAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
};

const klasterSDK = initKlaster(config);

// Now you can use klasterSDK to interact with the Klaster ecosystem
```

## Throws

Throws an error if the provided configuration is invalid or if
  the SDK fails to initialize for any reason.

## Defined in

[index.ts:64](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/index.ts#L64)
