import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { first, map ,take } from 'rxjs/operators';


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

    db.list('items').valueChanges().subscribe(v => {
      //this.user = v;
      console.log(v);
      //console.log(v);
    });

    // db.list('items').valueChanges().pipe(take(1),)
    // .subscribe(v => {
    //   //this.user = v;
    //   console.log(v);
    //   //console.log(v);
    // });


  }
}
