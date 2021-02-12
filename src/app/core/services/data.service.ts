import { Injectable } from '@angular/core';
import { IUserConverted } from './../models/request.model';

@Injectable()
export class DataService {
  private selectedUser = 1;

  constructor() { }

  writeUser(user: number): void {
    this.selectedUser = user;
    console.log('write: ', user);
  }

  readUser(): number {
    console.log('read: ', this.selectedUser);
    return this.selectedUser;
  }
}
