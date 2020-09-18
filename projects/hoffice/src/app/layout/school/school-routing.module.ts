import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeSchoolComponent } from "./home-school.component";
import { ShowSchoolComponent } from "./show-school.component";

const routes: Routes = [
  {
    path: "",
    component: HomeSchoolComponent,
  },
  {
    path: "show",
    component: ShowSchoolComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
