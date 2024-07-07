import { Address } from "viem"

export interface ApiUserOp {
  masterWallet: Address,
  salt: string,
  callData: string,
  callGasLimit: string,
  chainId: number
}

export interface ERC4337UserOp {
  sender: Address,
  nonce: string,
  initCode: string,
  callData: string,
  callGasLimit: string,
  verificationGasLimit: string,
  preVerificationGas: string,
  maxFeePerGas: string,
  maxPriorityFeePerGas: string,
  paymasterAndData: string,
  signature: string
}

export interface ExecutedAction {
  userOp: ERC4337UserOp,
  userOpHash: string,
  lowerBoundTimestap: string,
  upperBoundTimestamp: string,
  chainId: string,
  maxGasLimit: string,
  executionStatus: 'SUCCESS' | 'PENDING' | 'FAILED',
  executionData: string
}

export interface QuoteResponse {
  itxHash: string,
  commitment: string,
  node: string,
  paymentInfo: ApiPaymentData,
  userOps: ERC4337UserOp[]
}

export interface ExecuteResponse {
  iTxHash: string
}

export interface ItxStatusResponse {
  itxHash: string,
  node: Address,
  commitment: string,
  paymentInfo: ApiPaymentData & {
    tokenAmount: string,
    tokenValue: string
  },
  userOps: ExecutedAction[]
}

export interface ApiPaymentData {
  masterWallet: Address,
  salt: string,
  token: string,
  chainId: number
}

export interface InterchainTransaction {
  actions: ITxUserOp[],
  paymentInfo: ApiPaymentData
}

export interface ITxUserOp {
  txs: RawTransaction[],
  chainId: number,
  upperBoundTime?: number,
  lowerBoundTime?: number
}

export interface RawTransaction {
  to: string,
  value: string,
  data: string,
  gasLimit: string,
}

export interface MultichainAccount {
  address: Address,
  salt: string
}

