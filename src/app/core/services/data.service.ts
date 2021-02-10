import { IRequest } from './../models/request.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private data: IRequest;

  constructor() { }

  write(item: IRequest): void {
    this.data = item;
  }

  read(): IRequest {
    return this.data;
  }
}
