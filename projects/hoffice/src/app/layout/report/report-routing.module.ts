import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D1000Component } from './d1000.component';


const routes: Routes = [
  {
    path: "",
    component: D1000Component,
  },
  {
    path: "show",
    component: D1000Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
