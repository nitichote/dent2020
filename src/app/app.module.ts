import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { Dent2020Service } from "./service/dent2020_service";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotfoundComponent } from "./notfound.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { GenModelComponent } from "./gen-model/gen-model.component";
import { SharelibModule } from "./sharelib/sharelib.module";
import { ProductService } from "./sharelib/psc_server";
import { PipeAmpPipe } from "./pipe-amp.pipe";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DpersonWidgetComponent } from './widget/dperson-widget/dperson-widget.component';
import { TestComponent } from './test/test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DentContactShowComponent } from './dent-contact-show.component';
import { ChartsModule } from 'ng2-charts';
import { PipeHospitalsPipe } from './pipe-hospitals.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    GenModelComponent,
    PipeAmpPipe,
    DpersonWidgetComponent,
    TestComponent,
    DentContactShowComponent,
    PipeHospitalsPipe,
  ],
  imports: [
    ChartsModule,
    DragDropModule,
    FormsModule,
    SharelibModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    Dent2020Service,
    ProductService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
