import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { HomeOfficeComponent } from './home-office.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharelibModule } from 'src/app/sharelib/sharelib.module';
import { FormsModule }    from '@angular/forms';
@NgModule({
  declarations: [HomeOfficeComponent],
  imports: [AccordionModule.forRoot(),FormsModule,
    CommonModule,SharelibModule,
    OfficeRoutingModule
  ]
})
export class OfficeModule { }
