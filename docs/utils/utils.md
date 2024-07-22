[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / utils/utils.service

# utils/utils.service

## Functions

### buildTransferERC20FromEoaTx()

> **buildTransferERC20FromEoaTx**(`params`): [`RawTransaction`](../types.md#rawtransaction)

Builds a transaction to transfer ERC20 tokens from an Externally Owned Account (EOA)
to another account, typically a smart contract account.

This function constructs a RawTransaction object that, when executed, will transfer
the specified amount of ERC20 tokens from the sending EOA to the recipient address.
It's commonly used to fund smart contract accounts with tokens.

#### Parameters

• **params**

The parameters for building the transaction.

• **params.amount**: `bigint`

The amount of tokens to transfer, in the token's smallest unit (e.g., wei for ETH-like tokens).

• **params.chainId**: `number`

The ID of the blockchain network where the transaction will be executed.

• **params.recipient**: \`0x$\{string\}\`

The address of the account receiving the tokens.

• **params.token**: \`0x$\{string\}\`

The address of the ERC20 token contract.

#### Returns

[`RawTransaction`](../types.md#rawtransaction)

A RawTransaction object ready to be signed and broadcasted.
  The object includes:
  - to: The address of the ERC20 token contract.
  - value: Always 0n for ERC20 transfers.
  - data: The encoded function call data for the ERC20 'transfer' function.
  - gasLimit: A predefined gas limit set to 55000 (adjust if necessary for different tokens or networks).

#### Example

```ts
const txParams = {
  recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  amount: BigInt(1000000), // 1 USDC if USDC has 6 decimals
  chainId: 1,
  token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC on Ethereum mainnet
};
const rawTx = buildTransferERC20FromEoaTx(txParams);
// rawTx can now be signed and sent to the network
```

#### Defined in

[utils/utils.service.ts:127](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/utils.service.ts#L127)

***

### fetchInjectedAddress()

> **fetchInjectedAddress**(): `Promise`\<`Address` \| `undefined`\>

Fetches the primary Ethereum address from an injected web3 wallet provider (e.g., MetaMask).

This function creates a wallet client using the viem library and the injected Ethereum provider.
It then retrieves the list of addresses associated with the wallet and returns the first address.

#### Returns

`Promise`\<`Address` \| `undefined`\>

A promise that resolves to:
  - The primary Ethereum address (type Address) if available.
  - undefined if no addresses are associated with the wallet or if the wallet is locked.

#### Async

#### Function

fetchInjectedAddress

#### Throws

Throws an error if:
  - No injected Ethereum provider is detected (i.e., window.ethereum is undefined).
  - The user denies permission to access their accounts.
  - There's an issue connecting to the Ethereum network.

#### Example

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

#### Requires

viem

#### See

[Wallet Client Documentation](https://viem.sh/docs/clients/wallet.html|Viem)

#### Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

#### Defined in

[utils/utils.service.ts:47](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/utils.service.ts#L47)

***

### signWithInjectedWallet()

> **signWithInjectedWallet**(`address`, `message`): `Promise`\<`string`\>

Signs a message using the injected Ethereum provider (e.g., MetaMask) in the browser.

This function uses the `personal_sign` method to create a signature with the user's
Ethereum account. It requires a web3-enabled browser with an injected Ethereum provider.

#### Parameters

• **address**: \`0x$\{string\}\`

The Ethereum address to sign the message with. This should
                           be an address that the user controls in their injected wallet.

• **message**: `string`

The message to be signed. This will be converted to UTF-8
                          and prefixed with "\x19Ethereum Signed Message:\n" before signing.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature string.
                           The signature is in hexadecimal format.

#### Throws

Throws an error if the injected Ethereum provider is not available,
                if the user rejects the signature request, or if there's any other
                issue during the signing process.

#### Example

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

#### Note

This function is designed to work in a browser environment and requires
      a web3-enabled browser with an injected Ethereum provider (like MetaMask).
      It will not work in a Node.js environment or browsers without an Ethereum wallet.

#### Defined in

[utils/utils.service.ts:86](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/utils.service.ts#L86)
