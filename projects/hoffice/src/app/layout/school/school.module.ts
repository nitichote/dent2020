import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SchoolRoutingModule } from "./school-routing.module";
import { HomeSchoolComponent } from "./home-school.component";
import { SharelibModule } from "src/app/sharelib/sharelib.module";
import { ShowSchoolComponent } from "./show-school.component";
import { FormsModule } from "@angular/forms";
import { PipeAmpPipe } from "src/app/pipe-amp.pipe";
import { SchoolLoginComponent } from './school-login.component';
import { SchoolReportComponent } from './school-report.component';

@NgModule({
  declarations: [PipeAmpPipe, HomeSchoolComponent, ShowSchoolComponent, SchoolLoginComponent, SchoolReportComponent],
  imports: [FormsModule, SharelibModule, CommonModule, SchoolRoutingModule],
})
export class SchoolModule {}
