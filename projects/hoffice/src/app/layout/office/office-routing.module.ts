import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeOfficeComponent } from "./home-office.component";

const routes: Routes = [
  {
    path: "",
    component: HomeOfficeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule {}
