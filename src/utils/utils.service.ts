import {
  Address,
  TransactionSerializable,
  createWalletClient,
  custom,
  encodeFunctionData,
  erc20Abi,
} from "viem";
import { RawTransaction } from "../types";

/**
 * Fetches the primary Ethereum address from an injected web3 wallet provider (e.g., MetaMask).
 * 
 * This function creates a wallet client using the viem library and the injected Ethereum provider.
 * It then retrieves the list of addresses associated with the wallet and returns the first address.
 *
 * @async
 * @function fetchInjectedAddress
 * @returns {Promise<Address | undefined>} A promise that resolves to:
 *   - The primary Ethereum address (type Address) if available.
 *   - undefined if no addresses are associated with the wallet or if the wallet is locked.
 * 
 * @throws {Error} Throws an error if:
 *   - No injected Ethereum provider is detected (i.e., window.ethereum is undefined).
 *   - The user denies permission to access their accounts.
 *   - There's an issue connecting to the Ethereum network.
 * 
 * @example
 * try {
 *   const address = await fetchInjectedAddress();
 *   if (address) {
 *     console.log('Connected wallet address:', address);
 *   } else {
 *     console.log('No wallet address found or wallet is locked');
 *   }
 * } catch (error) {
 *   console.error('Error fetching wallet address:', error);
 * }
 * 
 * @requires viem
 * @see {@link https://viem.sh/docs/clients/wallet.html|Viem Wallet Client Documentation}
 * 
 * @note This function is designed to work in a browser environment and requires
 *       a web3-enabled browser with an injected Ethereum provider (like MetaMask).
 *       It will not work in a Node.js environment or browsers without an Ethereum wallet.
 */
export async function fetchInjectedAddress(): Promise<Address | undefined> {
  const client = createWalletClient({
    transport: custom((window as any).ethereum),
  });
  return (await client.getAddresses()).at(0);
}

/**
 * Signs a message using the injected Ethereum provider (e.g., MetaMask) in the browser.
 * 
 * This function uses the `personal_sign` method to create a signature with the user's
 * Ethereum account. It requires a web3-enabled browser with an injected Ethereum provider.
 *
 * @param {Address} address - The Ethereum address to sign the message with. This should
 *                            be an address that the user controls in their injected wallet.
 * @param {string} message - The message to be signed. This will be converted to UTF-8
 *                           and prefixed with "\x19Ethereum Signed Message:\n" before signing.
 *
 * @returns {Promise<string>} A promise that resolves to the signature string.
 *                            The signature is in hexadecimal format.
 *
 * @throws {Error} Throws an error if the injected Ethereum provider is not available,
 *                 if the user rejects the signature request, or if there's any other
 *                 issue during the signing process.
 *
 * @example
 * try {
 *   const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
 *   const message = 'Hello, Ethereum!';
 *   const signature = await signWithInjectedWallet(address, message);
 *   console.log('Signature:', signature);
 * } catch (error) {
 *   console.error('Error signing message:', error);
 * }
 *
 * @note This function is designed to work in a browser environment and requires
 *       a web3-enabled browser with an injected Ethereum provider (like MetaMask).
 *       It will not work in a Node.js environment or browsers without an Ethereum wallet.
 */
export async function signWithInjectedWallet(
  address: Address,
  message: string,
): Promise<string> {
  return await (window as any).ethereum.request({
    method: "personal_sign",
    params: [message, address],
  });
}

/**
 * Builds a transaction to transfer ERC20 tokens from an Externally Owned Account (EOA)
 * to another account, typically a smart contract account.
 *
 * This function constructs a RawTransaction object that, when executed, will transfer
 * the specified amount of ERC20 tokens from the sending EOA to the recipient address.
 * It's commonly used to fund smart contract accounts with tokens.
 *
 * @param {Object} params - The parameters for building the transaction.
 * @param {Address} params.recipient - The address of the account receiving the tokens.
 * @param {bigint} params.amount - The amount of tokens to transfer, in the token's smallest unit (e.g., wei for ETH-like tokens).
 * @param {number} params.chainId - The ID of the blockchain network where the transaction will be executed.
 * @param {Address} params.token - The address of the ERC20 token contract.
 *
 * @returns {RawTransaction} A RawTransaction object ready to be signed and broadcasted.
 *   The object includes:
 *   - to: The address of the ERC20 token contract.
 *   - value: Always 0n for ERC20 transfers.
 *   - data: The encoded function call data for the ERC20 'transfer' function.
 *   - gasLimit: A predefined gas limit set to 55000 (adjust if necessary for different tokens or networks).
 *
 * @example
 * const txParams = {
 *   recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
 *   amount: BigInt(1000000), // 1 USDC if USDC has 6 decimals
 *   chainId: 1,
 *   token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC on Ethereum mainnet
 * };
 * const rawTx = buildTransferERC20FromEoaTx(txParams);
 * // rawTx can now be signed and sent to the network
 */
export function buildTransferERC20FromEoaTx(params: {
  recipient: Address;
  amount: bigint;
  chainId: number;
  token: Address;
}): RawTransaction {
  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [params.recipient, params.amount],
  });
  return {
    to: params.token,
    value: BigInt(0),
    data: data,
    gasLimit: BigInt(55000)
  };
}