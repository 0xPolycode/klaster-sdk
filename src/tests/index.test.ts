import { arbitrum, avalanche, base, optimism, polygon } from "viem/chains";
import {
  buildMultichainReadonlyClient,
  MultichainClient,
} from "../utils/chains.service";
import { buildTokenMapping, deployment, getTokenAddressForChainId } from "../utils/token-mapping.service";
import {
  batchTx,
  buildItx,
  calculateMultibridgeData,
  encodeApproveTx,
  initKlaster,
  klasterNodeHost,
  KlasterSDK,
  MultichainTokenMapping,
  rawTx,
  SaltUtil,
  singleTx,
  UnifiedBalanceResult,
} from "..";
import { encodeFunctionData, erc20Abi, parseUnits, zeroAddress } from "viem";

async function initKlasterSDK() {
  const client = await initKlaster({
    masterAddress: "0x063B3184a74C510b5c6f5bBd122CC19689E0c706",
    nodeUrl: klasterNodeHost.default,
  });
  return client;
}

function initMultichainReadonlyClient() {
  return buildMultichainReadonlyClient(
    [optimism, base, polygon, arbitrum].map((x) => {
      return {
        chainId: x.id,
        rpcUrl: x.rpcUrls.default.http[0],
      };
    }),
  );
}

