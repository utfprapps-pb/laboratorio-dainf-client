import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GrupoListComponent} from './grupo/grupo.list.component';
import {GrupoFormComponent} from './grupo/grupo.form.component';
import {UsuarioListComponent} from './usuario/usuario.list.component';
import {UsuarioFormComponent} from './usuario/usuario.form.component';
import {FornecedorListComponent} from './fornecedor/fornecedor.list.component';
import {FornecedorFormComponent} from './fornecedor/fornecedor.form.component';
import {EstadoListComponent} from './estado/estado.list.component';
import {EstadoFormComponent} from './estado/estado.form.component';
import {PaisListComponent} from './pais/pais.list.component';
import {PaisFormComponent} from './pais/pais.form.component';
import {CidadeListComponent} from './cidade/cidade.list.component';
import {CidadeFormComponent} from './cidade/cidade.form.component';
import {ItemListComponent} from './item/item.list.component';
import {ItemFormComponent} from './item/item.form.component';
import {PageNotFoundComponent} from './pageNotFound/pageNotFound.component';
import {CompraListComponent} from './compra/compra.list.component';
import {CompraFormComponent} from './compra/compra.form.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {EmprestimoListComponent} from './emprestimo/emprestimo.list.component';
import {EmprestimoFormComponent} from './emprestimo/emprestimo.form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [LoginService], component: HomeComponent},
  {path: 'grupo', canActivate: [LoginService], component: GrupoListComponent},
  {path: 'grupo/form', canActivate: [LoginService], component: GrupoFormComponent},
  {path: 'grupo/form/:id', canActivate: [LoginService], component: GrupoFormComponent},
  {path: 'usuario', canActivate: [LoginService], component: UsuarioListComponent},
  {path: 'usuario/form', canActivate: [LoginService], component: UsuarioFormComponent},
  {path: 'usuario/form/:id', canActivate: [LoginService], component: UsuarioFormComponent},
  {path: 'fornecedor', canActivate: [LoginService], component: FornecedorListComponent},
  {path: 'fornecedor/form', canActivate: [LoginService], component: FornecedorFormComponent},
  {path: 'fornecedor/form/:id', canActivate: [LoginService], component: FornecedorFormComponent},
  {path: 'estado', canActivate: [LoginService], component: EstadoListComponent},
  {path: 'estado/form', canActivate: [LoginService], component: EstadoFormComponent},
  {path: 'estado/form/:id', canActivate: [LoginService], component: EstadoFormComponent},
  {path: 'pais', canActivate: [LoginService], component: PaisListComponent},
  {path: 'pais/form', canActivate: [LoginService], component: PaisFormComponent},
  {path: 'pais/form/:id', canActivate: [LoginService], component: PaisFormComponent},
  {path: 'cidade', canActivate: [LoginService], component: CidadeListComponent},
  {path: 'cidade/form', canActivate: [LoginService], component: CidadeFormComponent},
  {path: 'cidade/form/:id', canActivate: [LoginService], component: CidadeFormComponent},
  {path: 'item', canActivate: [LoginService], component: ItemListComponent},
  {path: 'item/form', canActivate: [LoginService], component: ItemFormComponent},
  {path: 'item/form/:id', canActivate: [LoginService], component: ItemFormComponent},
  {path: 'compra', canActivate: [LoginService], component: CompraListComponent},
  {path: 'compra/form', canActivate: [LoginService], component: CompraFormComponent},
  {path: 'compra/form/:id', canActivate: [LoginService], component: CompraFormComponent},
  {path: 'emprestimo', canActivate: [LoginService], component: EmprestimoListComponent},
  {path: 'emprestimo/form', canActivate: [LoginService], component: EmprestimoFormComponent},
  {path: 'emprestimo/form/:id', canActivate: [LoginService], component: EmprestimoFormComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
