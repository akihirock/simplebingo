import { Component} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LanguageDialog } from '../game/game.component';

// import { ActivatedRoute,Router } from '@angular/router';
// import { MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
// import { TranslateService } from './translate';
// import { LanguageDialog } from './game.component';
// import { LanguageService } from "./languagemodel.service";
// import { GameService } from "./gamemodel.service";

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent{
  translate;
  _router;
  la:string;
  constructor(
    public dialog: MatDialog
    // private router: Router,
    // private languageService : LanguageService,
    // private _translate: TranslateService,
    // private _gameService:GameService
  ){
    // this._router = router;
    // var la = languageService.getLa();
    // _translate.use(la);
    // this.translate =_translate;
    //
    // if(la=="en"){
    //   this.la = "";
    // }else{
    //   this.la = la;
    // }
  }

  navList: boolean = false;
  //
  // game;


  languagedialogRef: MatDialogRef<LanguageDialog>;
  openLanguageDialog() {
    //this.navList=false;
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



}
