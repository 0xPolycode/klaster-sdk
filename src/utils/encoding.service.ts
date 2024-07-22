import { Address, encodeFunctionData } from "viem";
import { ApiUserOp, RawTransaction } from "../types";
import { smartAccountAbi } from "../generated";

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
  static encodeUserOpCall(
    tx: RawTransaction,
    chainId: number,
    masterWallet: Address,
    salt: string,
  ): ApiUserOp {
    const data = encodeFunctionData({
      abi: smartAccountAbi,
      functionName: "execute",
      args: [tx.to, tx.value, tx.data as any],
    });

    return {
      callData: data,
      callGasLimit: tx.gasLimit.toString(),
      chainId: chainId,
      masterWallet: masterWallet,
      salt: salt,
    };
  }

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
  static encodeBatchCall(
    txs: RawTransaction[],
    chainId: number,
    masterWallet: Address,
    salt: string,
  ): ApiUserOp {
    const data = encodeFunctionData({
      abi: smartAccountAbi,
      functionName: "executeBatch",
      args: [
        txs.map((tx) => tx.to),
        txs.map((tx) => tx.value),
        txs.map((tx) => tx.data as any),
      ],
    });

    const gasLimit = txs
      .map((tx) => BigInt(tx.gasLimit))
      .reduce((x, y) => {
        return x + y;
      });

    return {
      callData: data,
      callGasLimit: gasLimit.toString(),
      chainId: chainId,
      masterWallet: masterWallet,
      salt: salt,
    };
  }
}
