import {
  TransactionBatch,
  InterchainTransaction,
  RawTransaction,
} from "../types";

export function buildItx(itx: InterchainTransaction): InterchainTransaction {
  return itx;
}

export function batchTx(
  chainId: number,
  txs: RawTransaction[],
  options?: {
    lowerBoundTime?: number;
    upperBoundTime?: number;
  },
): TransactionBatch {
  return {
    txs: txs,
    chainId: chainId,
    upperBoundTime: options?.lowerBoundTime,
    lowerBoundTime: options?.upperBoundTime,
  };
}

export function singleTx(
  chainId: number,
  tx: RawTransaction,
  options?: {
    lowerBoundTime: number;
    upperBoundTime: number;
  },
): TransactionBatch {
  return {
    txs: [tx],
    chainId: chainId,
    lowerBoundTime: options?.lowerBoundTime,
    upperBoundTime: options?.upperBoundTime,
  };
}

export function rawTx(tx: RawTransaction) {
  return tx;
}
