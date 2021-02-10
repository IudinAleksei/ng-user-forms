import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
  serviceForm = this.fb.group({
    serviceName: [''],
    clearButton: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.services = this.data.services;
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.serviceForm.value);
  }

  get aliases(): FormArray {
    return this.serviceForm.get('aliases') as FormArray;
  }

  addAlias(): void {
    this.aliases.push(this.fb.control(''));
  }
}
