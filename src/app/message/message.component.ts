import { Component,EventEmitter,Input,Output,OnInit,OnChanges,SimpleChange} from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})

export class MessageComponent implements OnInit {
  @Input('msgsM') msgsM;
  @Input('playersM') playersM;
  @Input('banM') banM;
  @Input('uid') uid;
  @Input('ownerId') ownerId;
  @Input('msgDelFlg') msgDelFlg;
  @Input('playerDelFlg') playerDelFlg;
  @Input('tab') tab;
  @Input('gameM') gameM;

  isVisible = {};

  icons : string[] = [
    "bat","bear","bee","bird","bug","butterfly","cat","chicken",
    "coala","crocodile","dinosaur","dog","dolphin","duck","eagle",
    "elephant","fish","flamingo","fox","frog","giraffe","gorilla",
    "horse","leopard","lion","mouse","panda","parrot","penguin",
    "shark","snake","spider","tiger","turtle","wolf","zebra"
  ];
  constructor(){
    //console.log(this.msgsM);
  }

  ngOnInit() {
    for(var key in this.playersM) {
      if(!(key in this.isVisible)){
        this.isVisible[key] = false;
      }
    }
  }

  keys() : Array<string> {
    return Object.keys(this.playersM);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if( (propName == 'playersM') && (changes[propName].currentValue != changes[propName].previousValue) ){
        for(var key in this.playersM) {
          if(!(key in this.isVisible)){
            this.isVisible[key] = false;
          }
        }
      }
    }
  }

}
