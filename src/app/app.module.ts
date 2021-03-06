import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AppMaterialModule } from '../app/Shared/app.material.module';
import { FirebaseService } from './services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
// Servicio Fotos
import { FotosNoConformidadService } from './services/procesos/registroNoConformidad/fotos-no-conformidad.service';

import * as Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, DialogContent } from './components/login/login.component';
import { ListaProyectosComponent } from './components/lista-proyectos/lista-proyectos.component';
import { ListadoRncComponent } from './components/procesos/registroNoConformidad/listado-rnc/listado-rnc.component';
import { FormularioRncComponent } from './components/procesos/registroNoConformidad/formulario-rnc/formulario-rnc.component';
import { FormsModule } from '@angular/forms';
import { NavbarMenuComponent } from '../app/Shared/navbar-menu/navbar-menu.component';
import { CapturarFotoComponent } from './components/examples/capturar-foto/capturar-foto.component';
import { CapturaDinamicaComponent } from './components/examples/captura-dinamica/captura-dinamica.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs';
// import 'rxjs/internal-compatibility';
// Diseño de TOASTR
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogContent,
    ListaProyectosComponent,
    ListadoRncComponent,
    FormularioRncComponent,
    NavbarMenuComponent,
    CapturarFotoComponent,
    CapturaDinamicaComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [LoginComponent, DialogContent],
  providers: [
    FirebaseService,
    AppRoutingModule,
    DatePipe,
    FotosNoConformidadService,
    [{ provide: FirestoreSettingsToken, useValue: {}}]
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
