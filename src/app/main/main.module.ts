import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    ServiceListComponent
  ],
  imports: [
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
