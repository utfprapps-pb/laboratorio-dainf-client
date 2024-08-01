import {FormControl, NgForm} from '@angular/forms';
import { ViewChild, Directive } from '@angular/core';
import $ from 'jquery';

@Directive()
export abstract class BaseFormComponent {

  @ViewChild(NgForm)
  public form: NgForm;

  validarFormulario(form?: NgForm): void {
    if (!form) {
      form = this.form;
    }
    for (const eachControl in form.controls) {
      (form.controls[eachControl] as FormControl).markAsDirty();
      (form.controls[eachControl] as FormControl).updateValueAndValidity();
    }
    setTimeout(() => {
      const erro = $('p-tabview .ng-invalid:eq(0)');
      if (erro.length > 0) {
        const $tabView = erro.closest('p-tabview');
        const $tabPanel = erro.closest('p-tabpanel');
        const index = $tabPanel.parent().find('p-tabpanel').index($tabPanel);
        $tabView.find('.ui-tabview-nav li').eq(index).click();
      }
    }, 0);
  }

  isValid(): boolean {
    return this.form.valid;
  }
}
