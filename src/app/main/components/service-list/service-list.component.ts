import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConvertDataService } from './../../../core/services/convert-data.service';
import { FilterServicePipe } from './../../pipes/filter-service.pipe';
import { IUser, IService, IUserService } from './../../../core/models/request.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  providers: [

    FilterServicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  @Input() services: IService[];
  enabledServices: IUserService[];
  disabledServices: IUserService[];

  serviceForm: FormGroup = this.fb.group({
    serviceName: ['']
  });

  constructor(
    private fb: FormBuilder, private filterService: FilterServicePipe,
    private convertService: ConvertDataService
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

  removeServiceHandler(id: number): void {
    console.log(id);
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.serviceForm.value);
  }

}
