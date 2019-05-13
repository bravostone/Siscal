import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AppMaterialModule } from '../app/Shared/app.material.module'
import { FirebaseService } from './services/firebase.service';

import * as Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListaProyectosComponent } from './components/lista-proyectos/lista-proyectos.component';
import { ListadoRncComponent } from './components/procesos/registroNoConformidad/listado-rnc/listado-rnc.component';
import { FormularioRncComponent } from './components/procesos/registroNoConformidad/formulario-rnc/formulario-rnc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaProyectosComponent,
    ListadoRncComponent,
    FormularioRncComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirebaseService,
    AppRoutingModule,
    [{ provide: FirestoreSettingsToken, useValue: {}}]
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
