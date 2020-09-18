
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { DentalClinicService } from "./service/dentalservice_service";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharelibModule } from './service/sharelib.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,SharelibModule,FormsModule
  ],
  providers: [DentalClinicService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
