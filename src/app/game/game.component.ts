import { Component, OnInit, OnDestroy,EventEmitter,ViewChild } from '@angular/core';

import { AuthService } from "../shared/services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { GameService } from "../shared/services/gamemodel.service";
import { RouterModule, Routes , Router,ActivatedRoute} from '@angular/router';

import { WindowRef } from '../shared/services/WindowRef';

import { first, map ,take } from 'rxjs/operators';

import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';

declare var adsbygoogle: any[];
declare var gapi: any;

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy {

  gm: any;
  gameId:string;
  uid:string;

  isSP:boolean;
  url:string;
  la:string;
  selectedIndex:number = 0;
  //selectedIndexB:number = 0;
  navList: boolean = false;

  ownerId:string;
  owner: boolean = false;
  page:string = "bingocard";
  pageSP:string = "bingocard";

  gameM : { tt: string} = {} as { tt: string};
  lineUrl:SafeResourceUrl;

  backFire : any;//AngularFireObject<any>;
  soundFire : any;//AngularFireObject<any>;
  statusFire : any;//AngularFireObject<any>;
  backM = [];
  banM = [];
  msgsM = [];
  playersM : {};
  youM ;
  yourMsgsFire : any;//AngularFireList<any>;
  yourNum:number[] = [0];

  loadAPI: Promise<any>;
  soundM;
  rndTime;
  rnd: number = 0;
  isOver: boolean = false;

  private audioContext;
  private audioBuffer;
  private bufferSource;
  private gainNode;
  private onaudioSound = false;
  private audioContextCrush;
  private audioBufferCrush;
  private bufferSourceCrush;
  private gainNodeCrush;
  public soundOn: boolean = true;
  public onStartFlg:string = 'start';
  timerToken: any;
  @ViewChild('sidenav', {static: false}) sidenav;




  icons : string[] = [
    "bat","bear","bee","bird","bug","butterfly","cat","chicken",
    "coala","crocodile","dinosaur","dog","dolphin","duck","eagle",
    "elephant","fish","flamingo","fox","frog","giraffe","gorilla",
    "horse","leopard","lion","mouse","panda","parrot","penguin",
    "shark","snake","spider","tiger","turtle","wolf","zebra"
  ];

  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private router: Router,
    private gameService : GameService,
    public authService: AuthService,
    private db: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ){

    console.log("game init");
    this.gameId = this.route.snapshot.paramMap.get('id');


    function object_array_sort(data,key){
      var num_a = -1;
      var num_b = 1;
      data = data.sort(function(a, b){
        var x = a[key];
        var y = b[key];
        if (x > y) return num_a;
        if (x < y) return num_b;
        return 0;
      });
      return data;
    }

    // check Auth <
    this.uid = this.authService.getUserID.uid;
    if(this.uid){

      // gameRef <
      var gameRef = this.db.object("games/" + this.gameId);
      //gameRef.snapshotChanges().take(1).subscribe(action => {

      gameRef.valueChanges().pipe(take(1),)
        .subscribe(g => {


        // var g = action.payload.val();
        // if(g==null){
        //   this.router.navigate(['/over']);
        //   return false;
        // }

        this.gameM["cs"] = g["cs"];
        this.gameM["gc"] = g["gc"];
        this.gameM["mn"] = g["mn"];
        this.gameM["nm"] = g["nm"];
        this.gameM["ow"] = g["ow"];
        this.gameM["tt"] = g["tt"];


        this.lineUrl = sanitizer.bypassSecurityTrustResourceUrl("line://msg/text/" + this.gameM["tt"] + " https://goo.gl/" + this.gameM["gc"]);

        // check ban
        if( g["ban"] != undefined ){
          for(var b in g["ban"]){
             if(b==this.uid){
               this.router.navigate(['/over']);
               return false;
             }
          }
        }


        //check invitation <
        var flg = false;
        for(var u in g['us']){
          if(u == this.uid){
            flg = true;
          }
        }
        if(!flg){
          this.gm = gameService.getGame();
          this.gm.id = this.gameId;
          this.gm.tt = g['tt'];
          this.gm.tx = g['tx'];
          this.gm.cs = g['cs'];
          this.gm.mn = g['mn'];
          this.gm.nm = g['nm'];
          this.gm.ic = g['ic'];
          this.gm.fl = "invite"
          this.router.navigate(['/']);
          return false;
        }else{
          var body = document.getElementsByTagName("body")[0];
          body.className = "game";
        }
        //check invitation >


        //check owner <
        this.ownerId = g['ow'];
        if(this.uid == g['ow']){
          this.owner = true;
          this.pageSP = 'ball';
          this.page = 'ball';
        }
        //check owner >


        this.url = location.href;


        //google short cut <
        // if(g["gc"] == undefined || g["gc"]==""){
        //   var googleFire = db.object('games/' + this.gameId + "/gc");
        //   let node = document.createElement('script');
        //   node.src = "https://apis.google.com/js/client.js?onload=load";
        //   node.type = 'text/javascript';
        //   document.getElementsByTagName('head')[0].appendChild(node);
        //   var gm = this.gameM;
        //
        //   this.loadAPI = new Promise((resolve) => {
        //     window['load'] = (ev) => {
        //       var path = location.href.indexOf("game");
        //       var pathStr = location.href.substring(0,path) + "game/";
        //       var LONG_URL = pathStr + this.gameId;
        //       gapi.client.setApiKey("AIzaSyAQLg9XP4NgwLV2UVw5D3VNduTdxrvT5Hs");
        //       gapi.client.load("urlshortener", "v1",　function(){
        //         var request = gapi.client.urlshortener.url.insert({
        //           resource: {'longUrl': LONG_URL}
        //         });
        //         request.execute(function(response){
        //           var gc = (response.id).replace("https://goo.gl/","");
        //           googleFire.set(gc);
        //           gm["gc"] = gc;
        //         });
        //       });
        //     }
        //   });
        //
        // }
        //google short cut >


        // fire backnumber    this.backM
        this.backFire = db.object('games/' + this.gameId + "/nu");
        this.backFire.snapshotChanges().subscribe(action => {
          this.backM = action.payload.val();
        });


        //fire ban  this.banM <
        var banFire = db.object('games/' + this.gameId + "/ban");
        banFire.snapshotChanges().subscribe(action => {
          this.banM = [];
          var ban = action.payload.val();
          //console.log(ban);
          if(ban){
            for(var key in ban){
              var b = ban[key];
              this.banM.push(b);
            }
          }

        });

        // var banFire = db.list('games/' + this.gameId + "/ban");
        // banFire.valueChanges().subscribe(v => {
        //   this.banM = [];
        //   var ban = v[0];
        //   console.log(ban);
        //   for(var key in ban){
        //     var b = ban[key];
        //     this.banM.push(b);
        //   }
        // });


        // fire ban  this.banM >


        // fire msgs <
        var msgsFire = db.list('msgs/' + this.gameId);

        msgsFire.valueChanges().subscribe(v => {
          this.msgsM = [];
          var msg:any = v[0];

          for(var key in msg){
            if( msg[key]["tx"] != "" ){
              msg[key]["$key"] = key;
              this.msgsM.push(msg[key]);
            }
          }

          // var msg = snapshot.val();
          // for(var key in msg){
          //   if( msg[key]["tx"] != "" ){
          //     msg[key]["$key"] = key;
          //     this.msgsM.push(msg[key]);
          //   }
          // }

          this.msgsM = object_array_sort(this.msgsM,'tm');

        });

        // msgsFire.snapshotChanges(['child_changed'])
        //   .subscribe(actions => {
        //     this.msgsM = [];
        //     actions.forEach(action => {
        //       // var msg = action.payload.val();
        //       // for(var key in msg){
        //       //   if( msg[key]["tx"] != "" ){
        //       //     msg[key]["$key"] = key;
        //       //     this.msgsM.push(msg[key]);
        //       //   }
        //       // }
        //
        //       // if( key != null && msg["tx"] != "" ){
        //       //   console.log(msg);
        //       //   console.log(key);
        //       //   // msg[key]["key"] = key;
        //       //   // this.msgsM.push(msg[key]);
        //       // }
        //     });
        //   });
        // fire msgs >


        // fire sound    this.soundM
        this.soundFire = db.object('games/' + this.gameId + "/sd");
        this.soundFire.snapshotChanges().subscribe(action => {
          this.soundM = action.payload.val();
          console.log(this.soundM);
          console.log(this.onaudioSound);
          if(this.soundM  == null){
            this.router.navigate(['/']);
          }
          if(this.soundM == 'start'){
            clearInterval(this.rndTime);
            this.onSound();
          }else if(this.soundM == 'decide'){
            this.offSound();
            this.onCrush();
            if(this.owner){
              this.soundFire.set('decided');
            }
            this.rnd = this.backM.slice(-1)[0];
            this.rndTime = setTimeout(() => {
               this.rnd = 0;
            }, 5000);
          }else if(this.soundM == 'cancel'){
            this.offSound();
            this.rnd = 0;
          }
          if( this.backM != null && this.backM.length > this.gameM["mn"]){
            this.isOver = true;
          }else{
            this.isOver = false;
          }
        });
        // fire sound >


        // fire players    this.playersM
        var playersFire = db.list("games/" + this.gameId + "/us");
        playersFire.snapshotChanges(['child_changed'])
          .subscribe(actions => {
           this.playersM = {};
           actions.forEach(action => {
             var pkey = action.key;
             var playerOwner = action.payload.val();
             this.playersM[pkey] = playerOwner;
             var playerFire = db.object('users/' + pkey + '/' + this.gameId);
             playerFire.snapshotChanges().subscribe(action => {
               var wrk = action.payload.val();
               if(wrk != null){
                 this.playersM[pkey]["nm"] = wrk["nm"];
                 this.playersM[pkey]["ic"] = wrk["ic"];
               }
             });
             if(this.owner){
               if(this.playersM[pkey]["st"] != null){
                 //this.checkNum(this.playersM[pkey]["nu"],this.backM,true,pkey);
               }
             }
           });
        });
        // fire players >


        // fire statusFire <
        this.statusFire = db.object('games/' + this.gameId + "/us/" + this.uid + "/st");
        // fire statusFire >


        // set static you <
        var you = db.object('users/' + this.uid + '/' + this.gameId);
        console.log(this.uid);
        you.snapshotChanges().subscribe(action => {
          this.youM = action.payload.val();
          console.log(this.youM);
        });
        // set static you >


        // fire your msgs
        this.yourMsgsFire = db.list('msgs/' + this.gameId + "/" + this.uid);
        // fire your msgs >


      });
      // gameRef >


    };

    //check Auth >


    this.winRef = winRef;
    winRef.nativeWindow.AudioContext = winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext;

    this.audioContext = new AudioContext();
    this.fetchSample("/assets/sound/drumroll.mp3",this.audioContext)
    .then((audioBuffer) => {
        this.audioBuffer = audioBuffer;
    })
    .catch((error) => {
        throw error;
    });

    this.audioContextCrush = new AudioContext();
    this.fetchSample("/assets/sound/crush.mp3",this.audioContextCrush)
    .then((audioBuffer) => {
        this.audioBufferCrush = audioBuffer;
    })
    .catch((error) => {
        throw error;
    });

  };



  ngOnInit() {
    if(window.innerWidth >= 740){
      this.isSP = false;
      this.opened = true;
    }else{
      this.isSP = true;
    }
  }


  ngOnDestroy() {
    console.log("destroy");
    this.audioContext.close();
    this.audioContextCrush.close();
    var body = document.getElementsByTagName("body")[0];
    body.className = "";
  }

  /* ------------------- sound start ----------------- */
  fetchSample(url,audioContext) : Promise<String>{
    var getAudioBuffer = function(url, fn) {
      var req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            audioContext.decodeAudioData(req.response, function(buffer) {
              fn(buffer);
            });
          }
        }
      };
      req.open('GET', url, true);
      req.send('');
    };
    return new Promise(function(resolve, reject){
      getAudioBuffer(url, function(buffer) {
        resolve(buffer);
      });
    });
  }

  onSound(){
    console.log("onSound");
    //this.offSound();
    console.log(this.soundOn);

    if(this.soundOn){
      console.log("onSoundにはいった");
      this.bufferSource = this.audioContext.createBufferSource();
      this.bufferSource.buffer = this.audioBuffer;
      this.bufferSource.loop = true;
      this.bufferSource.connect(this.audioContext.destination);
      this.gainNode = this.audioContext.createGain();
      this.bufferSource.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.5;
      this.bufferSource.start(0);
      this.onaudioSound = true;
    }

    this.onStartFlg = 'stop';

    var num = [];
    if(this.backM!=null){
      for(var i=1;i<=this.gameM["mn"];i++){
        if ( this.backM.indexOf(i) == -1 ){
          num.push(i);
        }
      }
    }else{
      for(var i=1;i<=this.gameM["mn"];i++){
          num.push(i);
      }
    }

    if(num.length>0){
      var rnd;
      this.timerToken = setInterval(() => {
        rnd = Math.floor(Math.random() * num.length ) ;
        this.rnd = num[rnd];
      }, 100);
    }else{
      this.offSound();
    }
  }
  offSound(){
    console.log(this.onaudioSound);
    if(this.bufferSource!=undefined && this.onaudioSound){
      console.log("canceled");
      this.bufferSource.stop(0);
      this.onaudioSound = false;
    }
    clearInterval(this.timerToken);
  }
  soundOnOff(){
    this.soundOn = !this.soundOn;
    console.log("on::"+this.soundOn);
    console.log("ad;;" + this.onStartFlg + "::" + this.soundM);
    if(this.soundOn){
      if(this.onStartFlg == 'stop' && this.soundM!="decided" ){
        this.bufferSource = this.audioContext.createBufferSource();
        this.bufferSource.buffer = this.audioBuffer;
        this.bufferSource.loop = true;
        this.bufferSource.connect(this.audioContext.destination);
        this.gainNode = this.audioContext.createGain();
        this.bufferSource.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.5;
        this.bufferSource.start(0);
        this.onaudioSound = true;
      }
    }else{
      console.log("denwa");
      console.log(this.bufferSource);
      if(this.bufferSource!=undefined && this.onaudioSound){
        this.bufferSource.stop(0);
        this.onaudioSound = false;
      }
    }
  }
  onCrush(){
    if(this.soundOn){
      this.bufferSourceCrush = this.audioContextCrush.createBufferSource();
      this.bufferSourceCrush.buffer = this.audioBufferCrush;
      this.bufferSourceCrush.connect(this.audioContextCrush.destination);
      this.gainNodeCrush = this.audioContextCrush.createGain();
      this.bufferSourceCrush.connect(this.gainNodeCrush);
      this.gainNodeCrush.connect(this.audioContextCrush.destination);
      this.gainNodeCrush.gain.value = 0.1;
      this.bufferSourceCrush.start(0);
    }
  }
  onStart(){
    if(this.onStartFlg == 'start'){
      this.soundFire.set('start');
    }else{
      if(this.backM == null){
        this.backM = [];
      }
      this.backM.push(this.rnd);
      this.backFire.set(this.backM);
      this.soundFire.set('decide');
      this.onStartFlg = 'start'
    }
  }
  onCancel(){
    clearInterval(this.timerToken);
    this.soundFire.set('cancel');
    this.onStartFlg = 'start'
  }
  /* ------------------- sound end ----------------- */

  checkBingo = function(n){
    for(var i=0,iMax=n.length;i<iMax;i++){
      for(var j=0,jMax=this.backM.length;j<jMax;j++){
        console.log(n[i] + ":" + this.backM[j]);
      }
    }
  }

  checkNum = function(yn,n,oc,ky){
    //yn:your card number    n:your numbers   b:back numbers
    var bingoCount = new Array();
    var cardSize = parseInt(this.gameM["cs"]);
    var x,y,z1=0,z2=0,k,c;
    for(var i=0;i<cardSize;i++){
      x = 0;
      y = 0;
      for(var j=0;j<cardSize;j++){
        k = i + (cardSize * j);
        if ( n.indexOf(yn[k]) == -1 ){
          x++;
        }
        k = (cardSize * i) + j;
        if ( n.indexOf(yn[k]) == -1 ){
          y++;
        }
      }
      k = ( cardSize + 1 ) * i;
      if ( n.indexOf(yn[k]) == -1 ){
        z1++;
      }
      k = (cardSize - 1) * i + cardSize - 1;
      if ( n.indexOf(yn[k]) == -1 ){
        z2++;
      }
      bingoCount.push(x, y);
    }

    bingoCount.push(z1, z2);

    var bingo,b = 0,r = 0;
    for (n in bingoCount) {
      if (bingoCount[n] == "0") {
        b++;
      }
      if (bingoCount[n] == "1") {
        r++;
      }
    }

    if(b>0){
      bingo = this.backM.length + 100;
    }else if(r>0){
      bingo = r ;
    }

    if( oc ){
      var pre = this.playersM[ky]["st"];
      //console.log(pre + "::" + bingo);
      if(pre <= bingo){
        //console.log("ok");
      }else{
        this.db.object('games/' + this.gameId + "/us/" + ky + "/st").remove();
      }
    }else{
      if(bingo != undefined){
        this.statusFire.set(bingo);
      }
    }
  }

  onGetNum(n){
    var i = this.yourNum.indexOf(n);
    if(i==-1){
      this.yourNum.push(n);
    　this.yourNum = this.yourNum.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
    }else{
      this.yourNum.splice(i,1);
    }
    this.checkNum(this.youM["nu"],this.yourNum,false,null);
  }

  onPushMsg(m){
    if(m != ""){
      var obj = {
        nm : this.youM['nm'],
        ic : this.youM['ic'],
        tm :  (new Date()).getTime(),
        tx : m,
        ur : this.uid
      }
      this.yourMsgsFire.push(obj);
      this.msgopen = false;
      document.getElementsByTagName("mat-sidenav")[0].scrollTop=0
    }
  }



  opened:boolean = false;

  msgopen: boolean = false;
  msgDelFlg: boolean = false;

  inviteopenPre: boolean = false;
  inviteopen: boolean = false;
  playerDelFlg: boolean = false;
  activeTab:string = "message";



  onInvite(){
    //this.sidenav.open();
    // this.selectedIndex++;
    // this.tab = this.activeTab = this.pageSP = 'player';
    //this.inviteopen = true;

    if(this.isSP){
      this.spNavClick('player');
      this.inviteopen = true;
    }else{
      this.opened = true;
      this.inviteopenPre = true;

      if(this.activeTab == 'player'){
        if(this.inviteopen){
          this.inviteopen = this.inviteopenPre = false;
        }else{
          this.inviteopen = this.inviteopenPre;
          this.inviteopenPre = false;
        }
      }else{
        this.selectedIndex++;;
      }
    }
  }


  sideNavOpen(){
    console.log("sideNavOpen()");
    this.opened = true;
  }

  sideNavClose(){
    this.opened =  false;
  }

  openMsg(){
    this.msgopen = true;
  }

  onDeleteMsg(){
    var a = document.getElementsByClassName("mat-checkbox-checked");
    var key,user;
    for(var i=0,iMax=a.length;i<iMax;i++){
      key = a[i].getAttribute("data-key");
      user= a[i].getAttribute("data-user");
      this.db.object('msgs/' + this.gameId + "/" + user + "/" + key).remove();
    }
  }

  closeMsg(){
    if(this.msgopen){
      this.msgopen = false;
    }else{
      this.msgDelFlg = true;
    }
  }

  openPlayer(){
    console.log("openplayer");
    console.log(this.inviteopen);
    this.inviteopen = !this.inviteopen;
  }

  closePlayer(){
    this.inviteopen = false;
    this.playerDelFlg = true;
  }

  //spメニュクリック
  spNavClick(m){
    this.page = this.pageSP = this.activeTab = m;
    this.navList = this.inviteopen = this.msgopen = false;
  }

  openSide(p: string){
    console.log("openSide:" + p + "?" + this.activeTab);
     if(this.activeTab == p){
       this.opened = !this.opened;
     }else{
       this.opened = true;
       this.activeTab = p;
     }
  }

  changeTab1(event){
    if(this.owner){
      if(event.index == 0){
        this.page = "ball";
      }else if(event.index == 1){
        this.page = "bingocard";
      }else if(event.index == 2){
        this.page = "back";
      }
    }else{
      if(event.index == 0){
        this.page = "bingocard";
      }else if(event.index == 1){
        this.page = "back";
      }
    }
  }

  changeTab2(event){
    console.log("changeTab2");
    if(event.index == 0){
      this.openSide("message");
    }else if(event.index == 1){
      this.openSide("player");
    }
    this.inviteopen = this.inviteopenPre;
    this.inviteopenPre = false;

  }


  keys(playersM) : number {
    //this.playersM
    var count = 0;
    for (var k in playersM) {
      if (playersM.hasOwnProperty(k)) {
         ++count;
      }
    }
    return count;
  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    try {
      (adsbygoogle = adsbygoogle || []).push({});
    } catch (e) {};
  }


  deldialogRef: MatDialogRef<DeleteDialog>;
  openDelDialog() {
    this.navList=false;
    this.deldialogRef = this.dialog.open(DeleteDialog, {
      disableClose: false
    });
    this.deldialogRef.afterClosed().subscribe(result => {
      if(result){
        this.db.list('msgs').remove(this.gameId).then(_ => {
          //msg deleted
          for (var k in this.playersM) {
            this.db.object('users/' + k + '/' + this.gameId).remove();
          }
          this.db.list('games').remove(this.gameId).then(_ => {
            //deleted game
            this.router.navigate(['/']);
          });
        });
      }
      this.deldialogRef = null;
    });
  }


  languagedialogRef: MatDialogRef<LanguageDialog>;
  openLanguageDialog() {
    this.navList=false;
    this.languagedialogRef = this.dialog.open(LanguageDialog, {
      disableClose: false
    });
    this.languagedialogRef.afterClosed().subscribe(result => {
      if(result){
        // this._translate.use(result);
        // this.languageService.setLa(result);
        console.log(result);
        //alert();
      }
      this.languagedialogRef = null;
    });
  }

  //onDeleteMsg
  delMsgdialogRef: MatDialogRef<DelMsgDialog>;
  openDelMsgDialog() {
    this.navList=false;
    this.delMsgdialogRef = this.dialog.open(DelMsgDialog, {
      disableClose: false
    });
    this.delMsgdialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onDeleteMsg();
      }
      this.delMsgdialogRef = null;
      this.msgDelFlg = false;
    });
  }

  delnumdialogRef: MatDialogRef<DelnumDialog>;
  onDeleteNum(n) {
    if(this.owner){
      var i = this.backM.indexOf(n)
      this.delnumdialogRef = this.dialog.open(DelnumDialog, {
        disableClose: false
      });
      this.delnumdialogRef.afterClosed().subscribe(result => {
        if(result){
          this.backM.splice(i,1);
          this.backFire.set(this.backM);
          if(this.backM.length >= this.gameM["mn"]){
            this.isOver = true;
          }else{
            this.isOver = false;
          }
        }
        this.delnumdialogRef = null;
      });
    }
  }

  signoutdialogRef: MatDialogRef<SignoutDialog>;
  openSignoutDialog(ids) {
    this.navList=false;
    this.signoutdialogRef = this.dialog.open(SignoutDialog, {
      disableClose: false
    });
    this.signoutdialogRef.afterClosed().subscribe(result => {
      if(result){
        if(ids){
          var doms = document.getElementsByClassName("playersDel mat-checkbox-checked");
          console.log(doms);
          for(var i=0,iMax=doms.length;i<iMax;i++){
          	var id = doms[i].getAttribute("data-user");
            this.signout(id,false);
          }
        }else{
          this.signout(this.uid,true);
        }
      }
      this.signoutdialogRef = null;
    });
  }

  signout(uid,redirect){
    if(this.playersM[uid]!=undefined){
      var player = this.playersM[uid];
      var you = {
        nm : player["nm"],
        ic : player["ic"]
      }

      this.db.list('msgs/' + this.gameId).remove(uid).then(_ => {
        //msg deleted
        this.db.object('games/' + this.gameId + '/ban/' + uid).set(you).then(_ => {
          //pushed ban list
          this.db.list('games/' + this.gameId + '/us').remove(uid).then(_ => {
            //deleted game uid

            this.db.list('users/'+ uid ).remove(this.gameId).then(_ => {
              //deleted game uid
              if(redirect){
                this.router.navigate(['/']);
                //location.href = "/";
              }
            });
          });
        });
      });

    }
  }

}


