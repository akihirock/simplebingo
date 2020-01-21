import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map ,take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn) {
       //window.alert("You are already signed in, access denied!");
       // var uid = this.authService.getUserID.uid;
       // window.alert(uid);

       var uid = this.authService.getUserID.uid;
       var usersRef = this.db.object("users/" + uid);
       var gid = next.params['id'];

       //var gid = "-Lz7q9xe6-kB9N4vSvK_";
       usersRef.valueChanges().pipe(take(1),)
         .subscribe(u => {
           console.log(u);
           if(u[gid]){
             alert("ok");
           }else{
             alert("ng");
           }
         }
       );

       //this.router.navigate(['user-profile'])
    }
    return true;
  }


}
