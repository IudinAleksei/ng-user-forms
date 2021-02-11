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

export interface IUserService {
  id: number;
  title: string;
  fee: number;
  isEnable: boolean;
}

export interface IUser {
  id: number;
  name: string;
  enabledServices: number[];
  servicesEnableDates: IServicesEnable;
}

export interface IUserConverted {
  id: number;
  name: string;
  enabledServices: IUserService[];
  servicesEnableDates: IServicesEnable;
}

export interface IServicesEnable {
  [key: string]: number
}
