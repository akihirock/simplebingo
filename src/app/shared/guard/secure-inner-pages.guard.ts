import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map ,take,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    if(this.authService.isLoggedIn) {
      var uid = this.authService.getUserID.uid;
      var usersRef = this.db.object("users/" + uid);
      var gid = next.params['id'];
      var r = this.router;
      return usersRef.valueChanges().pipe(take(1),map(
        function(x){
           if(x[gid]){
             //alert("ok");
             //this.router.navigate(['/game',gid]);
             return true;
           }else{
             //alert("ng");
             //return false;
             r.navigate(['/']);
           }
        }
      ));



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
