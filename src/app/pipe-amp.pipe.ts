import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pipeAmp",
})
export class PipeAmpPipe implements PipeTransform {
  transform(value: any[], y: string): any[] {
    return value.filter((x) => x.distid == y);
  }
}
