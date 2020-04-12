import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-salvar',
  templateUrl: './salvar.component.html',
  styleUrls: ['./salvar.component.css']
})
export class SalvarComponent {

  @Input() typeButton: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  click(): void {
    this.onClick.emit();
  }
}
