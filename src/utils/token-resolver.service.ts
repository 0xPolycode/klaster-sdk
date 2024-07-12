import { Address } from "viem";
import { Token } from "..";
import { optimism, base, mainnet, } from 'viem/chains'

const NATIVE_ASSET_PLACEHOLDER_ADDRESS = '0x0000000000000000000000000000000000000000'

export function resolveToken(token: Token, chainId: number): Address {
  switch (chainId) {
    case mainnet.id: return resolveEthereum(token);
    case optimism.id: return resolveOptimism(token);
    case base.id: return resolveBase(token)
  }
  throw Error(`Unsupported chain ${chainId}`)
}

function resolveOptimism(token: Token): Address { 
  switch (token) {
    case 'usdc': return '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85';
    case 'usdt': return '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
    case 'eth': return NATIVE_ASSET_PLACEHOLDER_ADDRESS;
    case 'link': return '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6';
    case 'steth': return '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb'
  }
  throw getUnsupportedTokenError(token)
}

function resolveBase(token: Token): Address {
  switch(token) {
    case 'usdc': return '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    case 'usdt': return '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    case 'eth': return NATIVE_ASSET_PLACEHOLDER_ADDRESS;
    case 'link': return '0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196'
  }
  throw getUnsupportedTokenError(token)
}

function resolveEthereum(token: Token): Address {
  switch(token) {
    case 'eth': return NATIVE_ASSET_PLACEHOLDER_ADDRESS;
    case 'usdc': return '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    case 'usdt': return '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    case 'link': return '0x514910771AF9Ca656af840dff83E8264EcF986CA';
  }
  throw getUnsupportedTokenError(token)
}


function getUnsupportedTokenError(token: Token) {
  return Error(`Unsupported payment token: ${token}`)
}