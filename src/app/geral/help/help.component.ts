import {Component, EventEmitter, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent {

  @Input() dialogHelp: boolean;
  @Input() messageHelp: string;
  @Input() onClick: EventEmitter<any> = new EventEmitter();

  click() {
    this.dialogHelp = true;
  }
}
