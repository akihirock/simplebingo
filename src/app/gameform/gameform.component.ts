import { Component,OnInit,Input,Injector,Output,EventEmitter} from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { GameService } from "../shared/services/gamemodel.service";
import { RouterModule, Routes , Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'gameform',
  templateUrl: 'gameform.component.html',
  styleUrls: ['gameform.component.scss']
})

export class GameformComponent implements OnInit{

  public f: FormGroup;
  game ;
  max = 99;
  min = 24;
  numbers = [];
  status = true;
  @Input('pcFlg') pcFlg: boolean ;
  @Output() onToUserForm = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gameService : GameService,
  ) {
    this.game = gameService.getGame();
  }

  ngOnInit() {
    this.f = this.fb.group({
      'title':['', Validators.required],
      'cardSize':['5'],
      'number':['78'],
      'numberSlider':['78'],
      'message':[''],
    });
    for(var i= this.min; i <= this.max;i++ ){
      this.numbers.push({value:i+""});
    }
  }

  changeSlider(e){
    this.f.controls['number'].setValue(e.value+"");
  }

  changeNumber(e){
    this.f.controls['numberSlider'].setValue(e.value);
  }

  changeCardSize(e){
    if(e.value==5){
      this.min = 24;
      if(this.f.controls['number'].value<24){
        this.f.controls['number'].setValue("24");
        this.f.controls['numberSlider'].setValue("24");
      }
    }else{
      this.min = 8;
    }
    this.numbers = [];
    for(var i= this.min; i < this.max;i++ ){
      this.numbers.push({value:i+""});
    }
  }

  check(){
    this.game.tt = this.f.controls['title'].value;
    this.game.mn = this.f.controls['number'].value;
    this.game.cs = this.f.controls['cardSize'].value;
    this.game.tx = this.f.controls['message'].value;
    this.game.sd = false;

    if(this.pcFlg){
      this.onToUserForm.emit(true);
    }else{
      this.router.navigate(['/userform']);
    }

  }

}
