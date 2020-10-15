
import { SharelibModule } from './service/sharelib.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DentssjService } from "./service/dentssj_service";
import { DentContactShowComponent } from './dent-contact-show.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ChartModule} from 'primeng/chart';
@NgModule({
  declarations: [AppComponent, DentContactShowComponent],
  imports: [TabsModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,ChartModule,
    SharelibModule,FormsModule,FontAwesomeModule
  ],
  providers: [DentssjService],
  bootstrap: [AppComponent],
})
export class AppModule {}



