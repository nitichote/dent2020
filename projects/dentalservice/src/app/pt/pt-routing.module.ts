import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisAddNewComponent } from './regis-add-new.component';

const routes: Routes = [
  {
    path: "",
    component:RegisterComponent
  },
  {
    path: "register",
    component:RegisterComponent
  },
  {
    path: "regaddnew",
    component:RegisAddNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PtRoutingModule { }
