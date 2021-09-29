import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstCapLetter'
})
export class FirstCapLetterPipe implements PipeTransform {

  /**
   * Capitalizes the first letter of a string
   * Example: "this is a string" -> "This is a string"
   */
  transform(value: string | undefined): string | undefined {
    if (typeof value == "string") {
      let first = value?.substr(0, 1).toUpperCase();
      return first + value.substr(1);
    } else {
      return undefined
    }
  }

}
