import { Component, Input, OnInit } from '@angular/core';
import { IUser, IRequest, IService } from './../../../core/models/request.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  @Input() data: IRequest;
  @Input() user: IUser;
  services: IService[];
  value = '';

  constructor() { }

  ngOnInit(): void {
    this.services = this.data.services;
  }
}
