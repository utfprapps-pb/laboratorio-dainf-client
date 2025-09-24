import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-salvar',
    templateUrl: './salvar.component.html',
    styleUrls: ['./salvar.component.css'],
    standalone: false
})
export class SalvarComponent {

  @Input() typeButton: string;
  @Input() disabled: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  click(): void {
    this.onClick.emit();
  }
}
