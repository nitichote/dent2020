import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EhomeComponent } from "./ehome/ehome.component";
import { ProjectComponent } from "./project/project.component";
import { ProjectAddComponent } from "./project-add/project-add.component";
import { GoodsAddComponent } from "./goods-add/goods-add.component";
import { SigninComponent } from "./signin/signin.component";
import { ProjectReportComponent } from "./project-report/project-report.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { JsonDownloadComponent } from "./json-download/json-download.component";

const routes: Routes = [
  {
    path: "",
    component: EhomeComponent,
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "report",
    component: ProjectReportComponent,
  },
  {
    path: "pjdetail/:id",
    component: ProjectDetailComponent,
  },
  {
    path: "jsondl",
    component: JsonDownloadComponent,
  },
  {
    path: "project",
    component: ProjectComponent,
  },
  {
    path: "pjadd",
    component: ProjectAddComponent,
  },
  {
    path: "gdsAdd/:id",
    component: GoodsAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgpRoutingModule {}
