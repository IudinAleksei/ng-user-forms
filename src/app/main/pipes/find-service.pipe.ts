import { Pipe, PipeTransform } from '@angular/core';
import { IUserService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'findService'
})
export class FindServicePipe implements PipeTransform {

  transform(services: IUserService[], find: string = ''): IUserService[] {
    const filteredServices = services.filter((service) => service.title.toLowerCase().includes(find.toLowerCase()));
    return filteredServices;
  }

}
