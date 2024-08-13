import { Address, encodeFunctionData, erc20Abi } from "viem";
import { RawTransaction } from "../../types";
import { rawTx } from "../itx.service";

export function encodeApproveTx({
  tokenAddress,
  recipient,
  amount
}: {
  tokenAddress: Address,
  recipient: Address,
  amount: bigint
}) : RawTransaction {

  return rawTx({
    gasLimit: BigInt(100000),
    to: tokenAddress,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: 'approve',
      args: [recipient, amount]
    }),
    value: BigInt(0)
  })
}