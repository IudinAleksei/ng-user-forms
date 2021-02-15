import { Injectable } from '@angular/core';
import { IUser } from './../models/request.model';

const REQUEST_KEY = 'request_data';

@Injectable()
export class SessionStorageService {

  constructor() { }

  writeRequest(item: IUser[]): void {
    const stringified = JSON.stringify(item);
    sessionStorage.setItem(REQUEST_KEY, stringified);
  }

  readRequest(): IUser[] {
    const storageItem = sessionStorage.getItem(REQUEST_KEY);
    const parsed = JSON.parse(storageItem);
    return parsed;
  }
}
