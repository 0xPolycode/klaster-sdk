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

// Fully described Interchain Transaction model.
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

// Model returned by the /info route of the Klaster node.
// Represents all the tokens and chains in which the 
// payment of tx fees is enabled.
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
