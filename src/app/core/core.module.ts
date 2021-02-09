import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule
  ]
})
export class CoreModule { }
