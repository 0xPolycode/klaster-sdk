export class SaltUtil {

  public static firstAccount() {
    return "0"
  }

  public static accountAt(i: number) {
    return i.toString()
  }

  public static customAccount(salt: string) {
    return salt
  }
}