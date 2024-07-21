//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SmartAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const smartAccountAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "anEntryPoint",
        internalType: "contract IEntryPoint",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "error", inputs: [], name: "AlreadyInitialized" },
  { type: "error", inputs: [], name: "BaseImplementationCannotBeZero" },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotAnEntryPoint",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotEntryPoint",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotEntryPointOrOwner",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotEntryPointOrSelf",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotOwner",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "CallerIsNotSelf",
  },
  { type: "error", inputs: [], name: "DelegateCallsOnly" },
  { type: "error", inputs: [], name: "EntryPointCannotBeZero" },
  { type: "error", inputs: [], name: "HandlerCannotBeZero" },
  {
    type: "error",
    inputs: [
      {
        name: "implementationAddress",
        internalType: "address",
        type: "address",
      },
    ],
    name: "InvalidImplementation",
  },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "MixedAuthFail",
  },
  {
    type: "error",
    inputs: [{ name: "module", internalType: "address", type: "address" }],
    name: "ModuleAlreadyEnabled",
  },
  {
    type: "error",
    inputs: [
      { name: "expectedModule", internalType: "address", type: "address" },
      { name: "returnedModule", internalType: "address", type: "address" },
      { name: "prevModule", internalType: "address", type: "address" },
    ],
    name: "ModuleAndPrevModuleMismatch",
  },
  {
    type: "error",
    inputs: [{ name: "module", internalType: "address", type: "address" }],
    name: "ModuleCannotBeZeroOrSentinel",
  },
  {
    type: "error",
    inputs: [{ name: "module", internalType: "address", type: "address" }],
    name: "ModuleNotEnabled",
  },
  { type: "error", inputs: [], name: "ModulesAlreadyInitialized" },
  { type: "error", inputs: [], name: "ModulesSetupExecutionFailed" },
  { type: "error", inputs: [], name: "OwnerCanNotBeSelf" },
  { type: "error", inputs: [], name: "OwnerCannotBeZero" },
  { type: "error", inputs: [], name: "OwnerProvidedIsSame" },
  { type: "error", inputs: [], name: "TransferToZeroAddressAttempt" },
  {
    type: "error",
    inputs: [
      { name: "destLength", internalType: "uint256", type: "uint256" },
      { name: "valueLength", internalType: "uint256", type: "uint256" },
      { name: "funcLength", internalType: "uint256", type: "uint256" },
      { name: "operationLength", internalType: "uint256", type: "uint256" },
    ],
    name: "WrongBatchProvided",
  },
  {
    type: "error",
    inputs: [
      { name: "contractSignature", internalType: "bytes", type: "bytes" },
    ],
    name: "WrongContractSignature",
  },
  {
    type: "error",
    inputs: [
      { name: "uintS", internalType: "uint256", type: "uint256" },
      {
        name: "contractSignatureLength",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "signatureLength", internalType: "uint256", type: "uint256" },
    ],
    name: "WrongContractSignatureFormat",
  },
  {
    type: "error",
    inputs: [
      {
        name: "moduleAddressProvided",
        internalType: "address",
        type: "address",
      },
    ],
    name: "WrongValidationModule",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousHandler",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "handler",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ChangedFallbackHandler",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "module",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "DisabledModule",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "module",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "EnabledModule",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: true },
      {
        name: "operation",
        internalType: "enum Enum.Operation",
        type: "uint8",
        indexed: false,
      },
      {
        name: "txGas",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ExecutionFailure",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "module",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ExecutionFromModuleFailure",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "module",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ExecutionFromModuleSuccess",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: true },
      {
        name: "operation",
        internalType: "enum Enum.Operation",
        type: "uint8",
        indexed: false,
      },
      {
        name: "txGas",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ExecutionSuccess",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldImplementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newImplementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ImplementationUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "module",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "to", internalType: "address", type: "address", indexed: false },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operation",
        internalType: "enum Enum.Operation",
        type: "uint8",
        indexed: false,
      },
    ],
    name: "ModuleTransaction",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "SmartAccountReceivedNativeToken",
  },
  { type: "fallback", stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "VERSION",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "addDeposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "prevModule", internalType: "address", type: "address" },
      { name: "module", internalType: "address", type: "address" },
    ],
    name: "disableModule",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "module", internalType: "address", type: "address" }],
    name: "enableModule",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "entryPoint",
    outputs: [
      { name: "", internalType: "contract IEntryPoint", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address[]", type: "address[]" },
      { name: "value", internalType: "uint256[]", type: "uint256[]" },
      { name: "data", internalType: "bytes[]", type: "bytes[]" },
      {
        name: "operations",
        internalType: "enum Enum.Operation[]",
        type: "uint8[]",
      },
    ],
    name: "execBatchTransactionFromModule",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "operation", internalType: "enum Enum.Operation", type: "uint8" },
      { name: "txGas", internalType: "uint256", type: "uint256" },
    ],
    name: "execTransactionFromModule",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "operation", internalType: "enum Enum.Operation", type: "uint8" },
    ],
    name: "execTransactionFromModule",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "operation", internalType: "enum Enum.Operation", type: "uint8" },
    ],
    name: "execTransactionFromModuleReturnData",
    outputs: [
      { name: "success", internalType: "bool", type: "bool" },
      { name: "returnData", internalType: "bytes", type: "bytes" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "dest", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "func", internalType: "bytes", type: "bytes" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "dest", internalType: "address[]", type: "address[]" },
      { name: "value", internalType: "uint256[]", type: "uint256[]" },
      { name: "func", internalType: "bytes[]", type: "bytes[]" },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "dest", internalType: "address[]", type: "address[]" },
      { name: "value", internalType: "uint256[]", type: "uint256[]" },
      { name: "func", internalType: "bytes[]", type: "bytes[]" },
    ],
    name: "executeBatch_y6U",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "dest", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "func", internalType: "bytes", type: "bytes" },
    ],
    name: "execute_ncC",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getDeposit",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getFallbackHandler",
    outputs: [{ name: "_handler", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getImplementation",
    outputs: [
      { name: "_implementation", internalType: "address", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "start", internalType: "address", type: "address" },
      { name: "pageSize", internalType: "uint256", type: "uint256" },
    ],
    name: "getModulesPaginated",
    outputs: [
      { name: "array", internalType: "address[]", type: "address[]" },
      { name: "next", internalType: "address", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "handler", internalType: "address", type: "address" },
      { name: "moduleSetupContract", internalType: "address", type: "address" },
      { name: "moduleSetupData", internalType: "bytes", type: "bytes" },
    ],
    name: "init",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "module", internalType: "address", type: "address" }],
    name: "isModuleEnabled",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "dataHash", internalType: "bytes32", type: "bytes32" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_key", internalType: "uint192", type: "uint192" }],
    name: "nonce",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "noncesDeprecated",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "ownerDeprecated",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "handler", internalType: "address", type: "address" }],
    name: "setFallbackHandler",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "setupContract", internalType: "address", type: "address" },
      { name: "setupData", internalType: "bytes", type: "bytes" },
    ],
    name: "setupAndEnableModule",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_implementation", internalType: "address", type: "address" },
    ],
    name: "updateImplementation",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "userOp",
        internalType: "struct UserOperation",
        type: "tuple",
        components: [
          { name: "sender", internalType: "address", type: "address" },
          { name: "nonce", internalType: "uint256", type: "uint256" },
          { name: "initCode", internalType: "bytes", type: "bytes" },
          { name: "callData", internalType: "bytes", type: "bytes" },
          { name: "callGasLimit", internalType: "uint256", type: "uint256" },
          {
            name: "verificationGasLimit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "preVerificationGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "maxFeePerGas", internalType: "uint256", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "paymasterAndData", internalType: "bytes", type: "bytes" },
          { name: "signature", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "userOpHash", internalType: "bytes32", type: "bytes32" },
      { name: "missingAccountFunds", internalType: "uint256", type: "uint256" },
    ],
    name: "validateUserOp",
    outputs: [
      { name: "validationData", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "withdrawAddress",
        internalType: "address payable",
        type: "address",
      },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "withdrawDepositTo",
    outputs: [],
    stateMutability: "payable",
  },
  { type: "receive", stateMutability: "payable" },
] as const;
