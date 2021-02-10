import { Injectable } from '@angular/core';
import { IRequest, IUser } from './../models/request.model';

@Injectable()
export class DataService {
  private cachedRequest: IRequest;
  private selectedUser: IUser;

  constructor() { }

  writeRequest(request: IRequest): void {
    this.cachedRequest = request;
  }

  readRequest(): IRequest {
    return this.cachedRequest;
  }

  writeUser(user: IUser): void {
    this.selectedUser = user;
  }

  readUser(): IUser {
    return this.selectedUser;
  }
}
