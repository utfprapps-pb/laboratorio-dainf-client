import {Directive, DoCheck, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formatTelefone]'
})
export class TelefoneFormatDirective implements DoCheck {

  constructor(public el: ElementRef, private control: NgControl) {}

  ngDoCheck(): void {
    this.format();
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    this.format();
  }

  private format(): void {
    const identificacao = this.el.nativeElement.value.replace(/[^0-9]/g, '');

    if (identificacao.length === 10) {
      this.control.valueAccessor.writeValue(identificacao.replace(/(\d{0})(\d{2})(\d{0})(\d{4})/g, "\$1(\$2)\$3\ \$4\-"));
    } else if (identificacao.length === 11) {
      this.control.valueAccessor.writeValue(identificacao.replace(/(\d{0})(\d{2})(\d{0})(\d{5})/g, "\$1(\$2)\$3\ \$4\-"));
    }
  }
}
