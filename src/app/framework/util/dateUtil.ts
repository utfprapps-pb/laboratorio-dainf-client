export class DateUtil {

  static parseStringToDate(dtToParse: string): Date {
    const aux = dtToParse.split('/');
    return new Date(Number(aux[2]), Number(aux[1]) - 1, Number(aux[0]));
  }

  static dtIsBeforeToday(dt: Date | string): boolean {
    let dtCompare: Date;
    if (typeof dt === 'string') {
      dtCompare = this.parseStringToDate(dt);
    }
    return dtCompare.getTime() < new Date().getTime();
  }

  static dtIsAfterToday(dt: Date | string): boolean {
    let dtCompare: Date;
    if (typeof dt === 'string') {
      dtCompare = this.parseStringToDate(dt);
    }
    return dtCompare.getTime() > new Date().getTime();
  }

  static dtIsAfterDtLimit(dt: Date | string, dtLimite: Date | string): boolean {
    let dtCompare: Date;
    let dtLimit: Date;
    if (typeof dt === 'string') {
      dtCompare = this.parseStringToDate(dt);
    }
    if (typeof dtLimite === 'string') {
      dtLimit = this.parseStringToDate(dtLimite);
    }
    return dtCompare.getTime() > dtLimit.getTime();
  }
}
