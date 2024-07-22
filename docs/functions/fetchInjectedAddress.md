[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / fetchInjectedAddress

# Function: fetchInjectedAddress()

> **fetchInjectedAddress**(): `Promise`\<`Address` \| `undefined`\>

Fetches the primary Ethereum address from an injected web3 wallet provider (e.g., MetaMask).

This function creates a wallet client using the viem library and the injected Ethereum provider.
It then retrieves the list of addresses associated with the wallet and returns the first address.

## Returns

`Promise`\<`Address` \| `undefined`\>

A promise that resolves to:
  - The primary Ethereum address (type Address) if available.
  - undefined if no addresses are associated with the wallet or if the wallet is locked.

## Async

## Function

fetchInjectedAddress

## Throws

Throws an error if:
  - No injected Ethereum provider is detected (i.e., window.ethereum is undefined).
  - The user denies permission to access their accounts.
  - There's an issue connecting to the Ethereum network.

## Example

```ts
try {
  const address = await fetchInjectedAddress();
  if (address) {
    console.log('Connected wallet address:', address);
  } else {
    console.log('No wallet address found or wallet is locked');
  }
} catch (error) {
  console.error('Error fetching wallet address:', error);
}
```

## Requires

viem

## See

[Wallet Client Documentation](https://viem.sh/docs/clients/wallet.html|Viem)

## Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

## Defined in

[utils/utils.service.ts:47](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/utils.service.ts#L47)
