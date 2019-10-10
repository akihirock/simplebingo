import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Required components for which route services to be activated

import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";



import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { InitComponent } from './init/init.component';

import { GameformComponent } from './gameform/gameform.component';
import { UserformComponent } from './userform/userform.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'init', component: InitComponent },
  { path: 'test', component: TestComponent , canActivate: [AuthGuard]},
  { path: 'userform',component: UserformComponent},
  { path: 'gameform',component: GameformComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
