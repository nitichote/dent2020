import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DpersonRoutingModule } from "./dperson-routing.module";
import { HomePersonComponent } from "./home-person.component";
import { SharelibModule } from "src/app/sharelib/sharelib.module";
import { FormsModule } from "@angular/forms";
import { ImgUploadComponent } from "./img-upload.component";
import { ViewPersonComponent } from "./view-person.component";
//import { HofficeService } from "../../service/hoffice_service";

@NgModule({
  declarations: [HomePersonComponent, ImgUploadComponent, ViewPersonComponent],
  imports: [
    //  HofficeService,
    FormsModule,
    SharelibModule,
    CommonModule,
    DpersonRoutingModule,
  ],
})
export class DpersonModule {}
