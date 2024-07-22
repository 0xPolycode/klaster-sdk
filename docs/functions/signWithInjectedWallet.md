[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / signWithInjectedWallet

# Function: signWithInjectedWallet()

> **signWithInjectedWallet**(`address`, `message`): `Promise`\<`string`\>

Signs a message using the injected Ethereum provider (e.g., MetaMask) in the browser.

This function uses the `personal_sign` method to create a signature with the user's
Ethereum account. It requires a web3-enabled browser with an injected Ethereum provider.

## Parameters

• **address**: \`0x$\{string\}\`

The Ethereum address to sign the message with. This should
                           be an address that the user controls in their injected wallet.

• **message**: `string`

The message to be signed. This will be converted to UTF-8
                          and prefixed with "\x19Ethereum Signed Message:\n" before signing.

## Returns

`Promise`\<`string`\>

A promise that resolves to the signature string.
                           The signature is in hexadecimal format.

## Throws

Throws an error if the injected Ethereum provider is not available,
                if the user rejects the signature request, or if there's any other
                issue during the signing process.

## Example

```ts
try {
  const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  const message = 'Hello, Ethereum!';
  const signature = await signWithInjectedWallet(address, message);
  console.log('Signature:', signature);
} catch (error) {
  console.error('Error signing message:', error);
}
```

## Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

## Defined in

[utils/utils.service.ts:86](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/utils.service.ts#L86)
