import { Address, Chain } from "viem";
import { MultichainTokenMapping, TokenInfo } from "../types";

export function getTokenAddressForChainId(tokenMapping: MultichainTokenMapping, chainId: number) {
  return tokenMapping.find(deployment => deployment.chainId === chainId)?.address
}

export function buildTokenMapping(tokens: TokenInfo[]): MultichainTokenMapping {
  const mapping: MultichainTokenMapping = [];

  return tokens.map(token => {
    return {
      address: token.address,
      chainId: token.chainId
    }
  })
}

export function deployment(chainId: number, address: Address): TokenInfo {
  return {
    chainId: chainId,
    address: address
  }
}