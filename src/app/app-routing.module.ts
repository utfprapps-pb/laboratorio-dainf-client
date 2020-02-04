import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GrupoListComponent} from './grupo/grupo.list.component';
import {GrupoFormComponent} from './grupo/grupo.form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'grupo', component: GrupoListComponent},
  {path: 'grupo/form', component: GrupoFormComponent},
  {path: 'grupo/form/:id', component: GrupoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
