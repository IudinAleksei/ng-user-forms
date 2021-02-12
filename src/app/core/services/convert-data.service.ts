import { Injectable } from '@angular/core';
import { IUser, IUserService, IService } from './../models/request.model';

@Injectable()
export class ConvertDataService {

  constructor() { }

  convertData(user: IUser, services: IService[]): IUserService[] {
    const convertedServices: IUserService[] = services.map((service: IService) => ({
      ...service,
      isEnable: user.enabledServices.includes(service.id),
      date: user.servicesEnableDates[service.id] || 0,
    }));
    return convertedServices;
  }
}
