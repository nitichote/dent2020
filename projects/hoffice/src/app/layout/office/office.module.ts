import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { HomeOfficeComponent } from './home-office.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharelibModule } from 'src/app/sharelib/sharelib.module';

@NgModule({
  declarations: [HomeOfficeComponent],
  imports: [AccordionModule.forRoot(),
    CommonModule,SharelibModule,
    OfficeRoutingModule
  ]
})
export class OfficeModule { }
