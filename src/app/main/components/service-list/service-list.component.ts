import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConvertDataService } from './../../../core/services/convert-data.service';
import { FilterServicePipe } from './../../pipes/filter-service.pipe';
import { IUser, IService, IUserService } from './../../../core/models/request.model';
import { RequestService } from './../../../core/services/request.service';

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
  isChanged = false;

  serviceForm: FormGroup = this.fb.group({
    filterServices: [''],
    enabled: [],
    disabled: []
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

    this.serviceForm.controls.disabled = this.fb.group({});
    this.disabledServices.forEach(service => (
      this.serviceForm.controls.disabled as FormGroup).addControl(`${service.id}`, this.fb.control(false)));
    this.serviceForm.controls.disabled.valueChanges
      .subscribe(() => this.isChanged = true);

  }

  ngOnInit(): void {
  }

  clearFind(): void {
    this.serviceForm.patchValue({
      filterServices: ''
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
    const settingsObj = this.serviceForm.controls.disabled.value;
    const addedServices = Object.entries(settingsObj).reduce((acc, [key, value]) => value ? acc.concat([+key]) : acc, []);
    const updatedUser = {
      ...this.user,
      enabledServices: this.user.enabledServices.concat(addedServices),
    };

    addedServices.forEach(id => updatedUser.servicesEnableDates[id] = Date.now());

    this.requestService.updateUser(this.user.id, updatedUser)
      .subscribe(() => {
        this.isChanged = false;
        this.serviceClickHandler();
      });
  }

}
