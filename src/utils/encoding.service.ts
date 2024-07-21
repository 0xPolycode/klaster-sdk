import { Address, encodeFunctionData } from "viem";
import { ApiUserOp, RawTransaction } from "../types";
import { smartAccountAbi } from "../generated";

export class EncodingService {
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
