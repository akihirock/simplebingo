import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{ (item | async)?.name }}</h1>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  item: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.item = db.object('item').valueChanges();
  }
}
