// export interface IRequest {
//   settings: {};
//   users: IUser[];
//   services: IService[];
// }

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
  date: number;
}

export interface IUser {
  id: number;
  name: string;
  enabledServices: number[];
  servicesEnableDates: IServicesEnable;
}

export interface IServicesEnable {
  [key: string]: number;
}

export interface ISettings {
  id: number;
  name: string;
  psevdo: string;
  enableNotification: boolean;
  notification: INotification;
}

export interface INotification {
  type: string;
  email?: string;
  phone?: number;
}
