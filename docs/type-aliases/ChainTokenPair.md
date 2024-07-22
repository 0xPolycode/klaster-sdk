[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / ChainTokenPair

# Type Alias: ChainTokenPair

> **ChainTokenPair**: \`$\{ChainConstrainer\}-$\{TokenConstrainer\}\`

Represents a valid combination of a chain name and a token symbol for gas fee payments.

This type ensures type safety when specifying chain-token pairs for gas fee payments in the Klaster SDK.
It combines a ChainConstrainer and a TokenConstrainer with a hyphen separator.

## Example

```ts
const validGasPaymentPair: ChainTokenPair = 'ethereum-usdc';
// const invalidGasPaymentPair: ChainTokenPair = 'ethereum-btc'; // This would cause a TypeScript error
```

## Remarks

- This type is specifically used to validate payment tokens for covering gas fees in the Klaster ecosystem.
- Not all combinations of chains and tokens may be valid or supported for gas fee payments.
- The availability of specific tokens for gas fee payments may vary by chain.
- Refer to the Klaster documentation for the most up-to-date list of supported chain-token pairs for gas payments.

## Defined in

[utils/token-resolver.service.ts:101](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/token-resolver.service.ts#L101)
