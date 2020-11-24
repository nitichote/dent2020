import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNetworkComponent } from './home-network.component';

const routes: Routes = [
  {
    path: "",
    component: HomeNetworkComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
