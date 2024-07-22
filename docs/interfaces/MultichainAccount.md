[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / MultichainAccount

# Interface: MultichainAccount

Represents a Klaster Multichain Smart Contract account model.
This interface defines the essential properties of a smart contract account
that can operate across multiple blockchain networks.

 MultichainAccount

## Properties

### address

> **address**: \`0x$\{string\}\`

The unique address of the multichain smart contract account.
  This address is (mostly) consistent across all supported blockchain networks, allowing
  for unified identity and seamless cross-chain operations. Some exceptions to the generated
  address being consistent are blockchains in the zkSync ecosystem & any other ecosystem where
  the CREATE2 opcode doesn't behave the same way as on Ethereum mainnet.

#### Defined in

[types.ts:258](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L258)

***

### salt

> **salt**: `string`

A unique value used in the account creation process.
  The salt, combined with other parameters (such as the owner's address),
  ensures that the account address is unique and deterministically generated
  across all supported chains.

#### Defined in

[types.ts:259](https://github.com/0xPolycode/klaster-sdk/blob/22818a55dcbe1c33192fea1bbe40e4f250ddf045/src/types.ts#L259)
