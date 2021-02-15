import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private selectedUser = 1;

  constructor() { }

  writeUser(user: number): void {
    this.selectedUser = user;
  }

  readUser(): number {
    return this.selectedUser;
  }
}
