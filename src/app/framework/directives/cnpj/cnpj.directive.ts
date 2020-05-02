import {Directive, DoCheck, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formatCnpj]'
})
export class CnpjDirective implements DoCheck {

  constructor(public el: ElementRef, private control: NgControl) {
  }

  ngDoCheck(): void {
    this.format();
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    this.format();
  }

  private format(): void {
    const value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
    this.control.valueAccessor.writeValue(value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5'));
  }
}
