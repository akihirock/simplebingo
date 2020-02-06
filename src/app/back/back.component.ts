import { Component,Input,Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';

@Component({
  selector: 'back',
  templateUrl: 'back.component.html',
  styleUrls: ['back.component.scss']
})

export class BackComponent implements OnInit {
  maxNum: number = 60;
  nums : number[];
  icons : number[];
  cardsize : number = 5;
  cardwidth : number;
  basewidth : number;
  lingheight : number;
  fontsize : number;
  fontsizeIndex:number;
  tdSize : number = 5;
  tdW : number = 1;
  debug ;
  @Input('opened') opened: boolean;
  @Input('gameM') gameM;
  @Input('backM') backM;
  @Output() onDeleteNum = new EventEmitter<string>();

  constructor(){
    //console.log(this.gameM);
    this.initsize();
  }

  deleteNum(n) {
    if( this.backM.indexOf(n) != -1  ){
      this.onDeleteNum.emit(n);
    }
  }

  ngOnInit() {
    this.maxNum = this.gameM["mn"];
    this.nums = [];
    for(var i=1;i<=this.gameM.mn;i++){
      this.nums.push(i);
    }
    this.initsize();
  }

  initsize(){
    var wih = window.innerHeight - 120;
    var wiw = window.innerWidth - 40 ;
    console.log(this.opened + "::" + wiw);
    if(this.opened){
      wiw = wiw - 320;
    }
    console.log(this.opened + "::" + wiw);
    this.debug = wiw;
    this.tdSize = 5;
    this.tdW = 1;
    for (var nw = 5; nw <= 20; nw = nw + 5) {
      for(var wh = 50 ; wh < 200 ; wh = wh + 1  ){
        var nh = Math.ceil(this.maxNum / nw );
        if(( (wh * wh) < (wih * wiw/nw/nh) ) &&
           ( wh < wiw/nw ) &&
           ( wh < wih/nh ) &&
           ( this.tdW < wh )){
           this.tdW = wh;
           this.tdSize = nw;
           //console.log( this.tdW + "::" + this.tdSize );
        }
      }
    }
    if(this.tdW==1){
      this.tdW = wiw/5 - 10;;
    }
    this.cardwidth = this.tdW;
    this.basewidth = this.tdSize * this.tdW + 1;
    this.lingheight =  this.cardwidth*9/10;
    this.fontsize = this.cardwidth*0.45;
    this.fontsizeIndex = this.cardwidth/4;
  }

  onResize(event) {
    this.initsize();
  }

  isHit(n){
    var flg = false;
    if( this.backM!=null && this.backM.indexOf(n) != -1  ){
      flg = true;
    }
    return flg;
  }

  index(n){
    if(this.backM!=null){
      var i = this.backM.indexOf(n);
      if( i != -1 ){
        return i + 1;
      }else{
        return "";
      }
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if( (propName == 'opened') && (changes[propName].currentValue != changes[propName].previousValue) ){
        this.initsize();
      }
    }
  }


}
