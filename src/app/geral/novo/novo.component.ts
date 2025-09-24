import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.css'],
    standalone: false
})
export class NovoComponent {

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  click(): void {
    this.onClick.emit();
  }
}