function createUSDCMapping() {
  return buildTokenMapping([
    deployment(optimism.id, "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"),
    deployment(base.id, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"),
    deployment(polygon.id, "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"),
    deployment(arbitrum.id, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"),
  ]);
}

async function getUnifiedBalance(
  mcClient: MultichainClient,
  mcUSDC: MultichainTokenMapping,
) {
  return await mcClient.getUnifiedErc20Balance({
    tokenMapping: mcUSDC,
    address: "0x063B3184a74C510b5c6f5bBd122CC19689E0c706",
  });
}

async function initPrerequisites() {
  const sdk = await initKlasterSDK();
  const mcClient = initMultichainReadonlyClient();
  const mcUSDC = createUSDCMapping();
  return {
    sdk,
    mcClient,
    mcUSDC,
  };
}

function prepareMockBalance(
  decimals: number,
  balances: {
    chainId: number;
    amount: string;
  }[],
): UnifiedBalanceResult {
  // Add up all the balances
  const totalBalance = balances
    .map((x) => parseUnits(x.amount, decimals))
    .reduce((curr, acc) => curr + acc);

  return {
    balance: totalBalance,
    decimals: decimals,
    breakdown: balances.map((balance) => {
      return {
        amount: parseUnits(balance.amount, decimals),
        chainId: balance.chainId,
      };
    }),
  };
}

async function prepareMultibridgeData(
  mockBalance: UnifiedBalanceResult,
  requiredOnDestination: string,
  destinationChainId: number,
) {
  const { sdk, mcClient, mcUSDC } = await initPrerequisites();
  return await calculateMultibridgeData({
    account: sdk.account.address,
    amount: parseUnits(requiredOnDestination, mockBalance.decimals),
    client: mcClient,
    destinationChainId: destinationChainId,
    tokenMapping: mcUSDC,
    unifiedBalance: mockBalance,
    encodingFunction: async (data) => {
      const singleChainReceived = data.amount;
      return {
        receivedOnDestination: singleChainReceived,
        txBatch: batchTx(data.sourceChainId, [
          rawTx({
            to: data.sourceToken,
            gasLimit: BigInt(75000),
          }),
        ]),
      };
    },
  });
}

type Prerequisites = {
  sdk: KlasterSDK;
  mcClient: MultichainClient;
  mcUSDC: MultichainTokenMapping;
};

describe("Fetch balance from mainnet blockchain", () => {
  let prerequisites: Prerequisites;

  beforeAll(async () => {
    prerequisites = await initPrerequisites();
    return;
  });

  test("Should: Get unified balance from all blockchains", async () => {
    const balance = await getUnifiedBalance(
      prerequisites.mcClient,
      prerequisites.mcUSDC,
    );
    expect(balance.balance).toBeGreaterThan(BigInt(0));
  });

  test(`Should: Fail getting unified balance from blockchains. Mismatch between tokenMapping and readonlyRpc provider`, async () => {
      await expect(async () => {
        const mapping = prerequisites.mcUSDC.concat([
          deployment(avalanche.id, "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"),
        ]);
        return await getUnifiedBalance(prerequisites.mcClient, mapping);
      }).rejects.toThrow();
  });

  test(`Should: Fail getting balance from a non-ERC20 token address`, async () => {
    await expect(async () => {
      const mapping: MultichainTokenMapping = prerequisites.mcUSDC.map(x => {
        return {...x, address: '0x063B3184a74C510b5c6f5bBd122CC19689E0c706'}
      })
      return await getUnifiedBalance(prerequisites.mcClient, mapping)
    }).rejects.toThrow()
  })
});

describe("Encode multibridge data", () => {
  const mockDecimals = 6;
  const mockBalances = [
    { amount: "3", chainId: optimism.id },
    { amount: "0", chainId: base.id },
    { amount: "5", chainId: polygon.id },
    { amount: "2", chainId: arbitrum.id },
  ];
  const mockBalance = prepareMockBalance(mockDecimals, mockBalances);

  test("Data properly populated", async () => {
    // Check whether decimals has been properly populated
    expect(mockBalance.decimals).toEqual(mockDecimals);

    // Check whether the mock balances array has been properly populated
    mockBalances.forEach((balance) =>
      expect(
        mockBalance.breakdown.find((x) => x.chainId === balance.chainId)
          ?.amount,
      ).toEqual(parseUnits(balance.amount, mockBalance.decimals)),
    );
  });

  test("Should: Have one bridging step. Dest + 1 more chain needed for action.", async () => {
    const data = await prepareMultibridgeData(mockBalance, "7", polygon.id);
    expect(data.steps.length).toEqual(1);
  });

  test("Should: Have zero bridging steps. Dest amount enough for action", async () => {
    const data = await prepareMultibridgeData(mockBalance, "4", polygon.id);
    expect(data.steps.length).toEqual(0);
  });

  test("Should: Have two bridging steps. Dest + 2 chains needed for action.", async () => {
    const data = await prepareMultibridgeData(mockBalance, "9", polygon.id);
    expect(data.steps.length).toEqual(2);
  });

  test("Should: Throw exception, not possible to encode multibridge data", async () => {
    await expect(async () => {
      return await prepareMultibridgeData(mockBalance, "20", polygon.id);
    }).rejects.toThrow();
  });

  test("Should: Genearte zero bridging for zero amount needed on dest chain", async() => {
    const data = await prepareMultibridgeData(mockBalance, "0", base.id)
    expect(data.steps.length).toEqual(0)
  })

  test("Should: Fail when receiving a negative number for the destination amount", async() => {
    await expect(async () => {
      return await prepareMultibridgeData(mockBalance, "-1", base.id)
    }).rejects.toThrow()
  })
});

describe("Build iTx and get quote", () => {

  let prerequisites: Prerequisites

  beforeAll(async () => {
    prerequisites = await initPrerequisites()
  })

  test("Should: Be able to build an iTx with valid paymentInfo",async () => {
    const iTx = buildItx({
      steps: [
        singleTx(optimism.id, rawTx({
          gasLimit: BigInt(1000),
          to: zeroAddress,
          value: BigInt(0)
        }))
      ],
      feeTx: prerequisites.sdk.buildFeeTx('USDC', optimism.id)
    })
    expect(iTx.steps.length).toEqual(1)
    expect(iTx.feeTx.token).toEqual(getTokenAddressForChainId(prerequisites.mcUSDC, optimism.id))
  })

  test("Should: Be able to get a quote from the Klaster node", async () => {
    const emptyTx = rawTx({
      gasLimit: BigInt(1000),
      to: zeroAddress,
      value: BigInt(0)
    })
    const iTx = buildItx({
      steps: [
        singleTx(optimism.id, emptyTx),
        batchTx(base.id, [emptyTx, emptyTx])
      ],
      feeTx: prerequisites.sdk.buildFeeTx('USDC', optimism.id)
    })
    const quote = await prerequisites.sdk.getQuote(iTx)
    expect(quote.itxHash).not.toBeUndefined()
    expect(quote.userOps.length).toBeGreaterThan(0)
  })

  test("Should: Succeed even for impossible tx", async() => {
    const impossibleTx = rawTx({
      gasLimit: BigInt(1000),
      to: zeroAddress,
      value: parseUnits("10000", 18)
    })
    const iTx = buildItx({
      steps: [singleTx(optimism.id, impossibleTx)],
      feeTx: prerequisites.sdk.buildFeeTx('USDC', optimism.id)
    })
    const quote = await prerequisites.sdk.getQuote(iTx)
    expect(quote.itxHash).not.toBeUndefined()
    expect(quote.userOps.length).toBeGreaterThan(0)
  })

  test("Should: Fail with malformed params for quote", async() => {
    await expect(async() => {
      const sdk = prerequisites.sdk
      const iTx = buildItx({
        steps: [singleTx(374, rawTx({
          gasLimit: BigInt(1000),
          to: '0xMalformedAddress',
          data: '0xWrongData',
          value: BigInt(-23)
        }))],
        feeTx: {
          chainId: 237,
          masterWallet: '0xNonWallet',
          salt: "",
          token: "0xWrongToken"
        }
      })
      await sdk.getQuote(iTx)
    })
  })
  
})

describe("Change derived account by changing masterWallet and salt", () => {

  let prerequisites: Prerequisites

  beforeAll(async () => {
    prerequisites = await initPrerequisites()
  })

  test("Should: Derive different account after changing masterWallet", async () => {
    const sdk = prerequisites.sdk
    const accountBefore = sdk.account
    await sdk.changeMasterAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913')
    const accountAfter = sdk.account
    expect(accountBefore.address).not.toEqual(accountAfter.address)
  })

  test("Should: Derive different account after changing salt", async () => {
    const sdk = prerequisites.sdk
    const accountBefore = sdk.account
    await sdk.changeAccountSalt(SaltUtil.accountAt(20))
    const accountAfter = sdk.account
    expect(accountBefore.address).not.toEqual(accountAfter.address)
  })
})

describe("Utility encode ERC20 approve fucnction", () => {
  let prerequisites: Prerequisites

  beforeAll(async () => {
    prerequisites = await initPrerequisites()
  })

  test("Should: Encode proper tx structure for approve erc20 tx", async () => {
    const token = prerequisites.mcUSDC[0]
    const recipient = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    const amount = parseUnits("1", 6)
    const encodedKlaster = encodeApproveTx({
      tokenAddress: token.address,
      amount: amount,
      recipient: recipient
    })

    const encodedViem = encodeFunctionData({
      abi: erc20Abi,
      functionName: 'approve',
      args: [recipient, amount]
    })

    expect(encodedKlaster.data).toEqual(encodedViem)
    expect(encodedKlaster.value).toEqual(BigInt(0))
  })
})
