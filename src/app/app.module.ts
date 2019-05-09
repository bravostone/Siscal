import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule,FirestoreSettingsToken  } from '@angular/fire/firestore';

import { FirebaseService } from './services/firebase.service';

import * as Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirebaseService,
    AppRoutingModule,
    [{ provide: FirestoreSettingsToken, useValue: {}}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
