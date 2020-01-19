import { Component,Input,Output,EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ball',
  templateUrl: 'ball.component.html',
  styleUrls: ['ball.component.scss']
})

export class BallComponent{

  @Input('navopen') navopen: boolean ;
  @Input('rnd') rnd: number ;
  @Input('onStartFlg') onStartFlg: string ;
  @Input('isOver') isOver: boolean ;

  @Output() onStart = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<string>();
  @Output() onInvite = new EventEmitter<string>();


  constructor() {}

  start() {
    this.onStart.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  invite() {
    this.onInvite.emit();
  }


  gogo(){
  }

}
