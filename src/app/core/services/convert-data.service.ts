import { Injectable } from '@angular/core';
import { IRequest, IUser, IUserService, IUserConverted } from './../models/request.model';

@Injectable()
export class ConvertDataService {

  constructor() { }

  convertData({ users, services }: IRequest): IUserConverted[] {
    const convertedUsers: IUserConverted[] = users.map((user: IUser): IUserConverted => {
      const convUserServices = services.map((service) => (
        {
          ...service,
          isEnable: user.enabledServices.includes(service.id),
          date: user.servicesEnableDates[service.id]
        }
      ));
      return ({ ...user, enabledServices: convUserServices });
    });
    console.log(convertedUsers);
    return convertedUsers;
  }
}
