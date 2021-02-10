import { SessionStorageService } from './services/session-storage.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './services/request.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    RequestService,
    SessionStorageService,
    DataService
  ]
})
export class CoreModule { }
