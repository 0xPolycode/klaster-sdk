import { Address, encodeFunctionData, Hex, numberToHex, parseAbi, stringToHex } from "viem";
import { ApiUserOp, RawTransaction } from "../types";
import { smartAccountAbi } from "../generated";
import { MultichainAccount } from "../accounts/account.service";

export function encodeSmartAccountCall(
  chainId: number,
  txs: RawTransaction[],
): ApiUserOp {
  const abi = parseAbi([
    "function execute(address[] calldata to, uint256[] calldata value, bytes[] calldata data)",
  ]);

  const data = encodeFunctionData({
    abi: abi,
    functionName: "execute",
    args: [
      txs.map((tx) => tx.to),
      txs.map((tx) => tx.value ?? BigInt(0)),
      txs.map((tx) => tx.data ?? stringToHex('')),
    ],
  });

  return {
    callData: data,
    callGasLimit: txs
      .map((x) => x.gasLimit)
      .reduce((curr, acc) => curr + acc)
      .toString(),
    chainId: chainId,
  };
}
