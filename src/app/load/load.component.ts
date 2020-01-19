import { Component} from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map,take  } from 'rxjs/operators';
import { RouterModule, Routes , Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})

export class LoadComponent {

  uid:string;
  games = {};
  loaded:boolean = false;
  icons : string[] = [
    "bat","bear","bee","bird","bug","butterfly","cat","chicken",
    "coala","crocodile","dinosaur","dog","dolphin","duck","eagle",
    "elephant","fish","flamingo","fox","frog","giraffe","gorilla",
    "horse","leopard","lion","mouse","panda","parrot","penguin",
    "shark","snake","spider","tiger","turtle","wolf","zebra"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private db: AngularFireDatabase
  ) {

    if( (window.innerWidth) <= 640 && (location.href.indexOf("/load")!=-1 )){
      var body = document.getElementsByTagName("body")[0];
      body.classList.add("sp");
    }

    this.uid = this.authService.getUserID.uid;
    if(this.uid){
      var itemsRef = db.list('users/' + this.uid);
      itemsRef.snapshotChanges()
      .subscribe(actions => {
        this.games = {};
        actions.forEach(action => {
          var key = action.key;
          var gameRef = this.db.object("games/" + key);
          gameRef.valueChanges().pipe(take(1),)
            .subscribe(g => {
              this.games[key]=g;
            });
        });
        if(actions.length!=0){
          this.loaded = true;
        }
      });
    }
  }

  keys() : Array<string> {
    return Object.keys(this.games).reverse();
  }

}
