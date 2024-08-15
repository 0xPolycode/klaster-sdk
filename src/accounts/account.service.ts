import {
  Address,
  encodeAbiParameters,
  Hex,
  numberToHex,
  parseAbiParameters,
  stringToHex,
} from "viem";

export abstract class AccountInitData<TParams> {
  abstract accountProviderId: string;
  accountInitDataParams: TParams;
  salt: Hex;

  abstract encodeAccountCreationFactoryData(): Hex;

  constructor(params: TParams & { salt?: string }) {
    this.accountInitDataParams = params;
    this.salt = params.salt ? stringToHex(params.salt) : numberToHex(0);
  }
}

export type AccountDeployment = { address: Address; chainId: number };

export class MultichainAccount<T extends AccountInitData<Object>> {
  readonly uniqueAddresses = new Set(this.deployments);
  accountInitData: T;

  constructor(
    accountInitData: T,
    private deployments: AccountDeployment[],
  ) {
    this.accountInitData = accountInitData;
  }

  getAddress(chainId: number) {
    return this.deployments.find((deployment) => deployment.chainId === chainId)
      ?.address;
  }
}