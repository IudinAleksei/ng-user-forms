import { Injectable } from '@angular/core';
import { IUserConverted } from './../models/request.model';

@Injectable()
export class DataService {
  private cachedRequest: IUserConverted[];
  private selectedUser = 1;

  constructor() { }

  writeRequest(request: IUserConverted[]): void {
    this.cachedRequest = request;
  }

  readRequest(): IUserConverted[] {
    return this.cachedRequest;
  }

  writeUser(user: number): void {
    this.selectedUser = user;
  }

  readUser(): number {
    return this.selectedUser;
  }
}
