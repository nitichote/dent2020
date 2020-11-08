import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxRoutingModule } from './tx-routing.module';
import { PtComponent } from './pt.component';
import { SharelibModule } from '../service/sharelib.module';
import { TplanComponent } from './tplan.component';
import { PtvisitComponent } from './ptvisit.component';
import { PtBodyComponent } from './pt-body.component';


@NgModule({
  declarations: [PtComponent, TplanComponent, PtvisitComponent, PtBodyComponent],
  imports: [SharelibModule,
    CommonModule,
    TxRoutingModule
  ]
})
export class TxModule { }
