import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import { ListaProyectosComponent} from './components/lista-proyectos/lista-proyectos.component'
import {ListadoRncComponent} from './components/procesos/registroNoConformidad/listado-rnc/listado-rnc.component'

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'listado-rnc',component: ListadoRncComponent},
  {path: 'lista-proyectos',component: ListaProyectosComponent},
  {path: '',pathMatch: 'full', redirectTo: 'login'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
