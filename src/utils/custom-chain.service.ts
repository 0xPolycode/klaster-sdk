import { Chain, defineChain } from "viem";

export function defineCustomChain(chainId: number, rpcUrl: string): Chain {
  return defineChain({
    id: chainId,
    network: `chain-${chainId}`,
    name: `Chain ${chainId}`,
    nativeCurrency: {
      decimals: 18,
      name: "_",
      symbol: "_",
    },
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] },
    },
  });
}