import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { CalcServiceNumberPipe } from './pipes/calc-service-number.pipe';
import { CalcPayPipe } from './pipes/calc-pay.pipe';
import { FindServicePipe } from './pipes/find-service.pipe';
import { FilterServicePipe } from './pipes/filter-service.pipe';
import { RusDatePipe } from './pipes/rus-date.pipe';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    ServiceListComponent,
    CalcServiceNumberPipe,
    CalcPayPipe,
    FindServicePipe,
    FilterServicePipe,
    RusDatePipe
  ],
  imports: [
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
