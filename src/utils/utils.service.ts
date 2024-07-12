import {
  Address,
  TransactionSerializable,
  createWalletClient,
  custom,
  encodeFunctionData,
  erc20Abi,
} from "viem";
import { mainnet } from "viem/chains";

// Fetches the address provided by an injected web3 wallet provider.
export async function fetchInjectedAddress() {
  const client = createWalletClient({
    chain: mainnet,
    transport: custom((window as any).ethereum),
  });
  return (await client.getAddresses()).at(0);
}

// Builds the transaction to transfer funds from an EOA
// to an account. Used to transfer tokens from an EOA to a smart contract
// account.
export function buildTransferERC20FromEoaTx(params: {
  recipient: Address,
  amount: bigint,
  chainId: number,
  token: Address
}): TransactionSerializable {
  const data =  encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [params.recipient, params.amount],
  });
  return {
    to: params.token,
    value: BigInt(0),
    chainId: params.chainId,
    data: data
  }
}

