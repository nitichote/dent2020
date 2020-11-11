import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeHospitals'
})
export class PipeHospitalsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
