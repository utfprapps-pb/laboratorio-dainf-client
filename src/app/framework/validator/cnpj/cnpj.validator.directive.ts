import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {StringUtils} from '../../util/string.utils';
import {CpfCnpjUtil} from '../../util/cpfCnpj.util';

@Directive({
  selector: '[validateCnpj][ngModel],[validateCnpj][formControl]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => CnpjValidatorDirective), multi: true}
  ]
})
export class CnpjValidatorDirective implements Validator {

  validator: Function;

  constructor() {
    this.validator = validaCpfCnpj();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}

function validaCpfCnpj() {
  return (c: FormControl) => {
    const valor = c.value;

    if (StringUtils.isNotBlank(valor)) {
      const valid = CpfCnpjUtil.cnpjIsValid(valor);

      if (valid) {
        return null;
      }
    }

    return {
      validateCnpj: {
        valid: false
      }
    };
  };
}
