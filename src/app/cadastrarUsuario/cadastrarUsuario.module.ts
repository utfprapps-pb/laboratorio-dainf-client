import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CadastrarUsuarioComponent } from "./cadastrarUsuario.component";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";
import { ReenviarEmailConfirmacaoUsuarioComponent } from "./reenviarEmailConfirmacaoUsuario.component";
import { RecuperarSenhaComponent } from "./recuperarSenha.component";
import { ConfirmarEmailComponent } from "./confirmarEmail.component";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
  ],
  declarations: [
    CadastrarUsuarioComponent,
    ReenviarEmailConfirmacaoUsuarioComponent,
    RecuperarSenhaComponent,
    ConfirmarEmailComponent,
  ],
  exports: [
    CadastrarUsuarioComponent,
    ReenviarEmailConfirmacaoUsuarioComponent,
    RecuperarSenhaComponent,
    ConfirmarEmailComponent,
  ],
  providers: [CadastrarUsuarioService],
})
export class CadastrarUsuarioModule {}
