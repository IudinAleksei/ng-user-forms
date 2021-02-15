import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConvertDataService } from './../../../core/services/convert-data.service';
import { FilterServicePipe } from './../../pipes/filter-service.pipe';
import { IUser, IService, IUserService } from './../../../core/models/request.model';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  providers: [FilterServicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  @Input() services: IService[];
  @Output() changeUserServices = new EventEmitter<void>();
  enabledServices: IUserService[];
  disabledServices: IUserService[];

  serviceForm: FormGroup = this.fb.group({
    serviceName: ['']
  });

  constructor(
    private fb: FormBuilder, private filterService: FilterServicePipe,
    private convertService: ConvertDataService, private requestService: RequestService
  ) { }

  ngOnChanges(): void | undefined {
    if (!this.user || !this.services) {
      return;
    }

    const convertedServices = this.convertService.convertData(this.user, this.services);

    this.enabledServices = this.filterService.transform(convertedServices, true);
    this.disabledServices = this.filterService.transform(convertedServices, false);
  }

  ngOnInit(): void {
  }

  clearFind(): void {
    this.serviceForm.patchValue({
      serviceName: ''
    });
  }

  serviceClickHandler(): void {
    this.changeUserServices.emit();
  }

  removeServiceHandler(id: number): void {
    const updatedServices = this.user.enabledServices.filter((serviceId) => serviceId !== id);
    const updatedUser = { ...this.user, enabledServices: updatedServices };
    delete updatedUser.servicesEnableDates[id];
    this.requestService.updateUser(this.user.id, updatedUser)
      .subscribe(() => this.serviceClickHandler());
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.serviceForm.value);
  }

}
