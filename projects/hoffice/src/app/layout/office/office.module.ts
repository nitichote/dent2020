import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { HomeOfficeComponent } from './home-office.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [HomeOfficeComponent],
  imports: [AccordionModule.forRoot(),
    CommonModule,
    OfficeRoutingModule
  ]
})
export class OfficeModule { }
