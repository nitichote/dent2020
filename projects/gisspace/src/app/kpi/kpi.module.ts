import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiHomeComponent } from './kpi-home.component';


@NgModule({
  declarations: [KpiHomeComponent],
  imports: [
    CommonModule,
    KpiRoutingModule
  ]
})
export class KpiModule { }
