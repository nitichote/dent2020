import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiHomeComponent } from './kpi-home.component';
import { SharelibModule } from '../service/sharelib.module';
import { KpiShareComponent } from './kpi-share.component';
import { KpiMapComponent } from './kpi-map.component';


@NgModule({
  declarations: [KpiHomeComponent, KpiShareComponent, KpiMapComponent],
  imports: [SharelibModule,
    CommonModule,
    KpiRoutingModule
  ]
})
export class KpiModule { }
