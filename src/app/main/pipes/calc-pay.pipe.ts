import { Pipe, PipeTransform } from '@angular/core';
import { IUserService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'calcPay'
})
export class CalcPayPipe implements PipeTransform {

  transform(services: IUserService[]): number {
    const pay = services.reduce((acc: number, service: IUserService): number => acc += service.fee, 0);
    return pay;
  }

}
