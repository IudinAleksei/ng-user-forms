import { Pipe, PipeTransform } from '@angular/core';
import { IService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'findService'
})
export class FindServicePipe implements PipeTransform {

  transform(services: IService[] = [], find: string = ''): IService[] {
    const filteredServices = services.filter((service) => service.title.toLowerCase().includes(find.toLowerCase()));
    return filteredServices;
  }

}
