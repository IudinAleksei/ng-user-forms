import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CoreModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
