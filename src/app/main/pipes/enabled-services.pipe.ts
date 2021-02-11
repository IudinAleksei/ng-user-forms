import { Pipe, PipeTransform } from '@angular/core';
import { IUserService } from 'src/app/core/models/request.model';

@Pipe({
  name: 'enabledServices'
})
export class EnabledServicesPipe implements PipeTransform {

  transform(services: IUserService[], enabled: boolean = true): IUserService[] {
    const enabledServices = services.filter((service: IUserService): boolean => service.isEnable === enabled);
    return enabledServices;
  }

}
