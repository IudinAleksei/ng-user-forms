import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { EnabledServicesPipe } from '../../pipes/enabled-services.pipe';
import { IUserConverted, IUserService } from './../../../core/models/request.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  providers: [EnabledServicesPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit, OnChanges {
  @Input() user: IUserConverted;
  enabledServices: IUserService[] = [];
  disabledServices: IUserService[] = [];

  serviceForm: FormGroup;

  constructor(private fb: FormBuilder, private enableServicePipe: EnabledServicesPipe) {  }

  ngOnChanges(): void {
    this.enabledServices = this.enableServicePipe.transform(this.user.enabledServices, true);
    this.disabledServices = this.enableServicePipe.transform(this.user.enabledServices, false);

    this.serviceForm = this.fb.group({
      serviceName: [''],
      // enabledServices: this.enabledServices
      //   .reduce((acc, service) => ({ ...acc, [service.id]: this.fb.control(true)}), {}),
      // disabledServices: this.disabledServices
      //   .reduce((acc, service) => ({ ...acc, [service.id]: this.fb.control('true')}), {}),
    });
  }

  ngOnInit(): void {
  }

  clearFind(): void {
    this.serviceForm.patchValue({
      serviceName: ''
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.serviceForm.value);
  }

}
