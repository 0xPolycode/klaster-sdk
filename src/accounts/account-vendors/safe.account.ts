import { Address, encodeAbiParameters, Hex, parseAbiParameters } from "viem";
import { AccountInitData } from "../account.service";

export type SafeV141AccountInitDataParams = {
  signers: Address[];
  threshold: bigint;
};

export class SafeV141AccountInitData extends AccountInitData<SafeV141AccountInitDataParams> {
  accountProviderId = "SAFE_V141";

  encodeAccountCreationFactoryData(): Hex {
    return encodeAbiParameters(
      parseAbiParameters("address[] signers, uint256 threshold, bytes32 salt"),
      [
        this.accountInitDataParams.signers,
        this.accountInitDataParams.threshold,
        this.salt,
      ],
    );
  }
}

export function loadSafeV141Account(
  params: SafeV141AccountInitDataParams,
): SafeV141AccountInitData {
  return new SafeV141AccountInitData(params);
}
