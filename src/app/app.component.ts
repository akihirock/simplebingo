import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  item: Observable<any>;
  items:Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.item  = db.object('item').valueChanges();
    this.items = db.list('items').valueChanges();

  }
}
