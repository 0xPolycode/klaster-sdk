[**klaster-sdk**](../README.md) • **Docs**

***

[klaster-sdk](../README.md) / utils/salt.service

# utils/salt.service

## Classes

### SaltUtil

Utility class for generating salt values used in KlasterSDK functions.

Salt values are crucial for deriving unique smart contract accounts within the Klaster ecosystem.
This class provides methods to generate salts for different account scenarios.

#### Constructors

##### new SaltUtil()

> **new SaltUtil**(): [`SaltUtil`](salt.md#saltutil)

###### Returns

[`SaltUtil`](salt.md#saltutil)

#### Methods

##### accountAt()

> `static` **accountAt**(`i`): `string`

Generates a salt for an account at a specific index.

This method allows for deterministic generation of salts for multiple accounts.

###### Parameters

• **i**: `number`

The index of the account, starting from 0.

###### Returns

`string`

A salt value corresponding to the given index.

###### Example

```ts
const thirdAccountSalt = SaltUtil.accountAt(2);
console.log(thirdAccountSalt); // Outputs: "2"
```

###### Defined in

[utils/salt.service.ts:33](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/salt.service.ts#L33)

##### customAccount()

> `static` **customAccount**(`salt`): `string`

Allows for the use of a custom salt value.

This method provides flexibility for users who want to use their own salt values.

###### Parameters

• **salt**: `string`

A custom salt value.

###### Returns

`string`

The provided custom salt value.

###### Example

```ts
const customSalt = SaltUtil.customAccount("mySuperUniqueValue");
console.log(customSalt); // Outputs: "mySuperUniqueValue"
```

###### Remarks

When using custom salts, ensure they are unique to avoid account collisions.
Custom salts should be securely generated and managed to maintain account security.

###### Defined in

[utils/salt.service.ts:53](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/salt.service.ts#L53)

##### firstAccount()

> `static` **firstAccount**(): `string`

Generates a salt for the first (default) account.

###### Returns

`string`

A salt value of "0", representing the first account.

###### Example

```ts
const firstAccountSalt = SaltUtil.firstAccount();
console.log(firstAccountSalt); // Outputs: "0"
```

###### Defined in

[utils/salt.service.ts:17](https://github.com/0xPolycode/klaster-sdk/blob/5406a8bdd723a327f172c831aef2b71ee66cc88b/src/utils/salt.service.ts#L17)
