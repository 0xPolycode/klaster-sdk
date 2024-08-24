import {
  buildItx,
  buildMultichainReadonlyClient,
  encodeBridgingOps,
  initKlaster,
  klasterNodeHost,
  mcUSDC,
  singleTx,
} from "../index";
import { loadBicoV2Account } from "../accounts/account-vendors/biconomy.account";
import { loadSafeV141Account } from "../accounts/account-vendors/safe.account";
import {
  arbitrum,
  base,
  baseSepolia,
  optimism,
  polygon,
  scroll,
  sepolia,
} from "viem/chains";
import { zeroAddress } from "viem";

const mockAddr = "0x063B3184a74C510b5c6f5bBd122CC19689E0c706";

async function prepareSDK(provider: "bico" | "safe") {
  if (provider === "bico") {
    return await initKlaster({
      accountInitData: loadBicoV2Account({
        owner: mockAddr,
      }),
      nodeUrl: klasterNodeHost.default,
    });
  } else {
    return await initKlaster({
      accountInitData: loadSafeV141Account({
        signers: [mockAddr],
        threshold: 1n,
      }),
      nodeUrl: klasterNodeHost.default,
    });
  }
}

describe("Should initialize SDK with an account provider", () => {
  test("Safe provider", async () => {
    const sdk = await prepareSDK("safe");
    expect(sdk.account.getAddress(sepolia.id)).toEqual(
      sdk.account.getAddress(baseSepolia.id),
    );
  });

  test("Biconomy provider", async () => {
    const sdk = await prepareSDK("bico");
    console.log(sdk.account.getAddress(optimism.id))
    expect(sdk.account.getAddress(optimism.id)).toEqual(
      sdk.account.getAddress(base.id),
    );
  });
});

describe("Should encode an iTx and get a quote", () => {
  test("Safe provider", async () => {
    const sdk = await prepareSDK("safe");
    const iTx = buildItx({
      steps: [
        singleTx(baseSepolia.id, {
          gasLimit: BigInt(100000),
          to: zeroAddress,
          value: 0n,
        }),
      ],
      feeTx: {
        chainId: baseSepolia.id,
        token: zeroAddress,
      },
    });

    const quote = await sdk.getQuote(iTx);
    expect(quote.itxHash).not.toBeFalsy();
  });

  test("Biconomy provider", async () => {
    const sdk = await prepareSDK("bico");
    const iTx = buildItx({
      steps: [
        singleTx(optimism.id, {
          gasLimit: 10000n,
          to: zeroAddress,
          value: 0n,
        }),
      ],
      feeTx: sdk.encodePaymentFee(optimism.id, "USDC"),
    });

    const quote = await sdk.getQuote(iTx);
    expect(quote.itxHash).toBeTruthy();
  });
});

describe("Should fetch unified balance", () => {
  test("Multichain account", async () => {
    
    const mcClient = buildMultichainReadonlyClient(
      [optimism, arbitrum, polygon, base].map(x => {
        return {
          chainId: x.id,
          rpcUrl: x.rpcUrls.default.http[0]
        }
      })
    )

    const sdk = await prepareSDK("bico");

    const unified = await mcClient.getUnifiedErc20Balance({
      tokenMapping: mcUSDC.filter(x => 
        mcClient.chainsRpcInfo.map(y => y.chainId).includes(x.chainId)
      ),
      account: sdk.account,
    });

    expect(unified.balance).toBeGreaterThan(0n)
  });
});
