import {
  Address,
  encodeAbiParameters,
  Hex,
  numberToHex,
  parseAbiParameters,
  stringToHex,
} from "viem";
import { AccountDeployment } from "../types";

export abstract class AccountInitData<TParams> {
  abstract accountProviderId: string;
  accountInitDataParams: TParams;
  salt: Hex;

  abstract encodeAccountCreationFactoryData(): Hex;

  constructor(params: TParams & { salt?: string }) {
    this.accountInitDataParams = params;

    // If no salt is provided, encode a 0x0 (len. 32) salt
    this.salt = params.salt
      ? stringToHex(params.salt)
      : "0x0000000000000000000000000000000000000000000000000000000000000000";
  }
}

export class MultichainAccount {

  accountInitData: AccountInitData<Object>

  readonly uniqueAddresses = new Set(
    this.deployments.map((deployment) => deployment.address),
  );

  constructor(
    private deployments: AccountDeployment[],
    accountInitData: AccountInitData<Object>
  ) {
    this.accountInitData = accountInitData
  }

  getAddress(chainId: number) {
    return this.deployments.find((deployment) => deployment.chainId === chainId)
      ?.address;
  }

  getAddresses(chainIds: number[]) {
    return chainIds.map(id => {
       return this.deployments.find((deployment) => deployment.chainId === id)?.address
    })
  }
}
