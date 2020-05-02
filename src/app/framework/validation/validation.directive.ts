import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import * as $ from 'jquery';
import {ValidationService} from './validation.service';

@Directive({
  selector: '[validation]',
})
export class ValidationDirective implements OnInit {

  @Input('validationMessage') customMessage: string;

  private target: any;
  private formGroup: any;

  constructor(private el: ElementRef, private formControl: NgControl, private validationService: ValidationService) {
    this.target = $(el.nativeElement);
    this.formGroup = this.target.closest('.form-group');

    this.formControl.valueChanges.subscribe((newValue) => {
      this.checkValidation();
    });
  }

  ngOnInit() {
  }

  resetFormGroup() {
    this.formGroup.removeClass('has-error');
    this.formGroup.find('.help-block').remove();
    if (typeof this.formControl.name === 'string') {
      this.validationService.removeValidation(this.formControl.name);
    }
  }

  getMessage(error?: string): string {
    if (this.customMessage) {
      return this.customMessage;
    } else if (error) {
      return this.validationService.getMessageByError(error);
    } else {
      return 'Please enter a correct value';
    }
  }

  getError(errors: any): string {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        return key;
      }
    }
    return null;
  }

  checkValidation() {
    this.resetFormGroup();

    if ((this.formControl.dirty || this.formControl.touched) && !this.formControl.valid) {

      const error = this.getError(this.formControl.errors);

      if (error) {
        const message = this.getMessage(error);
        const helpBlock = `<span class="help-block">${message}</span>`;
        this.formGroup.addClass('has-error');
        this.formGroup.append(helpBlock);

        let campo = null;
        if (this.formGroup.find('label').length > 1) {
          campo = $(this.formGroup.find('label')[0]).text();
        } else {
          campo = this.formGroup.find('label').text();
        }

        this.validationService.addValidation({
          name: this.formControl.name as string,
          campo: campo as string,
          message: message as string,
          el: this.el
        });
      }
    }
  }
}
