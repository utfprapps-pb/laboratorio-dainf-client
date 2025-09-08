import {Component} from '@angular/core';

@Component({
    selector: 'app-pageNotFound',
    templateUrl: './pageNotFound.component.html',
    styleUrls: ['./pageNotFound.component.css'],
    standalone: false
})
export class PageNotFoundComponent {

  constructor() {
  }

  back() {
    window.history.back();
  }
}
