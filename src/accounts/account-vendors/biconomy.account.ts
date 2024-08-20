import { Address, encodeAbiParameters, Hex, parseAbiParameters, stringToBytes, zeroAddress } from "viem";
import { AccountInitData } from "../account.service";

export type BicoV2AccountInitParams = {
  owner: Address
}

export class BiconomyV2AccountInitData extends AccountInitData<{ owner: Address }> {
  accountProviderId = "BICO_V2";

  encodeAccountCreationFactoryData(): Hex {
    return encodeAbiParameters(
      parseAbiParameters(`address owner, bytes32 salt`),
      [
        this.accountInitDataParams.owner,
        this.salt
      ],
    );
  }
}

export function loadBicoV2Account({
  owner,
  salt
}: {
  owner: Address,
  salt?: string
}): BiconomyV2AccountInitData {
  return salt ? new BiconomyV2AccountInitData({
    owner: owner,
    salt: salt
  }) :
    new BiconomyV2AccountInitData({
      owner: owner
    })
}
