import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { HomeOfficeComponent } from './home-office.component';


@NgModule({
  declarations: [HomeOfficeComponent],
  imports: [
    CommonModule,
    OfficeRoutingModule
  ]
})
export class OfficeModule { }
