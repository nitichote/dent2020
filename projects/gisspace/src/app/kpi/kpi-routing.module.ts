import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiHomeComponent } from './kpi-home.component';
import { KpiMapComponent } from './kpi-map.component';
KpiMapComponent
const routes: Routes = [
  {path: '',
  component: KpiHomeComponent},
  {path: 'map',
  component: KpiMapComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
