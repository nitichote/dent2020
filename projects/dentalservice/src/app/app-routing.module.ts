import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const routes: Routes = [


  {
    path: "contact",
    component: ContactComponent,},
  {
    path: "home",
    component: HomeComponent,
  },{
        path: "pt",
        loadChildren: () =>
          import("./pt/pt.module").then((m) => m.PtModule),
   
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
