import { SessionStorageService } from './services/session-storage.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './services/request.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    RequestService,
    SessionStorageService
  ]
})
export class CoreModule { }
