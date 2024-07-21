import { InterchainTransaction, RawTransaction } from "../types";

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
export function encodeItx(itx: InterchainTransaction): InterchainTransaction {
  return itx;
}

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
export function encodeAction(txs: RawTransaction[], chainId: number) {
  return { txs: txs, chainId: chainId };
}

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
export function encodeTx(tx: RawTransaction) {
  return tx;
}