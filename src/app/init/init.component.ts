import { Component} from '@angular/core';
import { GameService } from "../shared/services/gamemodel.service";
// import { LanguageService } from "./languagemodel.service";
// import { LanguageDialog } from './game.component';
// import { WindowRef } from './WindowRef';
// import { GameformComponent } from './gameform.component';
// import { LoadComponent } from './load.component';

import { RouterModule, Routes , Router} from '@angular/router';


@Component({
  selector: 'init',
  templateUrl: 'init.component.html',
  styleUrls: ['init.component.scss']
})
export class InitComponent {

  navList: boolean = false;
  winRef;

  componentData = null;
  loadData = null;

  pcFlg: boolean = true;
  gameUserFlg: boolean = true;
  game;

  constructor(
      // winRef: WindowRef,
      // private route: ActivatedRoute,
      // private router: Router,
      // private languageService : LanguageService,
      // private titleService: Title,
      private router: Router,
      private gameService : GameService,
    ){
    // languageService.setLa('en');
    // titleService.setTitle("simple bingo - free online bingo web application");

    console.log("init");

    this.game = gameService.getGame();
    if(this.game.fl == "invite"){
      var body = document.getElementsByTagName("body")[0];
      body.className = "invite";
      this.gameUserFlg = false;
    }else{
      if( (window.innerWidth) <= 640 ){
        this.pcFlg = false;
      }
    }

  }

  onToUserForm(n){
    this.gameUserFlg = !n;
  }

  onToGameForm(n){
    this.gameUserFlg = !n;
  }

  check(){
    this.router.navigate(['/test']);
  }

}
