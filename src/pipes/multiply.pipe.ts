import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {

  transform(value: number | undefined, multiply: number) {
    if (typeof value != 'undefined') {
      return value * multiply
    } else {
      return 0
    }
  }

}
