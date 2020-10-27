import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/kpi', pathMatch: 'full' },
  {path: 'kpi',
    loadChildren: () => import('./kpi/kpi.module').then(m => m.KpiModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
