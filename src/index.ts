import { Address } from "viem";
import { KlasterNodeService } from "./node.service";
import {
  TxFeeParams,
  ExecuteResponse,
  InterchainTransaction,
  MultichainAccount,
  QuoteResponse,
  RawTransaction,
} from "./types";
import { EncodingService } from "./utils/encoding.service";
import { SaltUtil } from "./utils/salt.service";
import { PaymentTokenSymbol, resolveToken } from "./utils/token-utils/token-resolver.service";

export * from "./types";
export * from "./utils/encoding.service";
export * from "./utils/itx.service";
export * from "./utils/salt.service";
export * from "./utils/token-utils/token-resolver.service";
export * from './utils/token-utils/token-utilization-strategy.service'
export * from './utils/token-utils/erc20-encoder.service'
export * from './utils/constants/node-url.constants'
export * from './utils/chains.service'
export * from './utils/token-mapping.service'
export * from './utils/constants/common-tokens.constants'

export { Address } from 'viem'

/**
 * Configuration options for initializing the Klaster SDK.
 *
 * @typedef {Object} Config
 * @property {string} nodeUrl - The URL of the Klaster Node to connect to.
 *   This should be a valid HTTP or HTTPS URL pointing to a running Klaster Node instance.
 * @property {Address} masterAddress - The Ethereum address of the master wallet.
 *   This address is used as the basis for deriving Smart Contract Account addresses
 *   and for signing transactions within the Klaster ecosystem.
 */
export type Config = {
  nodeUrl: string;
  masterAddress: Address;
};

/**
 * Initializes the Klaster SDK with the provided configuration.
 *
 * This function serves as the entry point for using the Klaster SDK. It creates and
 * returns a new instance of the KlasterSDK class, configured with the provided options.
 *
 * @param {Config} config - The configuration options for the Klaster SDK.
 * @returns {KlasterSDK} A new instance of the KlasterSDK, ready for use.
 *
 * @example
 * import { initKlaster, Config } from 'klaster-sdk';
 *
 * const config: Config = {
 *   nodeUrl: 'https://klaster-node.example.com',
 *   masterAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
 * };
 *
 * const klasterSDK = initKlaster(config);
 *
 * // Now you can use klasterSDK to interact with the Klaster ecosystem
 *
 * @throws {Error} Throws an error if the provided configuration is invalid or if
 *   the SDK fails to initialize for any reason.
 */ 
export async function initKlaster(config: Config) {
  return await KlasterSDK.init(config)
}

/**
 * KlasterSDK creates an instance of the SDK used to communicate with
 * the Klaster protocol. It offers typed information for all the types 
 * used to communicate with the protocol, as well as utility functions
 * for encoding tokens, transactions and accounts.
 */
export class KlasterSDK {
  private nodeService: KlasterNodeService;
  activeAccountSalt = SaltUtil.firstAccount();

  masterAddress: Address;

  // Multichain account can't be accessed until it's set since the constructor is set to private
  // and the init function is async and will not return a value until a multichain account is set.
  account!: MultichainAccount

  private constructor(config: Config) {
    this.nodeService = new KlasterNodeService(config.nodeUrl);
    this.masterAddress = config.masterAddress;
  }

  public static async init(config: Config) {
    const sdk = new KlasterSDK(config)
    await sdk.initMultichainAccount()
    return sdk
  }

  private async initMultichainAccount() {
    const address = await this.nodeService.getWallet(this.masterAddress, this.activeAccountSalt)
    this.account = {
      address: address,
      salt: this.activeAccountSalt
    }
  }

  /**
   * Changes the master wallet address used for deriving ERC4337 multichain smart accounts.
   *
   * This function updates the `masterAddress` parameter of the SDK instance. The master address,
   * in combination with a salt value, is used to deterministically derive ERC4337 compliant
   * multichain smart contract accounts. Changing this address will result in deriving
   * different smart contract accounts for all subsequent operations.
   *
   * @param {Address} wallet - The new master wallet address to be used for account derivation.
   *                           This should be a valid Ethereum address.
   *
   * @throws {Error} May throw an error if the provided address is invalid.
   *
   * @example
   * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
   * klasterSDK.changeMasterAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
   *
   * @note Changing the master address will affect all future account derivations and operations.
   * It does not affect previously derived accounts or ongoing transactions. Ensure you understand
   * the implications of changing this address in the context of your application.
   *
   * @see For more information on ERC4337 and account abstraction, visit:
   * {@link https://eips.ethereum.org/EIPS/eip-4337|EIP-4337: Account Abstraction}
   */
  async changeMasterAddress(wallet: Address) {
    this.masterAddress = wallet;
    this.account = {
      address: await this.nodeService.getWallet(this.masterAddress, this.activeAccountSalt),
      salt: this.activeAccountSalt
    }
  }

  /**
   * Changes the salt value used for deriving ERC4337 multichain smart accounts.
   *
   * This function updates the `activeAccountSalt` parameter of the SDK instance. The salt,
   * in combination with the connected Externally Owned Account (EOA), is used to
   * deterministically derive ERC4337 compliant multichain smart contract accounts.
   * Changing this salt will result in deriving a different smart contract account
   * for all subsequent operations.
   *
   * @param {string} salt - The new salt value to be used for account derivation.
   *                        This should be a unique string that, when combined with
   *                        the EOA address, produces a unique smart account address.
   *
   *
   * @example
   * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
   * klasterSDK.changeAccountSalt('uniqueSaltValue123');
   *
   * @note Changing the account salt will affect all future account derivations and operations.
   * It does not affect previously derived accounts or ongoing transactions. Ensure you understand
   * the implications of changing this salt in the context of your application.
   *
   * @see For more information on ERC4337 and account abstraction, visit:
   * {@link https://eips.ethereum.org/EIPS/eip-4337|EIP-4337: Account Abstraction}
   */
  async changeAccountSalt(salt: string) {
    this.activeAccountSalt = salt;
    this.account = {
      address: await this.nodeService.getWallet(this.masterAddress, this.activeAccountSalt),
      salt: this.activeAccountSalt
    }
  }


