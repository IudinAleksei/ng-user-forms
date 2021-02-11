import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { CalcServiceNumberPipe } from './pipes/calc-service-number.pipe';
import { CalcPayPipe } from './pipes/calc-pay.pipe';
import { EnabledServicesPipe } from './pipes/enabled-services.pipe';
import { FindServicePipe } from './pipes/find-service.pipe';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    ServiceListComponent,
    CalcServiceNumberPipe,
    CalcPayPipe,
    EnabledServicesPipe,
    FindServicePipe
  ],
  imports: [
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
