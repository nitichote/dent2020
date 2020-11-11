import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharelibModule } from "src/app/sharelib/sharelib.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
//import { HofficeService } from "../service/hoffice_service";

@NgModule({
  declarations: [LayoutComponent, DashboardComponent],
  imports: [
    //  HofficeService,
    HttpClientModule,
    FormsModule,
    SharelibModule,
    CommonModule,
    LayoutRoutingModule,
  ],
  exports:[SharelibModule,]
})
export class LayoutModule {}
