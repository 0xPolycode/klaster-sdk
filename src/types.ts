import { Address, Hex } from "viem";
import { MultichainAccount } from "./accounts/account.service";

export interface ApiUserOp {
  callData: string;
  callGasLimit: string;
  chainId: number;
}

export interface TxFeeParams {
  token: string;
  chainId: number;
}

export interface ERC4337UserOp {
  userOp: {
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
  };
}

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

export interface QuoteResponse {
  walletProvider: string,
  itxHash: Hex;
  commitment: string;
  node: Address;
  paymentInfo: TxFeeParams;
  userOps: ERC4337UserOp[];
}

export interface ExecuteResponse {
  itxHash: string;
}

export interface ItxStatusResponse {
  itxHash: string;
  node: Address;
  commitment: string;
  paymentInfo: TxFeeParams & {
    tokenAmount: string;
    tokenValue: string;
  };
  userOps: ExecutedAction[];
}

// Fully described Interchain Transaction model.
export interface InterchainTransaction {
  steps: TransactionBatch[];
  feeTx: TxFeeParams;
}

export interface RawTransaction {
  to: Address;
  value?: bigint;
  data?: Hex;
  gasLimit: bigint;
}

export type AccountDeployment = { address: Address; chainId: number };

export interface AccountData {
  walletProvider: string;
  factoryData: Hex;
  multichainAccount: AccountDeployment[];
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

export interface TransactionBatch {
  txs: RawTransaction[];
  chainId: number;
  upperBoundTime?: number;
  lowerBoundTime?: number;
}

export type TokenUtilizationStrategyItem = {
  chainId: number;
  amount: bigint;
};

export type ChainRpcInfo = {
  chainId: number;
  rpcUrl: string;
};

export type MultichainTokenMapping = { chainId: number; address: Address }[];

export type UnifiedBalanceResult = {
  balance: bigint;
  decimals: number;
  breakdown: { chainId: number; amount: bigint }[];
};

export type TokenInfo = {
  chainId: number;
  address: Address;
};

export type TokenUtilizationStrategyItems =
  | TokenUtilizationStrategyItem[]
  | null;

export type BridgePluginResult = {
  txBatch: TransactionBatch;
  receivedOnDestination: bigint | null;
};

export interface BridgePluginParams {
  sourceToken: Address;
  destinationToken: Address;
  sourceChainId: number;
  destinationChainId: number;
  amount: bigint;
  account: MultichainAccount;
}

export type BridgePlugin = (
  data: BridgePluginParams,
) => Promise<BridgePluginResult>;

export type TokenUtilizationStrategyResult = {
  steps: TransactionBatch[];
  totalReceivedOnDestination: bigint;
};
