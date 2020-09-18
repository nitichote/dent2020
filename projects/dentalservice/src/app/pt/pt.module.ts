
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharelibModule } from './../service/sharelib.module';
import { PtRoutingModule } from './pt-routing.module';
import { RegisterComponent } from './register.component';
import { RegisShowComponent } from './regis-show.component';
import { RegisAddNewComponent } from './regis-add-new.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent, RegisShowComponent, RegisAddNewComponent],
  imports: [
    CommonModule,FormsModule,
    PtRoutingModule,SharelibModule
  ]
})
export class PtModule { }
