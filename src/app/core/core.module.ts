import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './services/request.service';
import { DataService } from './services/data.service';
import { ConvertDataService } from './services/convert-data.service';
import { SessionStorageService } from './services/session-storage.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    RequestService,
    SessionStorageService,
    DataService,
    ConvertDataService
  ]
})
export class CoreModule { }
