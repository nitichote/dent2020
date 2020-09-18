import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MonitorModule } from "../monitor/monitor.module";
import { ProductService } from "./sharelib/psc_server";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, MonitorModule],
  providers: [],
  bootstrap: [AppComponent],
  providers: [ProductService]
})
export class AppModule {}
