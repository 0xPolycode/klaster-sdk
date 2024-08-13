import { TxFeeParams } from "./types.js";

export function parseKlasterNodeError(e: any) {
  return `Klaster node error: ${JSON.stringify(e.response.data.errors)}`;
}

export function parseExecuteError(e: any, payment: TxFeeParams) {
  return `${parseKlasterNodeError(e)}. Payment token: ${payment.token}. Payment chain: ${payment.chainId}`;
}