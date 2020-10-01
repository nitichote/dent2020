import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeSchoolComponent } from "./home-school.component";
import { SchoolReportComponent } from './school-report.component';
import { PageSchoolComponent } from "./page-school.component";

const routes: Routes = [

  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: 'page', component: PageSchoolComponent ,
    children: [
      { path: 'report', component: SchoolReportComponent },
      { path: 'home', component: HomeSchoolComponent },
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
