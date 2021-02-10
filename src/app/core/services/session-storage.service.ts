import { Injectable } from '@angular/core';
import { IRequest } from './../models/request.model';

const REQUEST_KEY = 'request_data';

@Injectable()
export class SessionStorageService {

  constructor() { }

  writeRequest(item: IRequest): void {
    const stringified = JSON.stringify(item);
    sessionStorage.setItem(REQUEST_KEY, stringified);
  }

  readRequest(): IRequest {
    const storageItem = sessionStorage.getItem(REQUEST_KEY);
    const parsed = JSON.parse(storageItem);
    return parsed;
  }
}
