import { Address } from "viem";
import { KlasterNodeService } from "./node.service";
import {
  ApiPaymentData,
  ExecuteResponse,
  InterchainTransaction,
  MultichainAccount,
  QuoteResponse,
  RawTransaction,
} from "./types";
import { EncodingService } from "./utils/encoding.service";
import { SaltUtil } from "./utils/salt.service";
import { buildTransferERC20FromEoaTx } from "./utils/utils.service";
import { PaymentTokenSymbol, resolveToken } from "./utils/token-resolver.service";

export * from "./types";
export * from "./utils/encoding.service";
export * from "./utils/itx.service";
export * from "./utils/salt.service";
export * from "./utils/token-resolver.service";
export * from "./utils/utils.service";
export * from "./utils/unified-balance.service"

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
 */ export function initKlaster(config: Config) {
  return new KlasterSDK(config);
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

  constructor(config: Config) {
    this.nodeService = new KlasterNodeService(config.nodeUrl);
    this.masterAddress = config.masterAddress;
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
  changeMasterAddress(wallet: Address) {
    this.masterAddress = wallet;
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
  changeAccountSalt(salt: string) {
    this.activeAccountSalt = salt;
  }

  /**
   * Fetches the multichain ERC4337 account derived from the current masterWallet and salt.
   *
   * This asynchronous function retrieves the multichain smart contract account that is
   * deterministically derived using the `masterWallet` and `salt` parameters set during
   * SDK initialization or subsequently updated.
   *
   * The derived account is compliant with the ERC4337 standard for account abstraction
   * and can be used across multiple blockchain networks.
   *
   * @async
   * @returns {Promise<MultichainAccount>} A promise that resolves to a MultichainAccount object.
   *   The object contains:
   *   - salt: The current active account salt used for derivation.
   *   - address: The derived multichain smart contract account address.
   *
   * @throws {Error} May throw an error if there's an issue communicating with the node service
   *   or if the account derivation fails.
   *
   * @example
   * // Assuming 'klasterSDK' is an initialized instance of the Klaster SDK
   * try {
   *   const account = await klasterSDK.getMultichainAccount();
   *   console.log('Derived account:', account.address);
   *   console.log('Used salt:', account.salt);
   * } catch (error) {
   *   console.error('Failed to fetch multichain account:', error);
   * }
   *
   * @note This function uses the current values of `masterWallet` and `salt`. If you need
   * to derive a different account, use `changeMasterAddress()` or `changeAccountSalt()`
   * before calling this function.
   *
   * @see {@link changeMasterAddress} - To change the master wallet address.
   * @see {@link changeAccountSalt} - To change the account salt.
   */
  async getMultichainAccount(): Promise<MultichainAccount> {
    const multichainAccount = await this.nodeService.getWallet(
      this.masterAddress,
      this.activeAccountSalt,
    );
    return {
      salt: this.activeAccountSalt,
      address: multichainAccount,
    };
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
   * @returns {Promise<ApiPaymentData>} A promise that resolves to an ApiPaymentData object containing:
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
  async encodeTxFee(paymentToken: PaymentTokenSymbol, chainId: number): Promise<ApiPaymentData> {
    const account = await this.getMultichainAccount();

    const tokenInfo = resolveToken(paymentToken, chainId)

    return {
      chainId: 10,
      masterWallet: this.masterAddress,
      salt: account.salt,
      token: tokenInfo.address,
    };
  }

  /**
   * Fetches a quote for the interchain transaction (iTx).
   *
   * This asynchronous function processes an InterchainTransaction object to obtain a quote
   * from the Klaster Node. The quote contains the full iTx information as well as the
   * required payment information for executing the transaction.
   *
   * @async
   * @param {InterchainTransaction} itx - The full Interchain Transaction object. This object
   *        should contain an array of actions and payment information.
   *
   * @returns {Promise<QuoteResponse>} A promise that resolves to a QuoteResponse object
   *          containing the full iTx information and required payment details.
   *
   * @throws {Error} Throws an error if the actions array in the iTx is empty.
   * @throws {Error} May throw errors from the EncodingService or the node service if there
   *                 are issues encoding the actions or fetching the quote.
   *
   * @example
   * const itx = {
   *   actions: [
   *     {
   *       txs: [{ to: '0x...', value: 1000n, data: '0x...', gasLimit: 21000n }],
   *       chainId: 1
   *     }
   *   ],
   *   paymentInfo: { ... } // ApiPaymentData object
   * };
   *
   * try {
   *   const quote = await klasterSDK.getQuote(itx);
   *   console.log('Received quote:', quote);
   * } catch (error) {
   *   console.error('Failed to get quote:', error);
   * }
   *
   * @note This function uses the current values of `masterAddress` and `activeAccountSalt`
   *       from the SDK instance for encoding user operations.
   *
   * @see {@link EncodingService.encodeUserOpCall} - Used for encoding single transaction actions.
   * @see {@link EncodingService.encodeBatchCall} - Used for encoding multi-transaction actions.
   */
  async getQuote(itx: InterchainTransaction) {
    const actions = itx.actions;
    if (actions.length === 0) {
      throw Error(`An iTx cannot have an empty actions array.`);
    }

    const userOps = actions.map((action) => {
      return action.txs.length === 1
        ? EncodingService.encodeUserOpCall(
            action.txs[0],
            action.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          )
        : EncodingService.encodeBatchCall(
            action.txs,
            action.chainId,
            this.masterAddress,
            this.activeAccountSalt,
          );
    });

    return await this.nodeService.getQuote(userOps, itx.paymentInfo);
  }

  /**
   * Executes the Interchain Transaction (iTx) based on a quote response and signed hash.
   *
   * This function triggers the execution of an iTx on the Klaster network. Once called
   * with a valid signed hash, the execution becomes irreversible.
   *
   * @async
   * @param {QuoteResponse} response - The response object returned from calling the `quote`
   *                                   endpoint. This contains necessary information for execution.
   * @param {string} signedHash - The iTx hash, signed by the wallet using the personalSign method.
   *
   * @returns {Promise<ExecuteResponse>} A promise that resolves to an ExecuteResponse object
   *                                     containing the iTx hash of the executed transaction.
   *
   * @throws {Error} May throw an error if the execution fails, if the signed hash is invalid,
   *                 or if there are network issues.
   *
   * @remarks
   * IMPORTANT: The hash must be signed using the personalSign method.
   * If you encounter an "invalid merkle hash" error, ensure you're using the correct
   * signing method. Some libraries may default to a different signing scheme.
   *
   * @example
   * try {
   *   const quoteResponse = await klasterSDK.getQuote(...);
   *   const signedHash = await wallet.personalSign(quoteResponse.hash);
   *   const executeResponse = await klasterSDK.execute(quoteResponse, signedHash);
   *   console.log('Execution successful. iTx hash:', executeResponse.iTxHash);
   * } catch (error) {
   *   console.error('Execution failed:', error);
   * }
   *
   * @see {@link getQuote} - Used to obtain the necessary QuoteResponse.
   * @see {@link https://eips.ethereum.org/EIPS/eip-191} - EIP-191 for signed data standard.
   */
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

  /**
   * Transfers ERC20 tokens to the multichain smart contract account and
   * executes the desired actions across multiple blockchains.
   *
   * This function performs two main operations:
   * 1. Transfers ERC20 tokens to the smart contract account.
   * 2. Executes an interchain transaction (iTx) after the transfer is confirmed.
   *
   * @async
   * @param {Object} params - The parameters object containing transfer and execution instructions.
   * @param {Object} params.transferToSmartAccount - Instructions for transferring ERC20 tokens to the smart account.
   * @param {Address} params.transferToSmartAccount.tokenToTransfer - The address of the ERC20 token to transfer.
   * @param {bigint} params.transferToSmartAccount.amountToTransfer - The amount of tokens to transfer.
   * @param {number} params.transferToSmartAccount.chainId - The ID of the blockchain where the transfer will occur.
   * @param {Function} params.transferToSmartAccount.executeTxAction - A function to execute the transfer transaction.
   *        It should take a RawTransaction object and return a Promise that resolves when the transaction is accepted.
   *
   * @param {Object} params.executeItx - Instructions for executing the interchain transaction.
   * @param {InterchainTransaction} params.executeItx.iTx - The interchain transaction object to be executed.
   * @param {Function} params.executeItx.signItxHashAction - A function to sign the iTx hash.
   *        It should take an Address (the iTx hash) and return a Promise resolving to the signed hash string.
   *
   * @returns {Promise<ExecuteResponse>} A promise that resolves to the execution response of the iTx.
   *
   * @throws {Error} May throw errors during the token transfer, quote fetching, signing, or execution phases.
   *
   * @example
   * const result = await klasterSDK.transferAndExecute({
   *   transferToSmartAccount: {
   *     tokenToTransfer: '0x...',  // ERC20 token address
   *     amountToTransfer: BigInt(1000000),  // Amount in smallest unit
   *     chainId: 1,  // Ethereum mainnet
   *     executeTxAction: async (tx) => {
   *       // Implement your transaction execution logic here
   *       await yourProvider.sendTransaction(tx);
   *     }
   *   },
   *   executeItx: {
   *     iTx: {
   *       // Your interchain transaction object
   *     },
   *     signItxHashAction: async (hash) => {
   *       // Implement your signing logic here
   *       return await yourSigner.signMessage(hash);
   *     }
   *   }
   * });
   *
   * @remarks
   * - The `executeTxAction` function should handle the actual sending of the transfer transaction to the blockchain.
   *   Consult the Klaster documentation for details on implementing this with your specific provider.
   * - The `signItxHashAction` function should handle the signing of the iTx hash.
   *   Ensure you're using the correct signing method as specified in the Klaster documentation.
   * - This function will wait for the transfer transaction to be accepted before proceeding with the iTx execution.
   *
   * @see Klaster documentation for detailed information on implementing `executeTxAction` and `signItxHashAction`.
   * @see {@link buildTransferERC20FromEoaTx} - Used internally to construct the transfer transaction.
   * @see {@link getQuote} - Used internally to fetch the quote for the iTx.
   * @see {@link execute} - Used internally to execute the iTx.
   */
  async transferAndExecute(params: {
    transferToSmartAccount: {
      tokenToTransfer: Address;
      amountToTransfer: bigint;
      chainId: number;
      executeTxAction: (tx: RawTransaction) => Promise<void>;
    };
    executeItx: {
      iTx: InterchainTransaction;
      signItxHashAction: (hash: Address) => Promise<string>;
    };
  }) {
    const multichainAcc = await this.getMultichainAccount();
    const transferTx = buildTransferERC20FromEoaTx({
      token: params.transferToSmartAccount.tokenToTransfer,
      amount: params.transferToSmartAccount.amountToTransfer,
      chainId: params.transferToSmartAccount.chainId,
      recipient: multichainAcc.address,
    });
    await params.transferToSmartAccount.executeTxAction(transferTx);
    const quote = await this.getQuote(params.executeItx.iTx);
    const signed = await params.executeItx.signItxHashAction(quote.itxHash);
    return await this.execute(quote, signed);
  }
}
