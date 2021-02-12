import { Pipe, PipeTransform } from '@angular/core';
import { IUserService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(services: IUserService[], isEnable: boolean = true): IUserService[] {
    const filteredServices = services.filter((service) => service.isEnable === isEnable);
    return filteredServices;
  }

}
