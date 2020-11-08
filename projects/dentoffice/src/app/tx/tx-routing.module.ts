import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtComponent } from './pt.component';

const routes: Routes = [
  {path: '',
  component: PtComponent},
  {path: 'map',
  component: PtComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TxRoutingModule { }
