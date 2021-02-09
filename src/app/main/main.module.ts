import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [MainComponent, UserListComponent, ServiceListComponent],
  imports: [
    CoreModule,
    MainRoutingModule
  ]
})
export class MainModule { }
