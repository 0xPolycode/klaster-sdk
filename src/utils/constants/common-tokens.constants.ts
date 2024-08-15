import { zeroAddress } from "viem";
import { buildTokenMapping, deployment } from "../token-mapping.service";
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
} from "viem/chains";

export const mcUSDC = buildTokenMapping([
  deployment(arbitrum.id, "0xaf88d065e77c8cc2239327c5edb3a432268e5831"),
  deployment(base.id, "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"),
  deployment(mainnet.id, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"),
  deployment(optimism.id, "0x0b2c639c533813f4aa9d7837caf62653d097ff85"),
  deployment(avalanche.id, "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"),
  deployment(bsc.id, "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"),
  deployment(polygon.id, "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"),
]);

export const mcUSDT = buildTokenMapping([
  deployment(mainnet.id, "0xdac17f958d2ee523a2206206994597c13d831ec7"),
  deployment(avalanche.id, "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7"),
  deployment(arbitrum.id, "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"),
  deployment(optimism.id, "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"),
  deployment(polygon.id, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"),
  deployment(bsc.id, "0x55d398326f99059ff775485246999027b3197955"),
  deployment(base.id, "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"),
]);

export const mcETH = buildTokenMapping(
  [mainnet, optimism, base, arbitrum].map((chain) =>
    deployment(chain.id, zeroAddress),
  ),
);

export const mcWETH = buildTokenMapping([
  deployment(base.id, "0x4200000000000000000000000000000000000006"),
  deployment(optimism.id, "0x4200000000000000000000000000000000000006"),
  deployment(arbitrum.id, "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"),
  deployment(polygon.id, "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"),
  deployment(bsc.id, "0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA"),
  deployment(avalanche.id, "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB"),
]);
