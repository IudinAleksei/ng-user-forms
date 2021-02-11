import { Injectable } from '@angular/core';
import { IUserConverted } from './../models/request.model';

@Injectable()
export class DataService {
  private cachedRequest: IUserConverted[];
  private selectedUser: IUserConverted;

  constructor() { }

  writeRequest(request: IUserConverted[]): void {
    this.cachedRequest = request;
  }

  readRequest(): IUserConverted[] {
    return this.cachedRequest;
  }

  writeUser(user: IUserConverted): void {
    this.selectedUser = user;
  }

  readUser(): IUserConverted {
    return this.selectedUser;
  }
}
