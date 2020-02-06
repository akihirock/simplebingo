import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { InitComponent } from './init/init.component';
import { LoadComponent } from './load/load.component';
import { OverComponent } from './over/over.component';


import { GameService } from "./shared/services/gamemodel.service";

import { ToolbarComponent } from './toolbar/toolbar.component';

import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { UserformComponent } from './userform/userform.component';
import { GameformComponent } from './gameform/gameform.component';
import { GameComponent, DelMsgDialog, DelnumDialog, SignoutDialog, DeleteDialog, LanguageDialog } from './game/game.component';
import { MessageComponent } from './message/message.component';
import { BallComponent } from './ball/ball.component';
import { BingocardComponent } from './bingocard/bingocard.component';
import { BackComponent } from './back/back.component';


import { WindowRef } from './shared/services/WindowRef';

import { BingoTypePipe} from './shared/services/bingo.pipe';



import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    InitComponent,
    LoadComponent,
    UserProfileComponent,
    SignInComponent,
    ToolbarComponent,
    UserformComponent,
    GameformComponent,
    GameComponent,
    MessageComponent,
    BallComponent,
    BingocardComponent,
    BackComponent,
    BingoTypePipe,
    DelMsgDialog,
    DelnumDialog,
    SignoutDialog,
    DeleteDialog,
    LanguageDialog,
    OverComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  entryComponents: [
    DelMsgDialog,
    DelnumDialog,
    SignoutDialog,
    DeleteDialog,
    LanguageDialog
  ],
  providers: [
    AuthService,
    AuthGuard,
    SecureInnerPagesGuard,
    GameService,
    WindowRef,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
