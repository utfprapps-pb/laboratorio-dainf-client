export class StringUtils {

  public static isNotBlank(value: string): boolean {
    return value != null && value.toString().trim().length > 0;
  }

  public static isBlank(value: string): boolean {
    return value == null || value.toString().trim().length === 0;
  }
}
