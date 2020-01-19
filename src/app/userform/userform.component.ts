import { Component,Input,Output,EventEmitter } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { GameService } from "../shared/services/gamemodel.service";
import { RouterModule, Routes , Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';



@Component({
  selector: 'userform',
  templateUrl: 'userform.component.html',
  styleUrls: ['userform.component.scss']
})

export class UserformComponent{

  public u: FormGroup;
  game;
  gamesRef: any;
  userRef: any;
  gameUser: any;
  msgsRef: any;

  yourIcon = "../../assets/svg/cat.svg";
  showIconList: boolean = false;
  iconNum: number;

  uid:string;

  invite : boolean = false;

  icons : string[] = [
    "bat","bear","bee","bird","bug","butterfly","cat","chicken",
    "coala","crocodile","dinosaur","dog","dolphin","duck","eagle",
    "elephant","fish","flamingo","fox","frog","giraffe","gorilla",
    "horse","leopard","lion","mouse","panda","parrot","penguin",
    "shark","snake","spider","tiger","turtle","wolf","zebra"
  ];

  toGame: boolean = false;

  la:string = "";

  @Input('pcFlg') pcFlg: boolean ;
  @Output() onToGameForm = new EventEmitter<boolean>();


  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private gameService : GameService,
    public db: AngularFireDatabase
  ) {
    this.gamesRef = db.list('games');
    this.uid = this.authService.getUserID.uid;
    this.game = gameService.getGame();
    this.iconNum = Math.floor(Math.random() * (this.icons.length) ) ;

    if(this.game.id != undefined){
      this.invite = true;
      //this.userRef = af.database.object('games/' + this.game.id + '/us/' + this.uid);
      this.gameUser = this.db.object('games/' + this.game.id + '/us/' + this.uid);

      console.log("users/" +  this.uid + "/" + this.game.id);

      this.userRef = this.db.object("users/" +  this.uid + "/" + this.game.id);


    }


  }

  ngOnInit() {
    this.u = this.fb.group({
      'name':['', Validators.required]
    });
  }

  makeYourNum(cardSize,maxNum){
    var yourNum = new Array();
    var rnd;
    for (var i = 0; i < cardSize; i++) {
      for (var j = 0; j < cardSize; j++) {
        if (i == ((cardSize - 1) / 2) && j == ((cardSize - 1) / 2)) {
          yourNum.push(0);
        } else {
          rnd = Math.floor(Math.random() * (maxNum)) + 1;
          if (yourNum.indexOf(rnd) == -1) {
            yourNum.push(rnd);
          } else {
            j--;
          }
        }
      }
    }
    return yourNum;
  };

  bingoStart(){
    this.game.nm = this.u.controls['name'].value;
    this.game.ic = this.iconNum;
    this.game.ow = this.uid;
    this.game.tm = (new Date()).getTime();
    this.game.la = "ja";
    var you = {
      nm : this.u.controls['name'].value,
      ic : this.iconNum,
      nu : this.makeYourNum(this.game.cs,this.game.mn)
    };
    var us = {};
    us[this.uid] = {
      nu : you.nu
    }
    this.game.us = us;

    var promiseGame = this.gamesRef.push(this.game);
    promiseGame
      .then((item) => {
        var gKey = item.key;
        this.userRef = this.db.object("users/" + this.uid + "/" + gKey);
        var promiseUser = this.userRef.set(you);
        promiseUser
          .then((u) => {
            if(this.game.tx != undefined){
              this.msgsRef = this.db.list('msgs/' + gKey + "/" + this.uid);
              const promiseGame = this.msgsRef.push({
                nm : you.nm,
                ic : you.ic,
                tm :  (new Date()).getTime(),
                tx : this.game.tx,
                ur : this.uid
              });
              promiseGame
                .then((msg) => {
                  this.router.navigate(['/game',gKey]);
                });
            }
          });
      });





    // this.toGame = true;
    // var you = {
    //   nm : this.name,
    //   ic : this.iconNum,
    //   nu : this.makeYourNum(this.game.cs,this.game.mn)
    // };
    // this.game.nm = this.name
    // this.game.ic  = this.iconNum;
    // this.game.ow = this.uid;
    // this.game.nu = [0];
    // this.game.tm = (new Date()).getTime();
    // this.game.la = this.la;
    // var us = {};
    // us[this.uid] = {
    //   nu : you.nu
    // }
    // this.game.us = us;
    //
    // var game = this.game;
    // var uid = this.uid;
    // var af = this.af;
    //
    // var router =  this.router;
    //
    // //ゲーム登録
    // this.games.push(this.game).then(function(g){
    //   var gKey = g.key;
    //
    //   //ユーザ登録
    //   var user = af.database.object("users/" + uid + "/" + gKey);
    //   user.set(you).then(function(u){
    //     //メッセージ登録
    //     if(game.tx != undefined){
    //       var msg = af.database.list("msgs/" + gKey + "/" + uid);
    //       msg.push({
    //         nm : you.nm,
    //         ic : you.ic,
    //         tm :  (new Date()).getTime(),
    //         tx : game.tx,
    //         ur : uid
    //       });
    //     }
    //     router.navigate(['/game',gKey]);
    //   });
    //
    // });

  }

  joinBingo(){

    console.log("joinBingo");

    this.toGame = true;
    var you = {
      nm : this.u.controls['name'].value,
      ic : this.iconNum,
      nu : this.makeYourNum(this.game.cs,this.game.mn)
    };
    var obj = {
      nu:you.nu,
      st:0
    }
    var gKey = this.game.id;
    var userRef = this.userRef;
    var router =  this.router;

    this.gameUser.set(obj).then(function(g){
      userRef.set(you).then(function(u){
        router.navigate(['/game',gKey]);
      });
    });



  }

}
