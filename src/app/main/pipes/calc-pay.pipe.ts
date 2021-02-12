import { Pipe, PipeTransform } from '@angular/core';
import { IService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'calcPay'
})
export class CalcPayPipe implements PipeTransform {

  transform(enabledServices: number[] = [], services: IService[] = []): number {
    const pay = services.reduce(
      (acc: number, service: IService): number => (enabledServices.includes(service.id)) ? acc += service.fee : acc, 0);
    return pay;
  }

}
