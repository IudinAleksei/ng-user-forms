import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rusDate'
})
export class RusDatePipe implements PipeTransform {

  transform(date: number): string {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString('ru-RU');
  }

}
