import { createPublicClient, http, getContract, erc20Abi, Address } from "viem";
import {
  TokenUtilizationStrategyItems,
  TokenUtilizationStrategyItem,
  ChainRpcInfo,
  MultichainTokenMapping,
  BridgePlugin,
  TokenUtilizationStrategyResult,
  UnifiedBalanceResult,
} from "../../types";
import { MultichainClient } from "../chains.service";
import { getTokenAddressForChainId } from "../token-mapping.service";
import { MultichainAccount } from "../../accounts/account.service";

function calculateTokenUtilizationStrategy(
  sortedBalances: Array<{ chainId: number; balance: bigint; decimals: number }>,
  amount: bigint,
): TokenUtilizationStrategyItems | null {
  let remainingAmount = amount;
  const result: TokenUtilizationStrategyItem[] = [];

  for (const { chainId, balance } of sortedBalances) {
    if (remainingAmount <= BigInt(0)) break;
    if (balance > BigInt(0)) {
      const amountToUse =
        balance >= remainingAmount ? remainingAmount : balance;
      result.push({ chainId, amount: amountToUse });
      remainingAmount -= amountToUse;
    }
  }

  if (remainingAmount > BigInt(0)) {
    return null;
  }

  return result;
}

export class TokenUtilizationStrategy {
  steps: TokenUtilizationStrategyItems;
  tokenMapping: MultichainTokenMapping;
  chainRpcsInfo: ChainRpcInfo[];
  account: MultichainAccount;
  destinationChainBalance: bigint;
  destinationChainId: number;
  totalAmount: bigint;

  constructor(
    steps: TokenUtilizationStrategyItems,
    tokenMapping: MultichainTokenMapping,
    chainRpcsInfo: ChainRpcInfo[],
    account: MultichainAccount,
    destinationChainBalance: bigint,
    destinationChainId: number,
    totalAmount: bigint,
  ) {
    this.steps = steps;
    this.tokenMapping = tokenMapping;
    this.chainRpcsInfo = chainRpcsInfo;
    this.account = account;
    this.destinationChainBalance = destinationChainBalance;
    this.destinationChainId = destinationChainId;
    this.totalAmount = totalAmount;
  }

  async encode(
    encodeSingleBridgeData: BridgePlugin,
  ): Promise<TokenUtilizationStrategyResult> {
    if (!this.steps) {
      throw Error(`Token strategy is null. This indicates that there is no feasible strategy to execute your 
        desired multi-bridge action. Most likely, this is caused by the user not having enough funds.`);
    }

    // If destination chain has enough balance, don't calculate any bridging strategies
    if (this.destinationChainBalance > this.totalAmount) {
      return {
        steps: [],
        totalReceivedOnDestination: this.totalAmount,
      };
    }

    const destinationToken = getTokenAddressForChainId(
      this.tokenMapping,
      this.destinationChainId,
    );
    if (!destinationToken) {
      throw new Error(
        `Token mapping doesn't contain token on chainId: ${this.destinationChainId}`,
      );
    }

    const bridgingTxs = await Promise.all(
      this.steps
        // No need for bridging if the origin and destination chains are the same
        .filter(({ chainId, amount }) => {
          return chainId !== this.destinationChainId;
        })
        .map(async ({ chainId, amount }) => {
          const sourceToken = getTokenAddressForChainId(
            this.tokenMapping,
            chainId,
          );
          if (!sourceToken) {
            throw new Error(
              `Token mapping doesn't contain token on chainId: ${this.destinationChainId}`,
            );
          }

          return await encodeSingleBridgeData({
            sourceToken,
            destinationToken,
            sourceChainId: chainId,
            destinationChainId: this.destinationChainId,
            amount,
            account: this.account,
          });
        }),
    );

    const totalOuputFromEncodedTxs =
      bridgingTxs.length === 0
        ? BigInt(0)
        : bridgingTxs
            .map((x) => {
              return x.receivedOnDestination ?? BigInt(0);
            })
            .reduce((curr, acc) => {
              return curr + acc;
            });

    return {
      steps: bridgingTxs.map((x) => x.txBatch),
      totalReceivedOnDestination: totalOuputFromEncodedTxs,
    };
  }
}

export async function prepareStrategy({
  tokenMapping,
  client,
  amount,
  account,
  destinationChainId,
  unifiedBalance,
}: {
  tokenMapping: MultichainTokenMapping;
  client: MultichainClient;
  amount: bigint;
  account: MultichainAccount;
  destinationChainId: number;
  unifiedBalance?: UnifiedBalanceResult;
}): Promise<TokenUtilizationStrategy> {
  // Fetch balances for all chains

  const balance =
    unifiedBalance ??
    (await client.getUnifiedErc20Balance({
      tokenMapping: tokenMapping,
      account: account,
    }));
  const balances = balance.breakdown;

  if (amount < 0) {
    throw Error(
      `Expected destinationamount for encoding bridigng actions can't be negative. Got ${amount}`,
    );
  }

  const destChainBalance = balances.find(
    (balance) => balance.chainId === destinationChainId,
  );
  if (!destChainBalance) {
    throw new Error(`Dest chain (chainId: ${destinationChainId}) balance is undefined.
      Available balances: ${balances.map((x) => `[${x.chainId}, ${x.amount}]`)}`);
  }

  const nonDestChainBalances = balances.filter(
    (balance) => balance.chainId !== destinationChainId,
  );

  // Sort descending
  const sortedBalances = nonDestChainBalances.sort((a, b) => {
    return a.amount > b.amount ? -1 : 1;
  });

  // Calculate token utilization
  const tokenUtilizationSteps = calculateTokenUtilizationStrategy(
    sortedBalances.map((signleBalance) => {
      return {
        balance: signleBalance.amount,
        chainId: signleBalance.chainId,
        decimals: balance.decimals,
      };
    }),
    amount - destChainBalance.amount,
  );

  return new TokenUtilizationStrategy(
    tokenUtilizationSteps,
    tokenMapping,
    client.chainsRpcInfo,
    account,
    destChainBalance.amount,
    destChainBalance.chainId,
    amount,
  );
}

export async function encodeBridgingOps({
  tokenMapping,
  client,
  amount,
  account,
  destinationChainId,
  bridgePlugin,
  unifiedBalance,
}: {
  tokenMapping: MultichainTokenMapping;
  client: MultichainClient;
  amount: bigint;
  account: MultichainAccount;
  destinationChainId: number;
  bridgePlugin: BridgePlugin;
  unifiedBalance?: UnifiedBalanceResult;
}): Promise<TokenUtilizationStrategyResult> {
  const strategy = await prepareStrategy({
    tokenMapping,
    client,
    amount,
    account,
    destinationChainId,
    unifiedBalance,
  });
  return await strategy.encode(bridgePlugin);
}

export function buildBridgingEncoder(
  encoder: BridgePlugin,
): BridgePlugin {
  return encoder;
}
