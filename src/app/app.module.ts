import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { InitComponent } from './init/init.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
