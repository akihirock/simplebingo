import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
    id: string;
    cs: number = 5;
    mn: number = 75;
    ic: number;
    la: string;
    nm: string;
    nu: number[];
    ow: string;
    tx: string;
    tm: number;
    tt: string;
    ul: string;
    us: any;

    constructor(){}

    getGame() {
    　return this;
    }

    // setTitle(title){
    //   this.tt = title;
    // }

}
