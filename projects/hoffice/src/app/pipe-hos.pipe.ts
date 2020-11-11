import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeHos'
})
export class PipeHosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let v:any = value;
    let a0=args[0];
    if(a0==1){
v.filter(x=>{
  return x.
});
    }
    if(a0==2){

    }
    if(a0==3){

    }
    return null;
  }

}
