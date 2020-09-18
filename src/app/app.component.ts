import { Component } from "@angular/core";
import { ProductService } from "./sharelib/psc_server";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ps: ProductService
  ) {
    this.isSignIn = ps.isSignIn();
  }
  title = "ระบบเบิกจ่ายพัสดุ(EGP Helper)";
  isLoggedIn: boolean = false;
  myoffice: any;
  isSignIn: Observable<boolean>;
  logOut() {
    this.ps.logout();
  }
  ngOnInit(): void {
    this.isLoggedIn = this.ps.isLoggedIn;
    this.myoffice = this.ps.myOffice;
  }
}
