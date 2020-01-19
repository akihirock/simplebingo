import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bingo_type' })
export class BingoTypePipe implements PipeTransform {
    transform(value: number, age: number): number {
        let type;
        switch (value) {
            case 0:
                if(age==1){
                  type = 'B';
                }else{
                  type = 'Bingo';
                }
                break;
            default:
                type = value;
                break;
        }
        return type;
    }
}
