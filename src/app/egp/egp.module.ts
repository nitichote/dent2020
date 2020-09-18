import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { EgpRoutingModule } from "./egp-routing.module";
import { ProjectComponent } from "./project/project.component";
import { EhomeComponent } from "./ehome/ehome.component";
import { GoodsComponent } from "./goods/goods.component";
import { FormsModule } from "@angular/forms";
import { SharelibModule } from "../sharelib/sharelib.module";
import { ProjectAddComponent } from './project-add/project-add.component';
import { GoodsAddComponent } from './goods-add/goods-add.component';
import { SigninComponent } from './signin/signin.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { JsonDownloadComponent } from './json-download/json-download.component';
@NgModule({
  declarations: [ProjectComponent, EhomeComponent, GoodsComponent, ProjectAddComponent, GoodsAddComponent, SigninComponent, ProjectReportComponent, ProjectDetailComponent, JsonDownloadComponent],
  imports: [FormsModule, SharelibModule, CommonModule, EgpRoutingModule],
})
export class EgpModule {}
