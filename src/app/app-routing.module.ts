import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { InitComponent } from './init/init.component';


const routes: Routes = [
  { path: '',component: InitComponent},
  { path: 'init',component: InitComponent},
  { path: 'test',component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
