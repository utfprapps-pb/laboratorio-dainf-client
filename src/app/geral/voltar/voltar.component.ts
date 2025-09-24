import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-voltar',
    templateUrl: './voltar.component.html',
    styleUrls: ['./voltar.component.css'],
    standalone: false
})
export class VoltarComponent {

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  click(): void {
    this.onClick.emit();
  }
}
