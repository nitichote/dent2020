import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ProductService } from "src/app/sharelib/psc_server";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfirmationService } from "primeng/api";
import * as m from "../../egp/models";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-goods-add",
  templateUrl: "./goods-add.component.html",
  styleUrls: ["./goods-add.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class GoodsAddComponent implements OnInit {
  projects: Object;
  projectsAll: Object;
  localVar: any;
  office: any;
  constructor(
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private ps: ProductService,
    private location: Location,
    private messageService: MessageService
  ) {}
  btText = "บันทึกเพิ่มรายการ";
  pd: m.GoodsDetail;
  pjno = 0;
  sql = "";
  numGoodsNow = 0;
  goods: any = [];
  goodsAll: any = [];
  gpscs: any = [];
  gpscsAll: any = [];
  goodsHis: any = [];
  gpscFilter: any = [];
  updateId = "";
  getDetail(p) {}
  doCancel() {
    this.isAdd = true;
    this.pd = {};
    this.btText = "บันทึกเพิ่มรายการ";
  }
  doEdit(p) {
    console.log(p);
    this.pd = p;
    this.updateId = " matid =" + p.matid;
    this.isAdd = false;
    this.btText = "บันทึกปรับปรุงรายการ";
  }
  doDelete(p) {}
  onSubmit() {
    console.log(this.goods.length, this.pj.consider_method);

    if (this.goods.length <= Number(this.pj.consider_method)) {
      this.pd.projectno = this.pjno;
      let pdnew = Object.assign({}, this.pd);

      pdnew["updateId"] = this.updateId;
      console.log(pdnew);
      this.ps.saveData("goodsdetail", pdnew).then((data) => {
        console.log("save");
        this.getGoods();
      });
      this.isAdd = true;
      this.btText = "บันทึกเพิ่มรายการ";
      this.updateId = "";
      this.pd = {};
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "รายการเต็มจำนวน",
        detail:
          "ขณะนี้ท่านเลือกรายการสินค้าเต็มจำนวนที่ระบุไว้ในโครงการแล้ว ท่านต้องลงรายกาารไม่ใช้งานออกก่อน",
      });
    }
  }
  doGetPd(p) {
    this.pd = {};
    this.pd.productname = p.productname;
    this.pd.dbid = p.dbid;
  }
  doGetHis(id) {
    // console.log(this.goodsHis);
    let c = this.goodsHis.filter((x) => x.projectno === id);
    let m = "";
    for (let k of c) {
      m += `<li><button class="btn btn-secondary" (click)="doGetPd()"> ${k.productname}</button></li>`;
    }
    return `<ul>${m}</ul>`;
    /* for (let k of s) {
    let s = this.getHisDetail(id);
    let t = "";
    for (let k of s) {
      t += "ff ss"; //`<div><a href='javascript:void(0)' (click)="doGet1Goods(${k.dbid})" >${k.productname}</a></div>`;
    }
    // console.log("t");

    return t; */
  }
  getHisDetail(id) {
    let c = this.goodsHis.filter((x) => {
      return x.projectid === id;
    });
    return c;
  }
  doSearch() {
    //this.gpscFilter = [];
    this.txtSearch = this.txtSearch.trim();

    let c = this.txtSearch.substr(0, 1);

    if (this.txtSearch.length > 1) {
      if (c >= "0" && c <= "9") {
        this.gpscFilter = this.gpscsAll.filter((x) =>
          x.dbid.includes(this.txtSearch)
        );
      } else {
        this.gpscFilter = this.gpscsAll.filter((x) =>
          x.productname.includes(this.txtSearch)
        );
        console.log("ok", this.gpscFilter.length);
      }
    }
  }
  getGpsc() {
    this.sql = `SELECT * from productgroup`;
    this.ps.getview(this.sql).then((data) => {
      this.gpscs = data;
      this.gpscsAll = data;
    });
  }
  getGoods(): void {
    this.sql = `SELECT * from goodsdetail where projectno=${this.pjno}`;
    this.ps.getview(this.sql).then((data) => {
      this.goods = data;
      this.numGoodsNow = this.goods.length;
      this.goodsAll = data;
      //  this.goodsAll = data;
    });
  }
  getGoodsAll() {
    this.sql = `SELECT * from goodsdetail where officecode= '${this.office.officecode}'`;
    this.ps.getview(this.sql).then((data) => {
      this.goodsAll = data;
      //  this.goodsAll = data;
    });
  }
  txtSearch = "";
  officecode = "00109760036000000";
  pj: any = [];
  isAdd = true;
  confirmDelete(p) {
    //console.log(i);

    this.confirmationService.confirm({
      message: "ท่านต้องการลบข้อมูลรายการนี้?",
      accept: () => {
        let s = { tbl: "goodsdetail", updateId: " matid=" + p.matid };
        this.ps.del(s);
        this.goods = this.goods.filter((item) => item !== p);
        //Actual logic to perform a confirmation
      },
    });
  }
  doAdd() {}
  get1Project() {
    this.pjno = +this.route.snapshot.paramMap.get("id");
    console.log(this.pjno);

    this.sql = `SELECT * from egpproject where projectno=${this.pjno}`;
    this.ps.getview(this.sql).then((data) => {
      this.pj = data[0];
      this.getGoods();
    });
  }
  counter(i: any) {
    return new Array(Number(i));
  }
  doGetGroup(p, i) {
    let x = String(p.gpdname).split(",");
    let y = String(p.gdbid).split(",");
    this.pd = {};
    this.pd.productname = x[i];
    this.pd.dbid = y[i];
  }
  getShowGroup(p, i) {
    let f = String(p.gpdname).split(",");
    return f[i];
  }
  getProject() {
    // tslint:disable-next-line:max-line-length
    this.sql = `select (select GROUP_CONCAT(d.productname) from goodsdetail d where d.projectno = p.projectno) as gpdname , (select GROUP_CONCAT(d.dbid) from goodsdetail d where d.projectno = p.projectno) as gdbid , (select count(*)  from goodsdetail g where g.projectno=p.projectno) as goodscnt ,p.* from egpproject p  where officecode= '${this.office.officecode}' `;
    this.ps.getview(this.sql).then((data) => {
      this.projects = data;
      this.projectsAll = data;
      // console.log(this.sql, data);
    });
  }

  getGoodsDetails() {
    this.sql = `SELECT * from goodsdetail where officecode= '${this.office.officecode}' `;
    this.ps.getview(this.sql).then((data) => {
      this.goodsHis = data;
    });
  }
  getLocal(v) {
    this.ps.getLocal(v);
  }

  ngOnInit(): void {
    this.office = this.ps.getLocal("egpoffice");

    this.pd = {};
    this.getProject();
    this.getGpsc();
    this.get1Project();
    this.getGoodsDetails();
  }
  ngOnDestroy() {}
}
