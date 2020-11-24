import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "prefix" },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "dperson",
        loadChildren: () =>
          import("./dperson/dperson.module").then((m) => m.DpersonModule),
      },
      {
        path: "office",
        loadChildren: () =>
          import("./office/office.module").then((m) => m.OfficeModule),
      },
      {
        path: "school",
        loadChildren: () =>
          import("./school/school.module").then((m) => m.SchoolModule),
      },
      {
        path: "report",
        loadChildren: () =>
          import("./report/report.module").then((m) => m.ReportModule),
      },
      {
        path: "network",
        loadChildren: () =>
          import("./network/network.module").then((m) => m.NetworkModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
