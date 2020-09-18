import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { D1000Component } from './d1000.component';


@NgModule({
  declarations: [D1000Component],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
