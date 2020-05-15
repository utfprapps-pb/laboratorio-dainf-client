import {StringUtils} from './string.utils';

export class EmailUtil {

  private static EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  public static isValid(valor: string): boolean {
    if (StringUtils.isBlank(valor)) {
      return false;
    }
    return EmailUtil.EMAIL_REGEXP.test(valor);
  }

  // caso tiver uma lista de emails
  public static listIsValid(valor: string): boolean {
    const emailList = valor.split(';');

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i];
      if (!EmailUtil.isValid(email)) {
        return false;
      }
    }
    return true;
  }

}
