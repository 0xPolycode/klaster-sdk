import { ApiUserOp, InterchainTransaction, RawTransaction } from "../types";

export function encodeItx(itx: InterchainTransaction): InterchainTransaction {
  return itx;
}
export function encodeAction(txs: RawTransaction[], chainId: number) {
  return { txs: txs, chainId: chainId };
}
