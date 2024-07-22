declare module "generated" {
    export const smartAccountAbi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "anEntryPoint";
            readonly internalType: "contract IEntryPoint";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "AlreadyInitialized";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "BaseImplementationCannotBeZero";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotAnEntryPoint";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotEntryPoint";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotEntryPointOrOwner";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotEntryPointOrSelf";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotOwner";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "CallerIsNotSelf";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "DelegateCallsOnly";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "EntryPointCannotBeZero";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "HandlerCannotBeZero";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "implementationAddress";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "InvalidImplementation";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "MixedAuthFail";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "ModuleAlreadyEnabled";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "expectedModule";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "returnedModule";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "prevModule";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "ModuleAndPrevModuleMismatch";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "ModuleCannotBeZeroOrSentinel";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "ModuleNotEnabled";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "ModulesAlreadyInitialized";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "ModulesSetupExecutionFailed";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "OwnerCanNotBeSelf";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "OwnerCannotBeZero";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "OwnerProvidedIsSame";
    }, {
        readonly type: "error";
        readonly inputs: readonly [];
        readonly name: "TransferToZeroAddressAttempt";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "destLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "valueLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "funcLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "operationLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "WrongBatchProvided";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "contractSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "WrongContractSignature";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "uintS";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "contractSignatureLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signatureLength";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "WrongContractSignatureFormat";
    }, {
        readonly type: "error";
        readonly inputs: readonly [{
            readonly name: "moduleAddressProvided";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "WrongValidationModule";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "previousHandler";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "handler";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }];
        readonly name: "ChangedFallbackHandler";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: false;
        }];
        readonly name: "DisabledModule";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: false;
        }];
        readonly name: "EnabledModule";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: true;
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
            readonly indexed: true;
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
            readonly indexed: false;
        }, {
            readonly name: "txGas";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: false;
        }];
        readonly name: "ExecutionFailure";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }];
        readonly name: "ExecutionFromModuleFailure";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }];
        readonly name: "ExecutionFromModuleSuccess";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: true;
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
            readonly indexed: true;
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
            readonly indexed: false;
        }, {
            readonly name: "txGas";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: false;
        }];
        readonly name: "ExecutionSuccess";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "oldImplementation";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "newImplementation";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }];
        readonly name: "ImplementationUpdated";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: false;
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: false;
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: false;
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
            readonly indexed: false;
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
            readonly indexed: false;
        }];
        readonly name: "ModuleTransaction";
    }, {
        readonly type: "event";
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly name: "sender";
            readonly internalType: "address";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
            readonly indexed: true;
        }];
        readonly name: "SmartAccountReceivedNativeToken";
    }, {
        readonly type: "fallback";
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "VERSION";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "string";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "addDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "prevModule";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "disableModule";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "enableModule";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "entryPoint";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "contract IEntryPoint";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address[]";
            readonly type: "address[]";
        }, {
            readonly name: "value";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "data";
            readonly internalType: "bytes[]";
            readonly type: "bytes[]";
        }, {
            readonly name: "operations";
            readonly internalType: "enum Enum.Operation[]";
            readonly type: "uint8[]";
        }];
        readonly name: "execBatchTransactionFromModule";
        readonly outputs: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
        }, {
            readonly name: "txGas";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "execTransactionFromModule";
        readonly outputs: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
        }];
        readonly name: "execTransactionFromModule";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "operation";
            readonly internalType: "enum Enum.Operation";
            readonly type: "uint8";
        }];
        readonly name: "execTransactionFromModuleReturnData";
        readonly outputs: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "dest";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "func";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "execute";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "dest";
            readonly internalType: "address[]";
            readonly type: "address[]";
        }, {
            readonly name: "value";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "func";
            readonly internalType: "bytes[]";
            readonly type: "bytes[]";
        }];
        readonly name: "executeBatch";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "dest";
            readonly internalType: "address[]";
            readonly type: "address[]";
        }, {
            readonly name: "value";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "func";
            readonly internalType: "bytes[]";
            readonly type: "bytes[]";
        }];
        readonly name: "executeBatch_y6U";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "dest";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "func";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "execute_ncC";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "getDeposit";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "getFallbackHandler";
        readonly outputs: readonly [{
            readonly name: "_handler";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "getImplementation";
        readonly outputs: readonly [{
            readonly name: "_implementation";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "start";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "pageSize";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "getModulesPaginated";
        readonly outputs: readonly [{
            readonly name: "array";
            readonly internalType: "address[]";
            readonly type: "address[]";
        }, {
            readonly name: "next";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "handler";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "moduleSetupContract";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "moduleSetupData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "init";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "isModuleEnabled";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "dataHash";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "signature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "isValidSignature";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "bytes4";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "_key";
            readonly internalType: "uint192";
            readonly type: "uint192";
        }];
        readonly name: "nonce";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "noncesDeprecated";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [];
        readonly name: "ownerDeprecated";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "handler";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "setFallbackHandler";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "setupContract";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "setupData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
        readonly name: "setupAndEnableModule";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "_interfaceId";
            readonly internalType: "bytes4";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly name: "";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "_implementation";
            readonly internalType: "address";
            readonly type: "address";
        }];
        readonly name: "updateImplementation";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "userOp";
            readonly internalType: "struct UserOperation";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "sender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "nonce";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "initCode";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }, {
                readonly name: "callData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }, {
                readonly name: "callGasLimit";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "verificationGasLimit";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "preVerificationGas";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "maxFeePerGas";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "maxPriorityFeePerGas";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "paymasterAndData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }, {
                readonly name: "signature";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "userOpHash";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "missingAccountFunds";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "validateUserOp";
        readonly outputs: readonly [{
            readonly name: "validationData";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly inputs: readonly [{
            readonly name: "withdrawAddress";
            readonly internalType: "address payable";
            readonly type: "address";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly name: "withdrawDepositTo";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }, {
        readonly type: "receive";
        readonly stateMutability: "payable";
    }];
}
declare module "types" {
    import { Address } from "viem";
    /**
     * Represents the user operation format expected as input by the Klaster Node API.
     * This interface defines the structure for ERC-4337 compliant user operations
     * specifically tailored for Klaster Multichain Smart Accounts.
     *
     * @interface ApiUserOp
     * @property {Address} masterWallet - The address of the Externally Owned Account (EOA) from which
     * the Klaster Multichain Smart Account is derived.
     * @property {string} salt - A unique value used in conjunction with the masterWallet address
     * to calculate the Klaster Multichain Smart Account address. This ensures unique account
     * addresses for the same EOA.
     * @property {string} callData - The encoded function call data to be executed on the blockchain.
     * This represents the actual operation the user wants to perform.
     * @property {string} callGasLimit - The maximum amount of gas that can be used for the execution
     * of the callData on the target blockchain. This is part of the ERC-4337 specification for
     * account abstraction.
     * @property {number} chainId - The ID of the blockchain network where the UserOp is to be executed.
     * This determines which network the operation will be sent to.
     */
    export interface ApiUserOp {
        masterWallet: Address;
        salt: string;
        callData: string;
        callGasLimit: string;
        chainId: number;
    }
    /**
     * Represents the payment data structure for gas costs and transaction fees in the Klaster API.
     * This interface defines the necessary information for processing payments related to
     * user operations on the Klaster network.
     *
     * @interface ApiPaymentData
     * @property {Address} masterWallet - The address of the Externally Owned Account (EOA) from which
     * the Klaster Multichain Smart Account is derived.
     * @property {string} salt - A unique value used in conjunction with the masterWallet address
     * to calculate the Klaster Multichain Smart Account address. This ensures unique account
     * addresses for the same EOA.
     * @property {string} token - The address of the ERC20 token that will be used to pay for
     * the gas cost and transaction fees associated with the user operation.
     * @property {number} chainId - The ID of the blockchain network on which the payment for
     * the gas cost and transaction fees will be processed. This determines the specific
     * blockchain where the payment transaction will occur.
     */
    export interface ApiPaymentData {
        masterWallet: Address;
        salt: string;
        token: string;
        chainId: number;
    }
    /**
     * Represents the full ERC-4337 UserOperation standard object format.
     * This interface defines the structure of a user operation as specified in the ERC-4337 standard
     * for account abstraction in Ethereum.
     *
     * @interface ERC4337UserOp
     * @property {Address} sender - The address of the smart contract account that will make the transaction.
     * @property {string} nonce - A unique identifier to prevent replay attacks, typically managed by the account itself.
     * @property {string} initCode - The initialization code for the account if it hasn't been deployed yet. Empty string if the account is already deployed.
     * @property {string} callData - The data to be passed to the sender during the main execution call.
     * @property {string} callGasLimit - The gas limit for the main execution call.
     * @property {string} verificationGasLimit - The gas limit for the verification step.
     * @property {string} preVerificationGas - The amount of gas to compensate the bundler for pre-verification execution and calldata.
     * @property {string} maxFeePerGas - The maximum total fee per gas the sender is willing to pay (including the priority fee).
     * @property {string} maxPriorityFeePerGas - The maximum priority fee per gas the sender is willing to pay.
     * @property {string} paymasterAndData - The address of the paymaster sponsoring the transaction, followed by extra data to send to the paymaster. Empty string if there's no paymaster.
     * @property {string} signature - The signature over the entire UserOperation, to be validated during verification.
     */
    export interface ERC4337UserOp {
        sender: Address;
        nonce: string;
        initCode: string;
        callData: string;
        callGasLimit: string;
        verificationGasLimit: string;
        preVerificationGas: string;
        maxFeePerGas: string;
        maxPriorityFeePerGas: string;
        paymasterAndData: string;
        signature: string;
    }
    /**
     * Represents the model returned by the Klaster Node API after an Action has been executed.
     * This interface provides detailed information about the execution status and parameters
     * of a user operation processed by Klaster.
     *
     * @interface ExecutedAction
     * @property {ERC4337UserOp} userOp - The full ERC-4337 UserOperation object that was executed.
     * @property {string} userOpHash - The hash of the userOp, serving as a unique identifier for the operation.
     * @property {string} lowerBoundTimestap - The earliest timestamp at which the userOp will be executed on the target blockchain.
     * @property {string} upperBoundTimestamp - The latest timestamp by which the userOp will be executed on the target blockchain.
     * @property {string} chainId - The identifier of the blockchain network on which the userOp is executed.
     * @property {string} maxGasLimit - The maximum gas limit allowed for the execution of this userOp.
     * @property {"SUCCESS" | "PENDING" | "FAILED"} executionStatus - The current status of the UserOp execution:
     *   - "SUCCESS": The operation was successfully executed.
     *   - "FAILED": The operation failed during execution.
     *   - "PENDING": The Klaster node is waiting for conditions to be met before execution.
     *     This status is part of the Klaster spec and is particularly relevant for multichain actions
     *     where execution conditions on the destination chain may depend on prior token bridging.
     * @property {string} executionData - The callData of the executed action, representing the actual operation performed.
     */
    export interface ExecutedAction {
        userOp: ERC4337UserOp;
        userOpHash: string;
        lowerBoundTimestap: string;
        upperBoundTimestamp: string;
        chainId: string;
        maxGasLimit: string;
        executionStatus: "SUCCESS" | "PENDING" | "FAILED";
        executionData: string;
    }
    /**
     * Represents the model returned by the Klaster Node API when a user requests a quote for an interchain transaction.
     * This interface provides detailed information about the quote, including the transaction hash,
     * node commitment, and the user operations to be executed across multiple chains.
     *
     * @interface QuoteResponse
     * @property {`0x${string}`} itxHash - The hash of the Klaster Interchain Transaction. This serves
     * as a unique identifier for the entire interchain operation.
     * @property {string} commitment - The cryptographic commitment generated by the Klaster node.
     * This commitment guarantees the execution of the quoted interchain transaction.
     * @property {Address} node - The address of the Klaster node that has returned the quote and
     * committed itself to executing the interchain transaction.
     * @property {ApiPaymentData} paymentInfo - Contains information about the payment for the
     * transaction, including the token to be used and the chain on which the payment will occur.
     * @property {ERC4337UserOp[]} userOps - An array of all UserOperations across all chains that
     * the node has committed to executing as part of this interchain transaction. Each UserOp
     * represents a specific action on a particular blockchain within the interchain transaction.
     */
    export interface QuoteResponse {
        itxHash: `0x${string}`;
        commitment: string;
        node: Address;
        paymentInfo: ApiPaymentData;
        userOps: ERC4337UserOp[];
    }
    /**
     * Represents the response model returned by the /execute route of the Klaster Node API.
     * This interface encapsulates the result of initiating the execution of an interchain transaction.
     *
     * @interface ExecuteResponse
     * @property {string} iTxHash - The hash of the Klaster Interchain Transaction (iTx) that has been
     * submitted for execution. This hash serves as a unique identifier for the interchain transaction
     * and can be used to track or reference the transaction's status and outcome across multiple chains.
     */
    export interface ExecuteResponse {
        iTxHash: string;
    }
    /**
     * Represents the response model returned by the /explorer route of the Klaster Node API.
     * This interface provides detailed information about the status and execution details of an interchain transaction.
     *
     * @interface ItxStatusResponse
     * @property {string} itxHash - The hash of the Klaster Interchain Transaction (iTx). Serves as a unique identifier
     * for the interchain transaction.
     * @property {Address} node - The address of the Klaster node that is responsible for executing the interchain transaction.
     * @property {string} commitment - The cryptographic commitment generated by the Klaster node, guaranteeing
     * the execution of the interchain transaction.
     * @property {Object} paymentInfo - Contains information about the payment for the transaction, including the token
     * used and the actual amount quoted for the execution.
     * @property {string} paymentInfo.masterWallet - The address of the Externally Owned Account (EOA) from which
     * the Klaster Multichain Smart Account is derived.
     * @property {string} paymentInfo.salt - A unique value used in conjunction with the masterWallet address
     * to calculate the Klaster Multichain Smart Account address.
     * @property {string} paymentInfo.token - The address of the ERC20 token used for paying gas costs and transaction fees.
     * @property {number} paymentInfo.chainId - The ID of the blockchain network on which the payment is processed.
     * @property {string} paymentInfo.tokenAmount - The actual amount of tokens quoted for the execution of the interchain transaction.
     * @property {string} paymentInfo.tokenValue - The value of the quoted token amount in US dollars.
     * @property {ExecutedAction[]} userOps - An array of ExecutedAction objects, each representing the status and
     * details of a user operation executed as part of this interchain transaction across different chains.
     */
    export interface ItxStatusResponse {
        itxHash: string;
        node: Address;
        commitment: string;
        paymentInfo: ApiPaymentData & {
            tokenAmount: string;
            tokenValue: string;
        };
        userOps: ExecutedAction[];
    }
    export interface InterchainTransaction {
        actions: ITxUserOp[];
        paymentInfo: ApiPaymentData;
    }
    /**
     * Represents the minimal UserOperation required for a fully described Klaster Interchain Transaction model.
     * This interface defines the structure for actions that can be performed on a single chain within
     * a Klaster Interchain Transaction.
     *
     * @interface ITxUserOp
     * @property {RawTransaction[]} txs - An array of raw transactions to be executed on the specified chain.
     *   - If this array contains a single transaction, the 'execute' function will be called on the smart contract account.
     *   - If this array contains multiple transactions, the 'batchExecute' function will be called on the smart contract account.
     * @property {number} chainId - The identifier of the blockchain network on which the transaction(s) will be executed.
     * @property {number} [upperBoundTime] - Optional. The latest timestamp by which the transaction(s) should be executed.
     * @property {number} [lowerBoundTime] - Optional. The earliest timestamp at which the transaction(s) can be executed.
     */
    export interface ITxUserOp {
        txs: RawTransaction[];
        chainId: number;
        upperBoundTime?: number;
        lowerBoundTime?: number;
    }
    /**
     * Represents a raw transaction as expected by the `execute` and `batchExecute` functions
     * of smart contract wallets compliant with the ERC-4337 standard.
     * This interface defines the structure for a single transaction to be executed
     * as part of a user operation in account abstraction.
     *
     * @interface RawTransaction
     * @property {Address} to - The recipient address of the transaction. This can be a contract
     *   address for contract interactions or an EOA for simple transfers.
     * @property {bigint} value - The amount of native currency (e.g., ETH) to be sent with the
     *   transaction, represented as a bigint. Use 0n for transactions that don't transfer value.
     * @property {string} data - The input data of the transaction, typically the encoded function
     *   call for contract interactions. For simple value transfers, this can be an empty string.
     * @property {bigint} gasLimit - The maximum amount of gas that can be used for executing
     *   this transaction, represented as a bigint. This helps prevent unexpectedly high gas costs.
     */
    export interface RawTransaction {
        to: Address;
        value: bigint;
        data: string;
        gasLimit: bigint;
    }
    /**
     * Represents a Klaster Multichain Smart Contract account model.
     * This interface defines the essential properties of a smart contract account
     * that can operate across multiple blockchain networks.
     *
     * @interface MultichainAccount
     * @property {Address} address - The unique address of the multichain smart contract account.
     *   This address is (mostly) consistent across all supported blockchain networks, allowing
     *   for unified identity and seamless cross-chain operations. Some exceptions to the generated
     *   address being consistent are blockchains in the zkSync ecosystem & any other ecosystem where
     *   the CREATE2 opcode doesn't behave the same way as on Ethereum mainnet.
     * @property {string} salt - A unique value used in the account creation process.
     *   The salt, combined with other parameters (such as the owner's address),
     *   ensures that the account address is unique and deterministically generated
     *   across all supported chains.
     */
    export interface MultichainAccount {
        address: Address;
        salt: string;
    }
    export interface SupportedPaymentTokenInfo {
        version: string;
        node: Address;
        supported_chains: {
            chainId: number;
            name: string;
        }[];
        supported_gas_tokens: {
            chainId: number;
            paymentTokens: {
                name: string;
                address: Address;
                symbol: string;
                decimals: number;
            }[];
        }[];
    }
}
declare module "utils/error.service" {
    import { ApiPaymentData } from "types";
    export function parseKlasterNodeError(e: any): string;
    export function parseExecuteError(e: any, payment: ApiPaymentData): string;
}
declare module "node.service" {
    import { Address } from "viem";
    import { ApiPaymentData, ApiUserOp, ExecuteResponse, ItxStatusResponse, QuoteResponse } from "types";
    import { AxiosInstance } from "axios";
    /**
     * Service class for interacting with a Klaster Node.
     *
     * This class provides methods to communicate with a Klaster Node, including
     * operations like getting quotes, executing transactions, retrieving wallet
     * addresses, and checking transaction statuses.
     */
    export class KlasterNodeService {
        private nodeUrl;
        client: AxiosInstance;
        /**
         * Creates an instance of KlasterNodeService.
         *
         * @param {string} nodeUrl - The URL of the Klaster Node to connect to.
         */
        constructor(nodeUrl: string);
        /**
         * Fetches a quote for user operations from the Klaster Node.
         *
         * @async
         * @param {ApiUserOp[]} userOps - An array of user operations to get a quote for.
         * @param {ApiPaymentData} paymentInfo - Payment information for the quote.
         * @returns {Promise<QuoteResponse>} A promise that resolves to the quote response.
         * @throws {Error} Throws an error if the request fails, with a parsed error message.
         */
        getQuote(userOps: ApiUserOp[], paymentInfo: ApiPaymentData): Promise<QuoteResponse>;
        /**
         * Executes a transaction on the Klaster Node based on a quote response and signed hash.
         *
         * @async
         * @param {QuoteResponse} quoteResponse - The quote response object.
         * @param {string} signedHash - The signed hash of the transaction.
         * @returns {Promise<ExecuteResponse>} A promise that resolves to the execution response.
         * @throws {Error} Throws an error if the execution fails, with a parsed error message.
         */
        executeTx(quoteResponse: QuoteResponse, signedHash: string): Promise<ExecuteResponse>;
        /**
        * Retrieves a wallet address for a given master wallet and salt. This uses ERC4337
        * account derivation to derive the address of the smart contract wallet.
        *
        * @async
        * @param {string} masterWallet - The address of the master wallet.
        * @param {string} salt - The salt value used for address derivation.
        * @returns {Promise<Address>} A promise that resolves to the derived wallet address.
        * @throws {Error} Throws an error if the retrieval fails, with a parsed error message.
        */
        getWallet(masterWallet: string, salt: string): Promise<Address>;
        /**
         * Fetches the status of an interchain transaction (iTx) by its hash.
         *
         * @async
         * @param {string} hash - The hash of the interchain transaction.
         * @returns {Promise<ItxStatusResponse>} A promise that resolves to the iTx status response.
         * @throws {Error} Throws an error if the status retrieval fails, with a parsed error message.
         */
        getItxStatus(hash: string): Promise<ItxStatusResponse>;
    }
}
declare module "utils/encoding.service" {
    import { Address } from "viem";
    import { ApiUserOp, RawTransaction } from "types";
    /**
     * A service for encoding user operations (UserOps) for Smart Contract Accounts in the Klaster ecosystem.
     *
     * This service provides methods to encode single and batch transactions into UserOps
     * that can be processed by the Klaster Node. It intelligently chooses between single
     * and batch encoding to optimize for gas efficiency and ensure atomic execution of
     * multiple transactions when needed.
     */
    export class EncodingService {
        /**
         * Encodes a single transaction into a UserOp for execution on a Smart Contract Account.
         *
         * This method prepares a UserOp that, when executed, will call the 'execute' function
         * on the Smart Contract Account derived from the provided masterWallet and salt.
         *
         * @param {RawTransaction} tx - The transaction to be encoded.
         * @param {number} chainId - The ID of the blockchain where the transaction will be executed.
         * @param {Address} masterWallet - The address of the master wallet from which the Smart Contract Account is derived.
         * @param {string} salt - A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.
         * @returns {ApiUserOp} A UserOp object that can be sent to the Klaster Node for quoting and execution.
         *
         * @example
         * const userOp = EncodingService.encodeUserOpCall(
         *   { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
         *   1,
         *   '0x...',
         *   'uniqueSalt'
         * );
         */
        static encodeUserOpCall(tx: RawTransaction, chainId: number, masterWallet: Address, salt: string): ApiUserOp;
        /**
         * Encodes multiple transactions into a single UserOp for batch execution on a Smart Contract Account.
         *
         * This method prepares a UserOp that, when executed, will call the 'executeBatch' function
         * on the Smart Contract Account, allowing multiple transactions to be executed atomically.
         * This can lead to significant gas savings compared to executing transactions individually.
         *
         * @param {RawTransaction[]} txs - An array of transactions to be encoded for batch execution.
         * @param {number} chainId - The ID of the blockchain where the transactions will be executed.
         * @param {Address} masterWallet - The address of the master wallet from which the Smart Contract Account is derived.
         * @param {string} salt - A unique value used in conjunction with the masterWallet to derive the Smart Contract Account address.
         * @returns {ApiUserOp} A UserOp object representing the batch execution, which can be sent to the Klaster Node for quoting and execution.
         *
         * @example
         * const userOp = EncodingService.encodeBatchCall(
         *   [
         *     { to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n },
         *     { to: '0x...', value: 2000n, data: '0x...', gasLimit: 50000n }
         *   ],
         *   1,
         *   '0x...',
         *   'uniqueSalt'
         * );
         */
        static encodeBatchCall(txs: RawTransaction[], chainId: number, masterWallet: Address, salt: string): ApiUserOp;
    }
}
declare module "utils/salt.service" {
    /**
     * Utility class for generating salt values used in KlasterSDK functions.
     *
     * Salt values are crucial for deriving unique smart contract accounts within the Klaster ecosystem.
     * This class provides methods to generate salts for different account scenarios.
     */
    export class SaltUtil {
        /**
         * Generates a salt for the first (default) account.
         *
         * @returns {string} A salt value of "0", representing the first account.
         *
         * @example
         * const firstAccountSalt = SaltUtil.firstAccount();
         * console.log(firstAccountSalt); // Outputs: "0"
         */
        static firstAccount(): string;
        /**
         * Generates a salt for an account at a specific index.
         *
         * This method allows for deterministic generation of salts for multiple accounts.
         *
         * @param {number} i - The index of the account, starting from 0.
         * @returns {string} A salt value corresponding to the given index.
         *
         * @example
         * const thirdAccountSalt = SaltUtil.accountAt(2);
         * console.log(thirdAccountSalt); // Outputs: "2"
         */
        static accountAt(i: number): string;
        /**
         * Allows for the use of a custom salt value.
         *
         * This method provides flexibility for users who want to use their own salt values.
         *
         * @param {string} salt - A custom salt value.
         * @returns {string} The provided custom salt value.
         *
         * @example
         * const customSalt = SaltUtil.customAccount("mySuperUniqueValue");
         * console.log(customSalt); // Outputs: "mySuperUniqueValue"
         *
         * @remarks
         * When using custom salts, ensure they are unique to avoid account collisions.
         * Custom salts should be securely generated and managed to maintain account security.
         */
        static customAccount(salt: string): string;
    }
}
declare module "utils/token-resolver.service" {
    /**
     * Represents the supported blockchain networks for gas fee payments in the Klaster ecosystem.
     *
     * This type ensures that only valid chain names are used when specifying
     * blockchain networks for gas fee payment operations within the Klaster SDK.
     *
     * @typedef {('ethereum' | 'optimism' | 'sepolia' | 'polygon' | 'arbitrum-one' |
    *            'arbitrum-sepolia' | 'avalanche-c-chain' | 'scroll' |
    *            'bnb-smart-chain' | 'base')} ChainConstrainer
    *
    * @example
    * const validGasPaymentChain: ChainConstrainer = 'ethereum';
    * // const invalidGasPaymentChain: ChainConstrainer = 'bitcoin'; // This would cause a TypeScript error
    */
    type ChainConstrainer = 'ethereum' | 'optimism' | 'sepolia' | 'polygon' | 'arbitrum-one' | 'arbitrum-sepolia' | 'avalanche-c-chain' | 'scroll' | 'bnb-smart-chain' | 'base';
    /**
     * Represents the supported token symbols for gas fee payments in the Klaster ecosystem.
     *
     * This type ensures that only valid token symbols are used when specifying
     * tokens for gas fee payment operations within the Klaster SDK.
     *
     * @typedef {('eth' | 'weth' | 'link' | 'usdc' | 'wsteth' | 'usdt' | 'matic' |
    *            'wmatic' | 'stmatic' | 'avax' | 'wavax' | 'bnb' | 'wbnb' |
    *            'axlusdc' | 'crusdc' | 'bsc-usd')} TokenConstrainer
    *
    * @example
    * const validGasPaymentToken: TokenConstrainer = 'usdc';
    * // const invalidGasPaymentToken: TokenConstrainer = 'dai'; // This would cause a TypeScript error
    */
    type TokenConstrainer = 'eth' | 'weth' | 'link' | 'usdc' | 'wsteth' | 'usdt' | 'matic' | 'wmatic' | 'stmatic' | 'avax' | 'wavax' | 'bnb' | 'wbnb' | 'axlusdc' | 'crusdc' | 'bsc-usd';
    /**
     * Represents a valid combination of a chain name and a token symbol for gas fee payments.
     *
     * This type ensures type safety when specifying chain-token pairs for gas fee payments in the Klaster SDK.
     * It combines a ChainConstrainer and a TokenConstrainer with a hyphen separator.
     *
     * @typedef {`${ChainConstrainer}-${TokenConstrainer}`} ChainTokenPair
     *
     * @example
     * const validGasPaymentPair: ChainTokenPair = 'ethereum-usdc';
     * // const invalidGasPaymentPair: ChainTokenPair = 'ethereum-btc'; // This would cause a TypeScript error
     *
     * @remarks
     * - This type is specifically used to validate payment tokens for covering gas fees in the Klaster ecosystem.
     * - Not all combinations of chains and tokens may be valid or supported for gas fee payments.
     * - The availability of specific tokens for gas fee payments may vary by chain.
     * - Refer to the Klaster documentation for the most up-to-date list of supported chain-token pairs for gas payments.
     */
    export type ChainTokenPair = `${ChainConstrainer}-${TokenConstrainer}`;
    /**
     * Retrieves the payment token address for a given chain-token pair.
     *
     * This function uses the ChainTokenService to look up the token address
     * based on the provided chain-token pair.
     *
     * @param {ChainTokenPair} chainTokenPair - A string representing the chain and token,
     *                                          in the format "chainName-tokenSymbol".
     *                                          For example: "ethereum-usdc" or "arbitrumOne-link".
     *
     * @returns {string | undefined} The address of the payment token if found,
     *                               or undefined if the token is not found for the given chain.
     *
     * @throws {Error} May throw an error if the ChainTokenService encounters issues
     *                 (e.g., network errors when fetching data).
     *
     * @example
     * const usdcAddress = getPaymentToken('ethereum-usdc');
     * console.log(usdcAddress); // '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
     *
     */
    export function getPaymentToken(chainTokenPair: ChainTokenPair): string | undefined;
}
declare module "utils/utils.service" {
    import { Address } from "viem";
    import { RawTransaction } from "types";
    /**
     * Fetches the primary Ethereum address from an injected web3 wallet provider (e.g., MetaMask).
     *
     * This function creates a wallet client using the viem library and the injected Ethereum provider.
     * It then retrieves the list of addresses associated with the wallet and returns the first address.
     *
     * @async
     * @function fetchInjectedAddress
     * @returns {Promise<Address | undefined>} A promise that resolves to:
     *   - The primary Ethereum address (type Address) if available.
     *   - undefined if no addresses are associated with the wallet or if the wallet is locked.
     *
     * @throws {Error} Throws an error if:
     *   - No injected Ethereum provider is detected (i.e., window.ethereum is undefined).
     *   - The user denies permission to access their accounts.
     *   - There's an issue connecting to the Ethereum network.
     *
     * @example
     * try {
     *   const address = await fetchInjectedAddress();
     *   if (address) {
     *     console.log('Connected wallet address:', address);
     *   } else {
     *     console.log('No wallet address found or wallet is locked');
     *   }
     * } catch (error) {
     *   console.error('Error fetching wallet address:', error);
     * }
     *
     * @requires viem
     * @see {@link https://viem.sh/docs/clients/wallet.html|Viem Wallet Client Documentation}
     *
     * @note This function is designed to work in a browser environment and requires
     *       a web3-enabled browser with an injected Ethereum provider (like MetaMask).
     *       It will not work in a Node.js environment or browsers without an Ethereum wallet.
     */
    export function fetchInjectedAddress(): Promise<Address | undefined>;
    /**
     * Signs a message using the injected Ethereum provider (e.g., MetaMask) in the browser.
     *
     * This function uses the `personal_sign` method to create a signature with the user's
     * Ethereum account. It requires a web3-enabled browser with an injected Ethereum provider.
     *
     * @param {Address} address - The Ethereum address to sign the message with. This should
     *                            be an address that the user controls in their injected wallet.
     * @param {string} message - The message to be signed. This will be converted to UTF-8
     *                           and prefixed with "\x19Ethereum Signed Message:\n" before signing.
     *
     * @returns {Promise<string>} A promise that resolves to the signature string.
     *                            The signature is in hexadecimal format.
     *
     * @throws {Error} Throws an error if the injected Ethereum provider is not available,
     *                 if the user rejects the signature request, or if there's any other
     *                 issue during the signing process.
     *
     * @example
     * try {
     *   const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
     *   const message = 'Hello, Ethereum!';
     *   const signature = await signWithInjectedWallet(address, message);
     *   console.log('Signature:', signature);
     * } catch (error) {
     *   console.error('Error signing message:', error);
     * }
     *
     * @note This function is designed to work in a browser environment and requires
     *       a web3-enabled browser with an injected Ethereum provider (like MetaMask).
     *       It will not work in a Node.js environment or browsers without an Ethereum wallet.
     */
    export function signWithInjectedWallet(address: Address, message: string): Promise<string>;
    /**
     * Builds a transaction to transfer ERC20 tokens from an Externally Owned Account (EOA)
     * to another account, typically a smart contract account.
     *
     * This function constructs a RawTransaction object that, when executed, will transfer
     * the specified amount of ERC20 tokens from the sending EOA to the recipient address.
     * It's commonly used to fund smart contract accounts with tokens.
     *
     * @param {Object} params - The parameters for building the transaction.
     * @param {Address} params.recipient - The address of the account receiving the tokens.
     * @param {bigint} params.amount - The amount of tokens to transfer, in the token's smallest unit (e.g., wei for ETH-like tokens).
     * @param {number} params.chainId - The ID of the blockchain network where the transaction will be executed.
     * @param {Address} params.token - The address of the ERC20 token contract.
     *
     * @returns {RawTransaction} A RawTransaction object ready to be signed and broadcasted.
     *   The object includes:
     *   - to: The address of the ERC20 token contract.
     *   - value: Always 0n for ERC20 transfers.
     *   - data: The encoded function call data for the ERC20 'transfer' function.
     *   - gasLimit: A predefined gas limit set to 55000 (adjust if necessary for different tokens or networks).
     *
     * @example
     * const txParams = {
     *   recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
     *   amount: BigInt(1000000), // 1 USDC if USDC has 6 decimals
     *   chainId: 1,
     *   token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC on Ethereum mainnet
     * };
     * const rawTx = buildTransferERC20FromEoaTx(txParams);
     * // rawTx can now be signed and sent to the network
     */
    export function buildTransferERC20FromEoaTx(params: {
        recipient: Address;
        amount: bigint;
        chainId: number;
        token: Address;
    }): RawTransaction;
}
declare module "utils/itx.service" {
    import { InterchainTransaction, RawTransaction } from "types";
    /**
     * A syntactic helper for creating InterchainTransaction objects in the Klaster SDK.
     *
     * This function returns its input unchanged. Its purpose is to provide a consistent
     * coding style when working with the Klaster SDK, allowing for a more fluent and
     * readable way of creating InterchainTransaction objects.
     *
     * @param {InterchainTransaction} itx - The InterchainTransaction object to be "encoded".
     * @returns {InterchainTransaction} The same InterchainTransaction object, unchanged.
     *
     * @example
     * // Instead of:
     * // const iTx: InterchainTransaction = { ... };
     * // Use:
     * const iTx = encodeItx({ ... });
     */
    export function encodeItx(itx: InterchainTransaction): InterchainTransaction;
    /**
     * A syntactic helper for creating action objects in the Klaster SDK.
     *
     * This function combines an array of RawTransactions with a chain ID into an object.
     * It's used to provide a consistent coding style when working with actions in the Klaster SDK.
     *
     * @param {RawTransaction[]} txs - An array of RawTransaction objects.
     * @param {number} chainId - The ID of the blockchain for this action.
     * @returns {{ txs: RawTransaction[], chainId: number }} An object containing the transactions and chain ID.
     *
     * @example
     * const action = encodeAction([{ ... }, { ... }], 1);
     */
    export function encodeAction(txs: RawTransaction[], chainId: number): {
        txs: RawTransaction[];
        chainId: number;
    };
    /**
     * A syntactic helper for working with RawTransaction objects in the Klaster SDK.
     *
     * This function returns its input unchanged. Its purpose is to provide a consistent
     * coding style when working with the Klaster SDK, allowing for a more fluent way
     * of handling RawTransaction objects.
     *
     * @param {RawTransaction} tx - The RawTransaction object to be "encoded".
     * @returns {RawTransaction} The same RawTransaction object, unchanged.
     *
     * @example
     * const tx = encodeTx({ ... });
     */
    export function encodeTx(tx: RawTransaction): RawTransaction;
}
declare module "index" {
    import { Address } from "viem";
    import { ApiPaymentData, ExecuteResponse, InterchainTransaction, MultichainAccount, QuoteResponse, RawTransaction } from "types";
    import { ChainTokenPair } from "utils/token-resolver.service";
    export * from "types";
    export * from "utils/encoding.service";
    export * from "utils/itx.service";
    export * from "utils/salt.service";
    export * from "utils/token-resolver.service";
    export * from "utils/utils.service";
    /**
     * Configuration options for initializing the Klaster SDK.
     *
     * @typedef {Object} Config
     * @property {string} nodeUrl - The URL of the Klaster Node to connect to.
     *   This should be a valid HTTP or HTTPS URL pointing to a running Klaster Node instance.
     * @property {Address} masterAddress - The Ethereum address of the master wallet.
     *   This address is used as the basis for deriving Smart Contract Account addresses
     *   and for signing transactions within the Klaster ecosystem.
     */
    export type Config = {
        nodeUrl: string;
        masterAddress: Address;
    };
    /**
     * Initializes the Klaster SDK with the provided configuration.
     *
     * This function serves as the entry point for using the Klaster SDK. It creates and
     * returns a new instance of the KlasterSDK class, configured with the provided options.
     *
     * @param {Config} config - The configuration options for the Klaster SDK.
     * @returns {KlasterSDK} A new instance of the KlasterSDK, ready for use.
     *
     * @example
     * import { initKlaster, Config } from 'klaster-sdk';
     *
     * const config: Config = {
     *   nodeUrl: 'https://klaster-node.example.com',
     *   masterAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
     * };
     *
     * const klasterSDK = initKlaster(config);
     *
     * // Now you can use klasterSDK to interact with the Klaster ecosystem
     *
     * @throws {Error} Throws an error if the provided configuration is invalid or if
     *   the SDK fails to initialize for any reason.
     */ export function initKlaster(config: Config): KlasterSDK;
    /**
     * KlasterSDK creates an instance of the SDK used to communicate with
     * the Klaster protocol. It offers typed information for all the types
     * used to communicate with the protocol, as well as utility functions
     * for encoding tokens, transactions and accounts.
     */
    export class KlasterSDK {
        private nodeService;
        activeAccountSalt: string;
        masterAddress: Address;
        constructor(config: Config);
        /**
         * Changes the master wallet address used for deriving ERC4337 multichain smart accounts.
         *
         * This function updates the `masterAddress` parameter of the SDK instance. The master address,
         * in combination with a salt value, is used to deterministically derive ERC4337 compliant
         * multichain smart contract accounts. Changing this address will result in deriving
         * different smart contract accounts for all subsequent operations.
         *
         * @param {Address} wallet - The new master wallet address to be used for account derivation.
         *                           This should be a valid Ethereum address.
         *
         * @throws {Error} May throw an error if the provided address is invalid.
         *
         * @example
         * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
         * klasterSDK.changeMasterAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
         *
         * @note Changing the master address will affect all future account derivations and operations.
         * It does not affect previously derived accounts or ongoing transactions. Ensure you understand
         * the implications of changing this address in the context of your application.
         *
         * @see For more information on ERC4337 and account abstraction, visit:
         * {@link https://eips.ethereum.org/EIPS/eip-4337|EIP-4337: Account Abstraction}
         */
        changeMasterAddress(wallet: Address): void;
        /**
         * Changes the salt value used for deriving ERC4337 multichain smart accounts.
         *
         * This function updates the `activeAccountSalt` parameter of the SDK instance. The salt,
         * in combination with the connected Externally Owned Account (EOA), is used to
         * deterministically derive ERC4337 compliant multichain smart contract accounts.
         * Changing this salt will result in deriving a different smart contract account
         * for all subsequent operations.
         *
         * @param {string} salt - The new salt value to be used for account derivation.
         *                        This should be a unique string that, when combined with
         *                        the EOA address, produces a unique smart account address.
         *
         *
         * @example
         * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
         * klasterSDK.changeAccountSalt('uniqueSaltValue123');
         *
         * @note Changing the account salt will affect all future account derivations and operations.
         * It does not affect previously derived accounts or ongoing transactions. Ensure you understand
         * the implications of changing this salt in the context of your application.
         *
         * @see For more information on ERC4337 and account abstraction, visit:
         * {@link https://eips.ethereum.org/EIPS/eip-4337|EIP-4337: Account Abstraction}
         */
        changeAccountSalt(salt: string): void;
        /**
         * Fetches the multichain ERC4337 account derived from the current masterWallet and salt.
         *
         * This asynchronous function retrieves the multichain smart contract account that is
         * deterministically derived using the `masterWallet` and `salt` parameters set during
         * SDK initialization or subsequently updated.
         *
         * The derived account is compliant with the ERC4337 standard for account abstraction
         * and can be used across multiple blockchain networks.
         *
         * @async
         * @returns {Promise<MultichainAccount>} A promise that resolves to a MultichainAccount object.
         *   The object contains:
         *   - salt: The current active account salt used for derivation.
         *   - address: The derived multichain smart contract account address.
         *
         * @throws {Error} May throw an error if there's an issue communicating with the node service
         *   or if the account derivation fails.
         *
         * @example
         * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
         * try {
         *   const account = await klasterSDK.getMultichainAccount();
         *   console.log('Derived account:', account.address);
         *   console.log('Used salt:', account.salt);
         * } catch (error) {
         *   console.error('Failed to fetch multichain account:', error);
         * }
         *
         * @note This function uses the current values of `masterWallet` and `salt`. If you need
         * to derive a different account, use `changeMasterAddress()` or `changeAccountSalt()`
         * before calling this function.
         *
         * @see {@link changeMasterAddress} - To change the master wallet address.
         * @see {@link changeAccountSalt} - To change the account salt.
         */
        getMultichainAccount(): Promise<MultichainAccount>;
        /**
         * A helper function that prepares an ApiPaymentData object for transaction fee payments.
         *
         * This asynchronous function simplifies the process of creating an ApiPaymentData object,
         * which is used to specify how transaction fees should be paid on the Klaster Protocol.
         * It combines information from the multichain account, the current SDK configuration,
         * and the specified payment token to create a complete payment data structure.
         *
         * @async
         * @param {ChainTokenPair} paymentToken - A string representing the chain and token to be used for payment,
         *                                        in the format "chainName-tokenSymbol" (e.g., "optimism-usdc").
         *
         * @returns {Promise<ApiPaymentData>} A promise that resolves to an ApiPaymentData object containing:
         *   - chainId: The chain ID where the payment will be processed
         *   - masterWallet: The address of the master wallet used in the SDK.
         *   - salt: The salt used for deriving the multichain account.
         *   - token: The address of the token to be used for payment.
         *
         * @throws {Error} May throw an error if:
         *   - There's an issue retrieving the multichain account.
         *   - The specified payment token is not found or invalid.
         *   - Any other unexpected error occurs during the process.
         *
         * @example
         * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
         * try {
         *   const paymentData = await klasterSDK.encodeTxFee('optimism-usdc');
         *   console.log('Payment data:', paymentData);
         * } catch (error) {
         *   console.error('Failed to encode transaction fee:', error);
         * }
         *
         * @note This function uses the current state of the SDK, including the master wallet address.
         * Make sure these are set correctly before calling this function.
         *
         * @see {@link getMultichainAccount} - Used internally to fetch the current multichain account.
         * @see {@link getPaymentToken} - Used internally to resolve the token address from the ChainTokenPair.
         */
        encodeTxFee(paymentToken: ChainTokenPair): Promise<ApiPaymentData>;
        /**
         * Fetches a quote for the interchain transaction (iTx).
         *
         * This asynchronous function processes an InterchainTransaction object to obtain a quote
         * from the Klaster Node. The quote contains the full iTx information as well as the
         * required payment information for executing the transaction.
         *
         * @async
         * @param {InterchainTransaction} itx - The full Interchain Transaction object. This object
         *        should contain an array of actions and payment information.
         *
         * @returns {Promise<QuoteResponse>} A promise that resolves to a QuoteResponse object
         *          containing the full iTx information and required payment details.
         *
         * @throws {Error} Throws an error if the actions array in the iTx is empty.
         * @throws {Error} May throw errors from the EncodingService or the node service if there
         *                 are issues encoding the actions or fetching the quote.
         *
         * @example
         * const itx = {
         *   actions: [
         *     {
         *       txs: [{ to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n }],
         *       chainId: 1
         *     }
         *   ],
         *   paymentInfo: { ... } // ApiPaymentData object
         * };
         *
         * try {
         *   const quote = await klasterSDK.getQuote(itx);
         *   console.log('Received quote:', quote);
         * } catch (error) {
         *   console.error('Failed to get quote:', error);
         * }
         *
         * @note This function uses the current values of `masterAddress` and `activeAccountSalt`
         *       from the SDK instance for encoding user operations.
         *
         * @see {@link EncodingService.encodeUserOpCall} - Used for encoding single transaction actions.
         * @see {@link EncodingService.encodeBatchCall} - Used for encoding multi-transaction actions.
         */
        getQuote(itx: InterchainTransaction): Promise<QuoteResponse>;
        /**
         * Executes the Interchain Transaction (iTx) based on a quote response and signed hash.
         *
         * This function triggers the execution of an iTx on the Klaster network. Once called
         * with a valid signed hash, the execution becomes irreversible.
         *
         * @async
         * @param {QuoteResponse} response - The response object returned from calling the `quote`
         *                                   endpoint. This contains necessary information for execution.
         * @param {string} signedHash - The iTx hash, signed by the wallet using the personalSign method.
         *
         * @returns {Promise<ExecuteResponse>} A promise that resolves to an ExecuteResponse object
         *                                     containing the iTx hash of the executed transaction.
         *
         * @throws {Error} May throw an error if the execution fails, if the signed hash is invalid,
         *                 or if there are network issues.
         *
         * @remarks
         * IMPORTANT: The hash must be signed using the personalSign method.
         * If you encounter an "invalid merkle hash" error, ensure you're using the correct
         * signing method. Some libraries may default to a different signing scheme.
         *
         * @example
         * try {
         *   const quoteResponse = await klasterSDK.getQuote(...);
         *   const signedHash = await wallet.personalSign(quoteResponse.hash);
         *   const executeResponse = await klasterSDK.execute(quoteResponse, signedHash);
         *   console.log('Execution successful. iTx hash:', executeResponse.iTxHash);
         * } catch (error) {
         *   console.error('Execution failed:', error);
         * }
         *
         * @see {@link getQuote} - Used to obtain the necessary QuoteResponse.
         * @see {@link https://eips.ethereum.org/EIPS/eip-191} - EIP-191 for signed data standard.
         */
        execute(response: QuoteResponse, signedHash: string): Promise<ExecuteResponse>;
        /**
         * Automatically fetches a quote and executes the Interchain Transaction (iTx).
         *
         * This function streamlines the process of executing an iTx by combining the quote
         * fetching and execution steps. It automatically handles the flow of getting a quote,
         * signing the iTx hash, and executing the transaction.
         *
         * @async
         * @param {InterchainTransaction} itx - The interchain transaction object containing
         *        the transactions you wish to execute. This should include all necessary
         *        information for the iTx, such as actions and payment details.
         * @param {Function} signHash - A function to sign the iTx hash with a private key.
         *        This function should take a hash string (prefixed with '0x') and return
         *        a Promise resolving to the signed hash string.
         *
         * @returns {Promise<ExecuteResponse>} A promise that resolves to an ExecuteResponse object,
         *          containing the iTx hash of the executed transaction.
         *
         * @throws {Error} May throw errors during the quote fetching, signing, or execution phases.
         *                 These could include network errors, signing failures, or execution issues.
         *
         * @example
         * const itx = {
         *   actions: [...],  // Array of actions to be executed
         *   paymentInfo: ... // Payment information
         * };
         *
         * const signHash = async (hash) => {
         *   // Implement your signing logic here
         *   return signedHash;
         * };
         *
         * try {
         *   const result = await klasterSDK.autoExecute(itx, signHash);
         *   console.log('iTx executed successfully. Hash:', result.iTxHash);
         * } catch (error) {
         *   console.error('AutoExecute failed:', error);
         * }
         *
         * @remarks
         * - The signHash function must return a properly signed hash. Ensure you're using
         *   the correct signing method (e.g., personalSign) to avoid execution errors.
         * - This function abstracts away the separate steps of quoting and executing,
         *   making it more convenient for straightforward iTx executions.
         *
         * @see {@link getQuote} - Used internally to fetch the quote.
         * @see {@link execute} - Used internally to execute the transaction.
         */
        autoExecute(itx: InterchainTransaction, signHash: (hash: `0x${string}`) => Promise<string>): Promise<ExecuteResponse>;
        /**
         * Transfers ERC20 tokens to the multichain smart contract account and
         * executes the desired actions across multiple blockchains.
         *
         * This function performs two main operations:
         * 1. Transfers ERC20 tokens to the smart contract account.
         * 2. Executes an interchain transaction (iTx) after the transfer is confirmed.
         *
         * @async
         * @param {Object} params - The parameters object containing transfer and execution instructions.
         * @param {Object} params.transferToSmartAccount - Instructions for transferring ERC20 tokens to the smart account.
         * @param {Address} params.transferToSmartAccount.tokenToTransfer - The address of the ERC20 token to transfer.
         * @param {bigint} params.transferToSmartAccount.amountToTransfer - The amount of tokens to transfer.
         * @param {number} params.transferToSmartAccount.chainId - The ID of the blockchain where the transfer will occur.
         * @param {Function} params.transferToSmartAccount.executeTxAction - A function to execute the transfer transaction.
         *        It should take a RawTransaction object and return a Promise that resolves when the transaction is accepted.
         *
         * @param {Object} params.executeItx - Instructions for executing the interchain transaction.
         * @param {InterchainTransaction} params.executeItx.iTx - The interchain transaction object to be executed.
         * @param {Function} params.executeItx.signItxHashAction - A function to sign the iTx hash.
         *        It should take an Address (the iTx hash) and return a Promise resolving to the signed hash string.
         *
         * @returns {Promise<ExecuteResponse>} A promise that resolves to the execution response of the iTx.
         *
         * @throws {Error} May throw errors during the token transfer, quote fetching, signing, or execution phases.
         *
         * @example
         * const result = await klasterSDK.transferAndExecute({
         *   transferToSmartAccount: {
         *     tokenToTransfer: '0x...',  // ERC20 token address
         *     amountToTransfer: BigInt(1000000),  // Amount in smallest unit
         *     chainId: 1,  // Ethereum mainnet
         *     executeTxAction: async (tx) => {
         *       // Implement your transaction execution logic here
         *       await yourProvider.sendTransaction(tx);
         *     }
         *   },
         *   executeItx: {
         *     iTx: {
         *       // Your interchain transaction object
         *     },
         *     signItxHashAction: async (hash) => {
         *       // Implement your signing logic here
         *       return await yourSigner.signMessage(hash);
         *     }
         *   }
         * });
         *
         * @remarks
         * - The `executeTxAction` function should handle the actual sending of the transfer transaction to the blockchain.
         *   Consult the Klaster documentation for details on implementing this with your specific provider.
         * - The `signItxHashAction` function should handle the signing of the iTx hash.
         *   Ensure you're using the correct signing method as specified in the Klaster documentation.
         * - This function will wait for the transfer transaction to be accepted before proceeding with the iTx execution.
         *
         * @see Klaster documentation for detailed information on implementing `executeTxAction` and `signItxHashAction`.
         * @see {@link buildTransferERC20FromEoaTx} - Used internally to construct the transfer transaction.
         * @see {@link getQuote} - Used internally to fetch the quote for the iTx.
         * @see {@link execute} - Used internally to execute the iTx.
         */
        transferAndExecute(params: {
            transferToSmartAccount: {
                tokenToTransfer: Address;
                amountToTransfer: bigint;
                chainId: number;
                executeTxAction: (tx: RawTransaction) => Promise<void>;
            };
            executeItx: {
                iTx: InterchainTransaction;
                signItxHashAction: (hash: Address) => Promise<string>;
            };
        }): Promise<ExecuteResponse>;
    }
}
