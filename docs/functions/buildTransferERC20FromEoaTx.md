[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / buildTransferERC20FromEoaTx

# Function: buildTransferERC20FromEoaTx()

> **buildTransferERC20FromEoaTx**(`params`): [`RawTransaction`](../interfaces/RawTransaction.md)

Builds a transaction to transfer ERC20 tokens from an Externally Owned Account (EOA)
to another account, typically a smart contract account.

This function constructs a RawTransaction object that, when executed, will transfer
the specified amount of ERC20 tokens from the sending EOA to the recipient address.
It's commonly used to fund smart contract accounts with tokens.

## Parameters

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

## Returns

[`RawTransaction`](../interfaces/RawTransaction.md)

A RawTransaction object ready to be signed and broadcasted.
  The object includes:
  - to: The address of the ERC20 token contract.
  - value: Always 0n for ERC20 transfers.
  - data: The encoded function call data for the ERC20 'transfer' function.
  - gasLimit: A predefined gas limit set to 55000 (adjust if necessary for different tokens or networks).

## Example

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

## Defined in

[utils/utils.service.ts:127](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/utils/utils.service.ts#L127)
