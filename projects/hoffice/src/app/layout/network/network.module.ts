import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNetworkComponent } from './home-network.component';
import { NetworkRoutingModule } from './network-routing.module';


@NgModule({
  declarations: [HomeNetworkComponent],
  imports: [
    CommonModule,
    NetworkRoutingModule
  ]
})
export class NetworkModule { }
