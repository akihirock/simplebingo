import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map ,take,tap } from 'rxjs/operators';
import { GameService } from "../services/gamemodel.service";

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private gameService : GameService,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean>{
    if(this.authService.isLoggedIn) {

      var body = document.getElementsByTagName("body")[0];
      body.className = "";


      let _router = this.router;
      let _gameService = this.gameService;
      var gid = next.params['id'];
      console.log("gid:" + gid);

      var uid = this.authService.getUserID.uid;
      var usersRef = this.db.object("users/" + uid);
      var gamesRef = this.db.object("games/" + gid);

      //return true;
      return gamesRef.valueChanges().pipe(take(1),map(
        function(g){
          if(g && g["tt"]){
            console.log("1");
            if(g["ban"]){
              //不参加
              var ban = g["ban"];
              if(ban[uid]){
                _router.navigate(['/over']);
                return false;
              }
            }
            if(g["us"] && g["us"][uid]){
              console.log("2");
              //参加中
              return true;
            }else{
              console.log("3");
              //招待
              var gm = _gameService.getGame();
              gm.id = gid;
              gm.tt = g['tt'];
              gm.tx = g['tx'];
              gm.cs = g['cs'];
              gm.mn = g['mn'];
              gm.nm = "";
              gm.ic = g['ic'];
              gm.fl = "invite"
              _router.navigate(['/']);
              return false;
            }
          }else{
            console.log("4");
            //終了
            _router.navigate(['/over']);
            return false;
          }
        }
      ));



      //
      // return usersRef.valueChanges().pipe(take(1),map(
      //   function(x){
      //      if(x[gid]){
      //        //alert("ok");
      //        //this.router.navigate(['/game',gid]);
      //        return true;
      //      }else{
      //        //alert("ng");
      //        //return false;
      //        r.navigate(['/']);
      //      }
      //   }
      // ));



      // return usersRef.valueChanges().pipe(take(1),map(user => !!user),
      // tap(loggedIn => {
      //   if (!loggedIn) {
      //
      //   }
      // }));


    }

  }


  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if(this.authService.isLoggedIn) {
  //      //window.alert("You are already signed in, access denied!");
  //      // var uid = this.authService.getUserID.uid;
  //      // window.alert(uid);
  //
  //      var uid = this.authService.getUserID.uid;
  //      var usersRef = this.db.object("users/" + uid);
  //      var gid = next.params['id'];
  //
  //      //var gid = "-Lz7q9xe6-kB9N4vSvK_";
  //      usersRef.valueChanges().pipe(take(1),)
  //        .subscribe(u => {
  //          console.log(u);
  //          if(u[gid]){
  //            //alert("ok");
  //            //this.router.navigate(['/game',gid]);
  //            return true;
  //          }else{
  //            //alert("ng");
  //            this.router.navigate(['/']);
  //          }
  //        }
  //      );
  //
  //
  //      //this.router.navigate(['user-profile'])
  //   }
  //
  // }


}
