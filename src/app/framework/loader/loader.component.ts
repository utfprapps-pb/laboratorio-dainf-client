import {Component} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  display = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.observableDisplay().subscribe(display => {
      this.display = display;
    });
  }

}
