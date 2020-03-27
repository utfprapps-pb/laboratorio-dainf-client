import {ElementRef} from '@angular/core';

export interface Validation {

  name?: string;
  campo: string;
  message: string;
  el?: ElementRef;

}
