import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeSchoolComponent } from "./home-school.component";
import { SchoolReportComponent } from './school-report.component';
import { ShowSchoolComponent } from "./show-school.component";

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeSchoolComponent ,
    children: [
      { path: '', component: SchoolReportComponent },
     
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
