import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CoreModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
