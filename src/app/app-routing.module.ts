import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GrupoListComponent} from './grupo/grupo.list.component';
import {GrupoFormComponent} from './grupo/grupo.form.component';
import {UsuarioListComponent} from "./usuario/usuario.list.component";
import {UsuarioFormComponent} from "./usuario/usuario.form.component";
import {FornecedorListComponent} from "./fornecedor/fornecedor.list.component";
import {FornecedorFormComponent} from "./fornecedor/fornecedor.form.component";
import {EstadoListComponent} from "./estado/estado.list.component";
import {EstadoFormComponent} from "./estado/estado.form.component";
import {PaisListComponent} from "./pais/pais.list.component";
import {PaisFormComponent} from "./pais/pais.form.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'grupo', component: GrupoListComponent},
  {path: 'grupo/form', component: GrupoFormComponent},
  {path: 'grupo/form/:id', component: GrupoFormComponent},
  {path: 'usuario', component: UsuarioListComponent},
  {path: 'usuario/form', component: UsuarioFormComponent},
  {path: 'usuario/form/:id', component: UsuarioFormComponent},
  {path: 'fornecedor', component: FornecedorListComponent},
  {path: 'fornecedor/form', component: FornecedorFormComponent},
  {path: 'fornecedor/form/:id', component: FornecedorFormComponent},
  {path: 'estado', component: EstadoListComponent},
  {path: 'estado/form', component: EstadoFormComponent},
  {path: 'estado/form/:id', component: EstadoFormComponent},
  {path: 'pais', component: PaisListComponent},
  {path: 'pais/form', component: PaisFormComponent},
  {path: 'pais/form/:id', component: PaisFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
