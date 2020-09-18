import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../sharelib/psc_server";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  constructor(private router: Router, private ps: ProductService) {}
  usercode = "";
  pincode = "";
  sql = "";
  showtext = "";
  getpd() {
    this.sql = `SELECT * from office where usercode ='${this.usercode}' and pincode = '${this.pincode}' `;
    this.ps.getview(this.sql).then((data) => {
      if (data[0]) {
        this.showtext = "ถูกต้อง";
        let egpoffice = {
          officecode: "00109760036000000",
          officename: "รพ.หนองบัวระเหว",
        };

        this.ps.setLocal(egpoffice);
        this.ps.showLoginText = this.ps.showLoginText;
      } else {
        console.log(data);

        this.showtext = this.sql;
      }
    });
  }
  showLoginText: string = "";
  doSubmit() {
    //  this.getpd();
    this.ps.login(this.usercode, this.pincode).then((data) => {
      console.log("data", data);
      this.showLoginText = data.showText;
      if (String(data.officename).length > 1) {
        console.log("go go");

        this.router.navigate(["egp/project"]);
      } else {
        this.showLoginText =
          "ขออภัย ท่าน Login ไม่ผ่าน username หรือ password ไม่ถูกต้อง ,ลองใหม่อีกครั้ง";
      }
    });
  }
  ngOnInit(): void {}
}
