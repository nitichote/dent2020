import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HofficeService } from "./service/hoffice_service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [AppComponent],
  imports: [  AccordionModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [HofficeService,{ provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
