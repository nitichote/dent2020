import { Component, OnInit } from "@angular/core";
import * as m from "../../egp/models";
import * as z from "../../egp/pjclass";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "src/app/sharelib/psc_server";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"],
})
export class ProjectDetailComponent implements OnInit {
  sql: string;
  pjno: any;
  p: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private _http2: HttpClient,
    private ps: ProductService
  ) {}
  getProject(): void {
    this.sql = `SELECT t.typeName,g.goodsName,m.methodName, p.* from egpproject p left outer join c_type t on p.typeId=t.typeId
left outer join c_goods g on p.goodsId=g.goodsId
left outer join c_method m on p.methodId=m.methodId   where p.projectno=${this.pjno}`;
    this.ps.getview(this.sql).then((data) => {
      this.p = data[0];
      console.log(this.p);
    });
  }

  office: any;
  ngOnInit() {
    this.office = this.ps.getLocal("egpoffice");
    this.pjno = +this.route.snapshot.paramMap.get("id");
    this.getProject();
  }
}
