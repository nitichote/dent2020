import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductService } from "../../sharelib/psc_server";
import * as m from "../../egp/models";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { of } from "rxjs";

@Component({
  selector: "app-json-download",
  templateUrl: "./json-download.component.html",
  styleUrls: ["./json-download.component.scss"],
})
export class JsonDownloadComponent implements OnInit {
  sql: string;
  pjno: number;
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private _http2: HttpClient,
    private ps: ProductService
  ) {}
  p: any;
  getProject(): void {
    this.sql = `SELECT (select count(*)  from goodsdetail g where g.projectno = p.projectno) cntgoods,  t.typeName,g.goodsName,m.methodName, p.* from egpproject p left outer join c_type t on p.typeId=t.typeId
left outer join c_goods g on p.goodsId=g.goodsId
left outer join c_method m on p.methodId=m.methodId   where p.officecode=${this.office.officecode}`;
    this.ps.getview(this.sql).then((data) => {
      this.p = data[0];
      console.log(this.p);
    });
  }

  office: any;
  ngOnInit() {
    this.office = this.ps.getLocal("egpoffice");

    this.getProject();
  }
}
