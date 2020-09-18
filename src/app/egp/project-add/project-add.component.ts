import { Component, OnInit } from "@angular/core";
import * as m from "../../egp/models";
import * as z from "../../egp/pjclass";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "src/app/sharelib/psc_server";
import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { isNull } from "util";
@Component({
  selector: "app-project-add",
  templateUrl: "./project-add.component.html",
  styleUrls: ["./project-add.component.scss"],
})
export class ProjectAddComponent implements OnInit {
  method_paids: any = ["ไม่ผ่าน", "ผ่าน"];
  projectGovStatuss = [
    "จัดซื้อจัดจ้างตามขั้นตอนปกติ",
    "โครงการส่งเสริมความเป็นอยู่ระดับตำบล",
  ];

  sourceBudgetIncomes = [
    "< ตัวเลือกประเภทเงินพ.ร.บ.งบประมาณ >",
    "งบกรม",
    "งบจังหวัด",
    "งบกลุ่มจังหวัด",
    "งบกลาง",
    "อื่นๆ",
  ];
  sourceNonbudgetIncomes = [
    "< ตัวเลือกประเภทเงินนอกงบประมาณ >",
    "เงินกู้",
    "ทรัพย์สินช่วยราชการ",
    "เงินช่วยเหลือจากปตท.",
    "งบอุดหนุน",
    "เงินทดลอง",
    "เงินยืม",
    "ไทยเข้มแข็ง",
    "เงินทดลอง",
    "เงินนอกฝากคลัง",
    "อื่นๆ",
  ];
  pjTbTh = [
    "ลำดับ",
    "ชื่อโครงการ",
    "งบประมาณ",
    "วันที่สร้าง",
    "จำนวนรายการสินค้า",
    "จำนวนรายการสินค้าที่บันทึก",
    "สถานะส่ง",
  ];
  pjTbTd = [
    "p.projectName",
    "totalBudget",
    "datecreate",
    "consider_method",
    "issend",
  ];
  displayBasic = false;
  budgetYears = ["2563", "2564"];
  typeIds: any = [];
  stypes: any = [];
  goodIds: any = [];
  totalBudget: number;
  sourceNonbudget: any;
  sgoodss: any = [];
  sql: string;
  methodIds: any = [];
  methodIdsAll: any = [];
  goodIdsAll: any = [];
  typeIdsAll: any = [];
  title = "เพิ่มโครงการ";
  sourceNonbudgetIncome: string;
  sourceBudgetIncome: string;
  projectGovStatus: string;
  displayFinish = false;
  product: any;
  office: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private _http2: HttpClient,
    private ps: ProductService
  ) {
    this.p = new z.Pjt();
    console.log(this.p);
    console.log(this.router.getCurrentNavigation().extras.state);
  }
  p: any;
  doMethodChange(e) {
    let v = e.target.value;
    this.typeIds = this.stypes.filter((x) => x.methodId == v);
    this.goodIds = [];
  }
  doTypeChange(e) {
    let v = e.target.value;
    this.goodIds = this.sgoodss.filter((x) => x.typeId == v);
  }
  doCancel() {
    this.router.navigateByUrl("/egp/project");
  }
  doSubmit() {
    console.log(this.p);
    this.displayBasic = true;
  }
  doTotalBudget() {
    console.log("xx");

    this.totalBudget = Number(this.sourceBudget) + Number(this.sourceNonbudget);
  }
  sourceBudget(sourceBudget: any) {
    throw new Error("Method not implemented.");
  }
  getMethod() {
    this.sql = `SELECT * from c_method`;
    this.ps.getview(this.sql).then((data) => {
      this.methodIds = data;
      this.methodIdsAll = data;
    });
  }
  getGoods() {
    this.sql = `SELECT * from c_goods`;
    this.ps.getview(this.sql).then((data) => {
      this.goodIds = data;
      this.goodIdsAll = data;
    });
    this.sql = `SELECT * from s_goods`;
    this.ps.getview(this.sql).then((data) => {
      this.sgoodss = data;
    });
  }
  getType() {
    this.sql = `SELECT * from c_type`;
    this.ps.getview(this.sql).then((data) => {
      this.typeIds = data;
      this.typeIdsAll = data;
    });
    this.sql = `SELECT * from s_type`;
    this.ps.getview(this.sql).then((data) => {
      this.stypes = data;
    });
  }
  tblFd: any = [];
  getComment() {
    this.sql = `
SHOW FULL COLUMNS FROM egpproject`;
    this.ps.getview(this.sql).then((data) => {
      this.tblFd = data;
    });
  }
  getFd(f) {
    if (f) {
      return this.p[f];
    }
  }
  doSavePj() {
    let pdnew = Object.assign({}, this.p);
    pdnew["updateId"] = this.updateId;
    let d = new Date(),
      dformat =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    pdnew["datecreate"] = d;
    console.log(pdnew);
    this.ps.saveData("egpproject", pdnew).then((data) => {
      console.log("save");
    });
  }
  doContinue() {
    this.doSavePj();
    this.sql = "SELECT MAX(projectno ) as id FROM egpproject";
    this.ps.getview(this.sql).then((data) => {
      let id = String(data[0].id);
      this.router.navigateByUrl("/egp/gdsAdd/" + id);
    });
  }
  updateId = "";
  ngOnInit(): void {
    this.office = this.ps.getLocal("egpoffice");
    this.product = history.state;
    if (this.product["updateId"]) {
      this.p = this.product;
      this.updateId = this.product["updateId"];
    } else {
      console.log("not update for angular");
    }
    console.log("product", this.product);

    this.sourceNonbudgetIncome = this.sourceNonbudgetIncomes[0];
    this.sourceBudgetIncome = this.sourceBudgetIncomes[0];
    this.projectGovStatus = this.projectGovStatuss[0];
    this.getMethod();
    this.getGoods();
    this.getType();
    this.getComment();
  }
}