  /**
   * A helper function that prepares an ApiPaymentData object for transaction fee payments.
   *
   * This asynchronous function simplifies the process of creating an ApiPaymentData object,
   * which is used to specify how transaction fees should be paid on the Klaster Protocol.
   * It combines information from the multichain account, the current SDK configuration,
   * and the specified payment token to create a complete payment data structure.
   *
   * @async
   * @param {PaymentTokenSymbol} paymentToken - A string representing the symbol of the token being used for
   *                                            payments. e.g. ETH, USDC, MATIC, WSTETH, ...
   * 
   * @param {number} chainId - The chainId of the chain on which you wish to execute the payment.
   *
   * @returns {Promise<TxFeeParams>} A promise that resolves to an ApiPaymentData object containing:
   *   - chainId: The chain ID where the payment will be processed
   *   - masterWallet: The address of the master wallet used in the SDK.
   *   - salt: The salt used for deriving the multichain account.
   *   - token: The address of the token to be used for payment.
   *
   * @throws {Error} May throw an error if:
   *   - There's an issue retrieving the multichain account.
   *   - The specified payment token is not found or invalid.
   *   - Any other unexpected error occurs during the process.
   *
   * @example
   * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
   * try {
   *   const paymentData = await klasterSDK.encodeTxFee('USDC', optimism.id);
   *   console.log('Payment data:', paymentData);
   * } catch (error) {
   *   console.error('Failed to encode transaction fee:', error);
   * }
   *
   * @note This function uses the current state of the SDK, including the master wallet address.
   * Make sure these are set correctly before calling this function.
   *
   * @see {@link getMultichainAccount} - Used internally to fetch the current multichain account.
   * @see {@link getPaymentToken} - Used internally to resolve the token address from the ChainTokenPair.
   */
  buildFeeTx(paymentToken: PaymentTokenSymbol, chainId: number): TxFeeParams {
    const account = this.account

    if(!account) {
      throw Error('Invalid SDK state. Multichain account not fetched.')
    }

    const tokenInfo = resolveToken(paymentToken, chainId)

    return {
      chainId: chainId,
      masterWallet: this.masterAddress,
      salt: account.salt,
      token: tokenInfo.address,
    };
  }

  /* istanbul ignore next @preserve */
  async getQuote(itx: InterchainTransaction) {
    const batches = itx.steps;
    if (batches.length === 0) {
      throw Error(`An iTx cannot have an empty batches array.`);
    }

    const userOps = batches.map((batch) => {
      return batch.txs.length === 1
        ? EncodingService.encodeUserOpCall(
            batch.txs[0],
            batch.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          )
        : EncodingService.encodeBatchCall(
            batch.txs,
            batch.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          );
    });

    return await this.nodeService.getQuote(userOps, itx.feeTx);
  }

  /* istanbul ignore next @preserve */
  async execute(
    response: QuoteResponse,
    signedHash: string,
  ): Promise<ExecuteResponse> {
    return await this.nodeService.executeTx(response, signedHash);
  }

  /**
   * Automatically fetches a quote and executes the Interchain Transaction (iTx).
   *
   * This function streamlines the process of executing an iTx by combining the quote
   * fetching and execution steps. It automatically handles the flow of getting a quote,
   * signing the iTx hash, and executing the transaction.
   *
   * @async
   * @param {InterchainTransaction} itx - The interchain transaction object containing
   *        the transactions you wish to execute. This should include all necessary
   *        information for the iTx, such as actions and payment details.
   * @param {Function} signHash - A function to sign the iTx hash with a private key.
   *        This function should take a hash string (prefixed with '0x') and return
   *        a Promise resolving to the signed hash string.
   *
   * @returns {Promise<ExecuteResponse>} A promise that resolves to an ExecuteResponse object,
   *          containing the iTx hash of the executed transaction.
   *
   * @throws {Error} May throw errors during the quote fetching, signing, or execution phases.
   *                 These could include network errors, signing failures, or execution issues.
   *
   * @example
   * const itx = {
   *   actions: [...],  // Array of actions to be executed
   *   paymentInfo: ... // Payment information
   * };
   *
   * const signHash = async (hash) => {
   *   // Implement your signing logic here
   *   return signedHash;
   * };
   *
   * try {
   *   const result = await klasterSDK.autoExecute(itx, signHash);
   *   console.log('iTx executed successfully. Hash:', result.iTxHash);
   * } catch (error) {
   *   console.error('AutoExecute failed:', error);
   * }
   *
   * @remarks
   * - The signHash function must return a properly signed hash. Ensure you're using
   *   the correct signing method (e.g., personalSign) to avoid execution errors.
   * - This function abstracts away the separate steps of quoting and executing,
   *   making it more convenient for straightforward iTx executions.
   *
   * @see {@link getQuote} - Used internally to fetch the quote.
   * @see {@link execute} - Used internally to execute the transaction.
   */
  async autoExecute(
    itx: InterchainTransaction,
    signHash: (hash: `0x${string}`) => Promise<string>,
  ) {
    const quote = await this.getQuote(itx);
    const signedHash = await signHash(quote.itxHash);
    return await this.execute(quote, signedHash);
  }
}
