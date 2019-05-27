import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ListaProyectosComponent } from './components/lista-proyectos/lista-proyectos.component'
import { ListadoRncComponent } from './components/procesos/registroNoConformidad/listado-rnc/listado-rnc.component'
import { FormularioRncComponent } from './components/procesos/registroNoConformidad/formulario-rnc/formulario-rnc.component';
import { CapturarFotoComponent} from './components/examples/capturar-foto/capturar-foto.component'
import {CapturaDinamicaComponent } from './components/examples/captura-dinamica/captura-dinamica.component'

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'captura-foto',component: CapturarFotoComponent},
  {path: 'captura-dinamica',component: CapturaDinamicaComponent},
  {path: 'formulario-rnc/:codigoProyecto/:codigoRNC', component: FormularioRncComponent },
  {path: 'listado-rnc/:codigoProyecto',component: ListadoRncComponent},
  {path: 'lista-proyectos',component: ListaProyectosComponent},
  {path: '',pathMatch: 'full', redirectTo: 'login'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
