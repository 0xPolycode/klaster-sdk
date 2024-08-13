/**
 * Utility class for generating salt values used in KlasterSDK functions.
 * 
 * Salt values are crucial for deriving unique smart contract accounts within the Klaster ecosystem.
 * This class provides methods to generate salts for different account scenarios.
 */
export class SaltUtil {
  /**
   * Generates a salt for the first (default) account.
   * 
   * @returns {string} A salt value of "0", representing the first account.
   * 
   * @example
   * const firstAccountSalt = SaltUtil.firstAccount();
   * console.log(firstAccountSalt); // Outputs: "0"
   */
  public static firstAccount(): string {
    return "0";
  }

  /**
   * Generates a salt for an account at a specific index.
   * 
   * This method allows for deterministic generation of salts for multiple accounts.
   * 
   * @param {number} i - The index of the account, starting from 0.
   * @returns {string} A salt value corresponding to the given index.
   * 
   * @example
   * const thirdAccountSalt = SaltUtil.accountAt(2);
   * console.log(thirdAccountSalt); // Outputs: "2"
   */
  public static accountAt(i: number): string {
    return i.toString();
  }

}