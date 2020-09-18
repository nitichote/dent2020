import { Component, OnInit } from "@angular/core";
import { ProductService } from "../sharelib/psc_server";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private ps: ProductService, private location: Location) {}
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
      } else {
        console.log(data);

        this.showtext = this.sql;
      }
    });
  }
  doSubmit() {
    this.getpd();
  }
  ngOnInit(): void {}
}
