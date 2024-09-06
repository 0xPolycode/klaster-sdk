import { Address, createPublicClient, erc20Abi, getContract, http } from "viem";
import {
  ChainRpcInfo,
  MultichainTokenMapping,
  UnifiedBalanceResult,
} from "../types";
import { defineCustomChain } from "./custom-chain.service";
import { MultichainAccount } from "../accounts/account.service";

export class MultichainClient {
  chainsRpcInfo: ChainRpcInfo[];

  constructor(chainsRpcInfo: ChainRpcInfo[]) {
    this.chainsRpcInfo = chainsRpcInfo;
  }

  async getUnifiedErc20Balance({
    tokenMapping,
    account,
  }: {
    tokenMapping: MultichainTokenMapping;
    account: MultichainAccount;
  }): Promise<UnifiedBalanceResult> {
    tokenMapping.forEach((deployment) => {
      if (
        !this.chainsRpcInfo.find((info) => info.chainId === deployment.chainId)
      ) {
        throw Error(`The multichain readonly client you provided does not support ${deployment.chainId}
          required by the tokenMapping you're using.`);
      }
    });

    // Filter only RPCs for tokens present in the mapping. E.g. if a project uses chains X, Y and Z, but
    // the tokenMapping only has chains X and Y - then skip the balance call for chain Z
    const filteredRpcs = this.chainsRpcInfo.filter(
      (rpcInfo) =>
        tokenMapping.find(
          (deployment) => deployment.chainId === rpcInfo.chainId,
        ) !== undefined,
    );

    // Fetch contract instances from all blockchains provided in the chainsConfig
    const erc20Contracts = filteredRpcs
      .map(({ chainId, rpcUrl }) => {
        const chain = defineCustomChain(chainId, rpcUrl);
        return createPublicClient({
          chain,
          transport: http(rpcUrl),
        });
      })
      .map((client) => {
        const tokenAddress = tokenMapping.find(
          (deployment) => deployment.chainId === client.chain.id,
        )?.address;
        if (!tokenAddress) {
          throw new Error(
            `Token mapping doesn't cotain a token on ${client.chain.id}`,
          );
        }
        return {
          contract: getContract({
            address: tokenAddress,
            abi: erc20Abi,
            client: client,
          }),
          chainId: client.chain.id,
        };
      });

    // Call balance and decimals on all contracts
    const results = await Promise.all(
      erc20Contracts.map(async (bundle) => {
        try {
          const address = account.getAddress(bundle.chainId);
          if (!address) {
            throw new Error(
              `Couldn't fetch account address for chainId ${bundle.chainId}.
              Most likely, the Smart Contract account provider you chose doesn't
              support ${bundle.chainId}`,
            );
          }
          const balance = await bundle.contract.read.balanceOf([address]);
          const decimals = await bundle.contract.read.decimals();
          return {
            balance: balance,
            decimals: decimals,
            chainId: bundle.chainId,
          };
        } catch (e) {
          throw new Error(
            `
            Unified balance error. Unable to fetch balance on chainId: ${bundle.chainId}. 
          ` +
              "\n" +
              `${e}`,
          );
        }
      }),
    );

    if (results.length === 0) {
      throw Error(
        "Fetching balanceOf and/or decimals failed in getUnifiedBalance",
      );
    }
    // Add up all the balances. Throw error if some tokens have a different number of decimals
    const totalAmount = results
      .map((bundle) => {
        return {
          balance: bundle.balance,
          decimals: bundle.decimals,
        };
      })
      .reduce((curr, acc) => {
        if (curr.decimals !== acc.decimals) {
          throw Error(`Unified balance doesn't support tokens with a different number of decimals. 
          You have provided a tokenMappign with ${curr.decimals} and ${acc.decimals}.`);
        }
        return {
          balance: curr.balance + acc.balance,
          decimals: curr.decimals,
        };
      });

    // Return the totalAmount with balance and decimals + return the breakdown of balances on all chains
    return {
      ...totalAmount,
      breakdown: results.map((x) => {
        return { amount: x.balance, chainId: x.chainId };
      }),
    };
  }

  async getUnifiedNativeBalance({ account }: { account: MultichainAccount }) {
    const balances = await Promise.all(
      this.chainsRpcInfo.map(async (chainRpc) => {
        const chain = defineCustomChain(chainRpc.chainId, chainRpc.rpcUrl);
        const client = createPublicClient({
          transport: http(chainRpc.rpcUrl),
          chain: chain,
        });
        const address = account.getAddress(chainRpc.chainId);
        if (!address) {
          return BigInt(0);
        }
        return await client.getBalance({
          address: address,
        });
      }),
    );
    return balances.reduce((curr, acc) => {
      return curr + acc;
    }, BigInt(0));
  }
}

export function buildMultichainReadonlyClient(config: ChainRpcInfo[]) {
  return new MultichainClient(config);
}

export function buildRpcInfo(chainId: number, rpcUrl: string): ChainRpcInfo {
  return {
    chainId: chainId,
    rpcUrl: rpcUrl,
  };
}
