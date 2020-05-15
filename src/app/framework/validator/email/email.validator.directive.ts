import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {StringUtils} from '../../util/string.utils';
import {EmailUtil} from '../../util/email.util';

@Directive({
  selector: '[validateEmail][ngModel],[validateEmail][formControl]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true}
  ]
})
export class EmailValidatorDirective implements Validator {

  validator: Function;

  constructor() {
    this.validator = validateEmail();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}

function validateEmail() {
  return (c: FormControl) => {
    const valor = c.value;
    if (StringUtils.isNotBlank(valor)) {
      const email = valor.toString();

      let valid = true;
      if (!EmailUtil.isValid(email)) {
        valid = false;
      }

      if (valid) {
        return null;
      }
    }

    return {
      validateEmail: {
        valid: false
      }
    };
  };
}

