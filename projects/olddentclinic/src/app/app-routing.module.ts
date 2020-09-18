import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainlayoutComponent } from "./mainlayout/mainlayout.component";

const routes: Routes = [
  {
    path: "",
    //   canActivate: [AuthGuardService],
    redirectTo: "egp",
    pathMatch: "full",
  },
  {
    path: "genmodel",
    component: GenModelComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
