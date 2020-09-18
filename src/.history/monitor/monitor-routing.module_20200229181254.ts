import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DentalComponent } from "./dental/dental.component";

const routes: Routes = [
  {
    path: "",
    component: DentalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {}
