import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotfoundComponent } from "./notfound.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { GenModelComponent } from "./gen-model/gen-model.component";
import { DpersonWidgetComponent } from "./widget/dperson-widget/dperson-widget.component";
import { TestComponent } from "./test/test.component";

const routes: Routes = [
  {
    path: "",
    //   canActivate: [AuthGuardService],
    redirectTo: "genmodel",
    pathMatch: "full",
  },
  {
    path: "genmodel",
    component: GenModelComponent,
  },
  {
    path: "personwidget",
    component: DpersonWidgetComponent,
  },
  {
    path: "test",
    component: TestComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class AppRoutingModule {}
