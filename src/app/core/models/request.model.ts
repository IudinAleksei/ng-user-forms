export interface IRequest {
  settings: {};
  users: IUser[];
  services: IService[];
}

export interface IService {
  id: number;
  title: string;
  fee: number;
}

export interface IUser {
  id: number;
  name: string;
  enabledServices: number[];
  servicesEnableDates: IServicesEnable;
}

export interface IServicesEnable {
  [key: string]: number
}
