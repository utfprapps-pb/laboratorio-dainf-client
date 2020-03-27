import {Injectable} from '@angular/core';
import {Validation} from './validation';
import {Subject} from 'rxjs/internal/Subject';

@Injectable()
export class ValidationService {

  private rules: any;

  addValidationSubject = new Subject<Validation>();
  removeValidationSubject = new Subject<string>();
  clearValidationsSubject = new Subject();

  constructor() {
    this.rules = {
      required: 'Preenchimento Obrigatório',
      minlength: 'O valor é muito curto',
      maxlength: 'O valor é muito longo',
      email: 'O email é inválido'
    };
  }

  getMessageByError(error: string): string {
    if (this.rules[error]) {
      return this.rules[error];
    }
    return '';
  }

  setRuleMessages(rules: {}) {
    this.rules = rules;
  }

  setRuleMessage(error: string, message: string) {
    this.rules[error] = message;
  }

  addValidation(validation: Validation) {
    this.addValidationSubject.next(validation);
  }

  removeValidation(id: string) {
    this.removeValidationSubject.next(id);
  }

  clearValidations() {
    this.clearValidationsSubject.next();
  }

}
