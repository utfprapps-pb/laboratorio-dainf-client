import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cadastroRapido',
  templateUrl: './cadastroRapido.component.html',
  styleUrls: ['./cadastroRapido.component.css']
})
export class CadastroRapidoComponent {

  @Input() href: string;
  @Input() id: number;
}
