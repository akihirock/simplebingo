import { Component,EventEmitter,Input,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bingocard',
  templateUrl: 'bingocard.component.html',
  styleUrls: ['bingocard.component.scss']
})

export class BingocardComponent {

  @Input('navopen') navopen: boolean;
  @Input('backM') backM;
  @Input('gameM') gameM;
  @Input('youM') youM;
  @Input('yourNum') yourNum;
  @Input('rnd') rnd;
  @Input('onStartFlg') onStartFlg;


  @Output() onGetNum = new EventEmitter<string>();

  constructor(){
  }

  isHit(n){
    var flg = false;
    if( (this.backM!= null ) && ( (this.backM.indexOf(n) != -1 ) || (n==0) )){
      flg = true;
    }
    return flg;
  }

  isGet(n){
    var flg = false;
    if( (this.yourNum.indexOf(n) != -1 ) || (n==0) ){
      flg = true;
    }
    return flg;
  }

  cardNum(){
    if(this.rnd!=0){
      return this.rnd;
    }else{
      return 'B';
    }
  }

  getNum(n){
    this.onGetNum.emit(n);
  }

}
