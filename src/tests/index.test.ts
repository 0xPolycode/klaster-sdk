import {
  buildMultichainReadonlyClient,
  initKlaster,
  klasterNodeHost,
} from "../index";
import { loadBicoV2Account } from "../accounts/account-vendors/biconomy.account";
import { loadSafeV141Account } from "../accounts/account-vendors/safe.account";
import {
  baseSepolia,
  sepolia,
} from "viem/chains";
import { formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// const mockAddr = "0x063B3184a74C510b5c6f5bBd122CC19689E0c706";

// async function prepareSDK(provider: "bico" | "safe") {
//   if (provider === "bico") {
//     return await initKlaster({
//       accountInitData: loadBicoV2Account({
//         owner: mockAddr,
//       }),
//       nodeUrl: klasterNodeHost.default,
//     });
//   } else {
//     return await initKlaster({
//       accountInitData: loadSafeV141Account({
//         signers: [mockAddr],
//         threshold: 1n,
//       }),
//       nodeUrl: klasterNodeHost.default,
//     });
//   }
// }

// describe("Should initialize SDK with an account provider", () => {
//   test("Safe provider", async () => {
//     const sdk = await prepareSDK("safe");
//     expect(sdk.account.getAddress(sepolia.id)).toEqual(
//       sdk.account.getAddress(baseSepolia.id),
//     );
//   });

//   test("Biconomy provider", async () => {
//     const sdk = await prepareSDK("bico");
//     console.log(sdk.account.getAddress(optimism.id));
//     expect(sdk.account.getAddress(optimism.id)).toEqual(
//       sdk.account.getAddress(base.id),
//     );
//   });
// });

// describe("Should encode an iTx and get a quote", () => {
//   test("Safe provider", async () => {
//     const sdk = await prepareSDK("safe");
//     const iTx = buildItx({
//       steps: [
//         singleTx(baseSepolia.id, {
//           gasLimit: BigInt(100000),
//           to: zeroAddress,
//           value: 0n,
//         }),
//       ],
//       feeTx: {
//         chainId: baseSepolia.id,
//         token: zeroAddress,
//       },
//     });

//     const quote = await sdk.getQuote(iTx);
//     expect(quote.itxHash).not.toBeFalsy();
//   });

//   test("Biconomy provider", async () => {
//     const sdk = await prepareSDK("bico");
//     const iTx = buildItx({
//       steps: [
//         singleTx(optimism.id, {
//           gasLimit: 10000n,
//           to: zeroAddress,
//           value: 0n,
//         }),
//       ],
//       feeTx: sdk.encodePaymentFee(optimism.id, "USDC"),
//     });

//     const quote = await sdk.getQuote(iTx);
//     expect(quote.itxHash).toBeTruthy();
//   });
// });

// describe("Should fetch unified balance", () => {
//   test("Multichain account", async () => {
//     const mcClient = buildMultichainReadonlyClient(
//       [optimism, arbitrum, polygon, base].map((x) => {
//         return {
//           chainId: x.id,
//           rpcUrl: x.rpcUrls.default.http[0],
//         };
//       }),
//     );

//     const sdk = await prepareSDK("bico");

//     const unified = await mcClient.getUnifiedErc20Balance({
//       tokenMapping: mcUSDC.filter((x) =>
//         mcClient.chainsRpcInfo.map((y) => y.chainId).includes(x.chainId),
//       ),
//       account: sdk.account,
//     });

//     expect(unified.balance).toBeGreaterThan(0n);
//   });
// });

// describe("Test", () => {
//   test("Safe execute testnet", async () => {
//     const sendETH = rawTx({
//       gasLimit: 75000n,
//       to: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
//       value: parseEther("0.001"),
//     });
//     const acc = privateKeyToAccount(
//       "0x1acf95aa64c43141d16cfe9214331a6c222ea94507fc0e3e51cd890aedc6ff5e",
//     );

//     console.log(`Signer address: ${acc.address}`);
//     const sdk = await initKlaster({
//       accountInitData: loadSafeV141Account({
//         signers: [acc.address],
//         threshold: 1n,
//       }),
//       nodeUrl: klasterNodeHost.default,
//     });

//     const iTx = buildItx({
//       steps: [singleTx(sepolia.id, sendETH)],
//       feeTx: {
//         chainId: sepolia.id,
//         token: zeroAddress,
//       },
//     });

//     const quote = await sdk.getQuote(iTx);

//     console.dir(quote, {
//       depth: null,
//     });

//     console.log("NONCE: ", quote.userOps[0].userOp.nonce);
//     const publicClient = createPublicClient({
//       transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
//       chain: sepolia,
//     });

//     const balance = await publicClient.getBalance({
//       address: quote.userOps[0].userOp.sender,
//     });

//     console.log(`Balance: ${formatEther(balance)}`);
//     console.log(`Address: ${quote.userOps[0].userOp.sender}`);
//     console.log(`Cost: ${JSON.stringify(quote.paymentInfo)}`);

//     const signed = await acc.signMessage({
//       message: {
//         raw: quote.itxHash,
//       },
//     });

//     try {
//       const res = await sdk.execute(quote, signed);
//       console.log(res.itxHash);
//     } catch (e) {
//       console.log(e);
//     }
//   });
// });


describe("Get native balance", () => {
  test("Unified", async () => {
    const mcRPC = buildMultichainReadonlyClient(
      [sepolia, baseSepolia].map(x => {
        return {
          chainId: x.id,
          rpcUrl: x.rpcUrls.default.http[0]
        }
      })
    )

    const acc = privateKeyToAccount(
      "0x1acf95aa64c43141d16cfe9214331a6c222ea94507fc0e3e51cd890aedc6ff5e",
    );

    const sdk = await initKlaster({
      accountInitData: loadSafeV141Account({
        signers: [
          acc.address
        ],
        threshold: 1n
      }),
      nodeUrl: klasterNodeHost.default
    })

    const mcAcc = sdk.account

    const res = await mcRPC.getUnifiedNativeBalance({
      account: mcAcc
    })

    console.log(formatEther(res))
    expect(res).not.toEqual(0)

  })
})