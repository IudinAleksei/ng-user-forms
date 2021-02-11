import { Pipe, PipeTransform } from '@angular/core';
import { IUserService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'calcServiceNumber'
})
export class CalcServiceNumberPipe implements PipeTransform {

  transform(services: IUserService[]): number {
    return services.length;
  }

}