@Component({
  selector: 'delmsg-dialog',
  template: `
  <div>
    <p>Do you want to delete masseage ?</p>
    <div class="btns">
      <button mat-raised-button color="primary" (click)="dialogRef.close(false)">Close</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Delete Message</button>
    </div>
  </div>
  `,
  styleUrls: ['game.daialod.scss']
})
export class DelMsgDialog {
  constructor(public dialogRef: MatDialogRef<DelMsgDialog>) { }
}

@Component({
  selector: 'delNum-dialog',
  template: `
  <div>
    <p>Would you cancel Number?</p>
    <div class="btns">
      <button mat-raised-button color="primary" (click)="dialogRef.close(false)">Close</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Delete</button>
    </div>
  </div>
  `,
  styleUrls: ['game.daialod.scss']
})
export class DelnumDialog {
  constructor(public dialogRef: MatDialogRef<DelnumDialog>) { }
}

@Component({
  selector: 'signout-dialog',
  template: `
  <div>
    <p>If you sign out of the game , you can not join the game.</p>
    <p>Do you want to continue to sign out ?</p>
    <div class="btns">
      <button mat-raised-button color="primary" (click)="dialogRef.close(false)">Close</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Sign Out</button>
    </div>
  </div>
  `,
  styleUrls: ['game.daialod.scss']
})
export class SignoutDialog {
  constructor(public dialogRef: MatDialogRef<SignoutDialog>) { }
}

@Component({
  selector: 'delete-dialog',
  template: `
  <div>
    <p>If you delete the game , you can not join the game.</p>
    <p>Do you want to continue to delete ?</p>
    <div class="btns">
      <button mat-raised-button color="primary" (click)="dialogRef.close(false)">Close</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">Delete Game</button>
    </div>
  </div>
  `,
  styleUrls: ['game.daialod.scss']
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) { }
}

@Component({
  selector: 'language-dialog',
  template: `
  <div>
    <p>{{ 'language setting' }}</p>
    <mat-radio-group [(value)]="la" (change)="dialogRef.close($event.value)">
      <mat-radio-button name="la" value="en">English - 英語</mat-radio-button>
      <mat-radio-button name="la" value="ja">Japanese - 日本語</mat-radio-button>
    </mat-radio-group>
    <div class="btns">
      <button mat-raised-button color="primary" (click)="dialogRef.close(false)">{{'Close'}}</button>
    </div>
  </div>
  `,
  styleUrls: ['game.daialod.scss']
})
export class LanguageDialog {
  la:string;
  constructor(
    public dialogRef: MatDialogRef<LanguageDialog>,
    // private languageService : LanguageService,
  ) {
    this.la = "en";
  }
}
