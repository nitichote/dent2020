import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductService } from "../../sharelib/psc_server";
import * as m from "../../egp/models";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { of } from "rxjs";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class ProjectComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private _http2: HttpClient,
    private ps: ProductService,
    private messageService: MessageService
  ) {}
  columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  confirmDelete(p) {
    //console.log(i);

    this.confirmationService.confirm({
      message: "ท่านต้องการลบข้อมูล?",
      accept: () => {
        let s = { tbl: "egpproject", updateId: " projectno=" + p.projectno };
        this.ps.del(s);
        this.projectsAll = this.projectsAll.filter((item) => item !== p);
        //Actual logic to perform a confirmation
      },
    });
  }
  displayDelete = false;
  isCorrect = false;
  pj: m.Project = {};
  planId = "";
  typeCase = "";
  projectId = "";
  projectName = "";
  budgetYears = ["2563", "2564"];
  budgetYear = "2563";
  methodId = "";
  typeId = "";
  methodIds: any = [];
  goodIds: any = [];
  typeIds: any = [];
  methodIdsAll: any = [];
  goodIdsAll: any = [];
  typeIdsAll: any = [];
  projects: any = [];
  projectsAll: any = [];
  goodsId = "";
  goodsName = "";
  methodName = "";
  stypes: any = [];
  sgoodss: any = [];
  typeName = "";
  sourceBudget = 0;
  sourceNonbudget = 0;
  totalBudget = 0;
  consider_method = 0;
  sourceNonbudgetIncome = "";
  sourceBudgetIncome = "";
  projectGovStatus = "";
  method_paid = "";
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
    "รายการบันทึกสินค้า/สินค้าทั้งหมด",

    "สถานะส่ง",
  ];
  pjTbTd = [
    "p.projectName",
    "totalBudget",
    "datecreate",
    "consider_method",
    "issend",
  ];
  sql = "";
  projectNoForDelete = 0;
  selectedProjects: any = [];
  ShowDeleteDialog(p) {
    this.projectNoForDelete = p.projectNo;
    this.displayDelete = true;
  }
  doShowProject(p) {
    this.router.navigateByUrl("/egp/pjdetail/" + p.projectno);
  }
  doDeleteProject() {
    let data = {
      tbl: "egpProject",
      updateId: "projectNo=" + this.projectNoForDelete,
    };
    this.ps.del(data).then((data) => {
      console.log("Delete goods");
      let gdata = {
        tbl: "goodsdetail",
        updateId: "projectNo=" + this.projectNoForDelete,
      };
      this.ps.del(gdata);
      this.displayDelete = false;
    });
  }
  doMethodChange(e) {
    let v = e.target.value;
    this.typeIds = this.stypes.filter((x) => x.methodId == v);
    this.goodIds = [];
  }
  doTypeChange(e) {
    let v = e.target.value;
    this.goodIds = this.sgoodss.filter((x) => x.typeId == v);
  }
  doTotalBudget() {
    console.log("xx");

    this.totalBudget = Number(this.sourceBudget) + Number(this.sourceNonbudget);
  }
  getMethod() {
    this.sql = `SELECT * from c_method`;
    this.ps.getview(this.sql).then((data) => {
      this.methodIds = data;
      this.methodIdsAll = data;
    });
  }
  checkCorect(a, b) {
    if (a == b) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
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

  getProject() {
    // tslint:disable-next-line:max-line-length
    this.sql = `SELECT (select count(*)  from goodsdetail g where g.projectno = p.projectno) cntgoods,
    t.typeName,g.goodsName,m.methodName, p.* from egpproject p left outer join c_type t on p.typeId=t.typeId
 left outer join c_goods g on p.goodsId=g.goodsId
 left outer join c_method m on p.methodId=m.methodId  where p.officecode='${this.office.officecode}'`;

    this.ps.getview(this.sql).then((data) => {
      this.projects = data;
      this.projectsAll = data;
    });
  }
  isEdit = false;
  title = "เพิ่มข้อมูลโครงการ";
  btSubmitname = "บันทึกการเพิ่มโครงการ";
  updateId = "";
  doCancel() {
    this.isEdit = false;
    this.updateId = "";
    this.btSubmitname = "บันทึกการเพิ่มโครงการ";
    this.doPostEdit();
  }
  pEdit: m.Project;
  doEditProject(p: m.Project) {
    let pe = this.projectsAll.filter((x) => {
      return x.projectno == p.projectno;
    });
    this.pEdit = pe[0];
    this.isEdit = true;
    this.title = "แก้ไขข้อมูลโครงการ";
    this.btSubmitname = "บันทึกการปรับปรุง";
    this.updateId = " projectno =" + p.projectno;
    this.projectId = p.projectId;
    this.projectName = p.projectName;
    this.planId = p.planId;
    this.budgetYear = p.budgetYear;
    this.sourceBudget = p.sourceBudget;
    this.sourceBudgetIncome = p.sourceBudgetIncome;
    this.sourceNonbudget = p.sourceNonbudget;
    this.sourceNonbudgetIncome = p.sourceNonbudgetIncome;
    this.consider_method = p.consider_method;
    this.methodId = p.methodId;
    this.typeId = p.typeId;
    this.goodsId = p.goodsId;
    this.method_paid = p.method_paid;
    this.typeCase = p.typeCase;
    this.projectGovStatus = p.projectGovStatus;
  }
  doPostEdit() {
    this.isEdit = true;
    this.title = "บันทึกเพิ่มโครงการ";
    this.btSubmitname = "บันทึกเพิ่มโครงการ";
    this.updateId = "";
    this.projectId = "";
    this.projectName = "";
    this.planId = "";
    this.budgetYear = "2563";
    this.sourceBudget = 0;
    this.sourceBudgetIncome = "";
    this.sourceNonbudget = 0;
    this.sourceNonbudgetIncome = "";
    this.consider_method = 0;
    this.methodId = "";
    this.typeId = "";
    this.goodsId = "";
    this.method_paid = "";
    this.typeCase = "";
    this.projectGovStatus = "";
  }
  doSyncEdit() {
    this.pEdit.projectId = this.projectId;
    this.pEdit.projectName = this.projectName;
    this.pEdit.planId = this.planId;
    this.pEdit.budgetYear = this.budgetYear;
    this.pEdit.sourceBudget = this.sourceBudget;
    this.pEdit.sourceBudgetIncome = this.sourceBudgetIncome;
    this.pEdit.sourceNonbudget = this.sourceNonbudget;
    this.pEdit.sourceNonbudgetIncome = this.sourceNonbudgetIncome;
    this.pEdit.consider_method = this.consider_method;
    this.pEdit.methodId = this.methodId;
    this.pEdit.typeId = this.typeId;
    this.pEdit.goodsId = this.goodsId;
    this.pEdit.method_paid = this.method_paid;
    this.pEdit.typeCase = this.typeCase;
    this.pEdit.projectGovStatus = this.projectGovStatus;
  }
  doDownload() {
    console.log(this.selectedProjects);
    if (this.selectedProjects.length == 0) {
      console.log("ok");
      this.messageService.add({
        severity: "warn",
        summary: "โปรดเลือกรายการ",
        detail: "ให้ท่านเลือกรายการอย่างน้อย1รายการจากCheckbox",
      });
    } else {
      this.sendJsons();
    }
  }
  goodsNumAlls: any = [];
  getGoodsNumAll() {
    this.sql = `select projectno ,count(*) as goodsnum from goodsdetail GROUP BY projectno`;
    this.ps.getview(this.sql).then((data) => {
      this.goodsNumAlls = data;
    });
  }
  getGoodsNum(p) {
    let nums: any = [];
    nums = this.goodsNumAlls.filter((x) => {
      return x.projectno == p.projectno;
    });
    //  console.log(nums);

    if (nums.length > 0) {
      return nums[0].goodsnum;
    } else {
      return 0;
    }
  }

  myJson: m.PdJson = {};
  goods: any = [];
  myGoodsJson: m.GoodsJson = {};
  goodsDetailArr: any = [];
  displayBasic = false;
  showBasicDialog() {
    this.displayBasic = true;
  }
  sendJson(p) {
    this.sql = `SELECT * from goodsdetail where projectno=${p.projectno}`;
    this.ps.getview(this.sql).then((data) => {
      this.goods = data;

      let tName = this.typeIdsAll.filter((x) => {
        return x.typeId == p.typeId;
      });
      let gName = this.goodIdsAll.filter((x) => {
        return x.goodsId == p.goodsId;
      });
      this.myJson.budgetYear = p.budgetYear;
      this.myJson.consider_method = p.consider_method;
      this.myJson.goodsId = String(gName[0].goodsName);

      const mdName = this.methodIdsAll.filter((x) => {
        return x.methodId == p.methodId;
      });

      this.myJson.methodId = String(mdName[0].methodName);
      this.myJson.typeCase = p.typeCase;
      this.myJson.typeId = String(tName[0].typeName);
      this.myJson.projectGovStatus = p.projectGovStatus;
      this.myJson.planId = p.planId;

      this.myJson.oldIdFrom = p.oldIdFrom;
      this.myJson.projectName = p.projectName;
      this.myJson.sourceBudget = p.sourceBudget;
      this.myJson.sourceBudgetIncome = p.sourceBudgetIncome;
      this.myJson.sourceNonbudget = p.sourceNonbudget; //= string;
      this.myJson.sourceNonbudgetIncome = p.sourceNonbudgetIncome; //= string;
      this.myJson.consider_method = p.consider_method; //= string;
      this.myJson.method_paid = p.method_paid; //= string;
      //  this.goodsAll = data;
      for (let g of this.goods) {
        this.myGoodsJson.code = g.dbid;
        this.myGoodsJson.Qty = g.Qty;
        this.myGoodsJson.pack = g.pack;
        this.myGoodsJson.addition_info = g.addition_info;
        this.myGoodsJson.price = g.price;
        this.myGoodsJson.price_estimate = g.price_estimate;
        this.myGoodsJson.source = g.source;
        //console.log(this.myGoodsJson);
        let cl = { ...this.myGoodsJson };
        this.goodsDetailArr.push(cl);
        //console.log("ar", this.goodsDetailArr);
      }
      this.myJson.goodsDetail = this.goodsDetailArr;
      /*  this.ps.saveData("egpproject", pdnew).then(data => {
         console.log("save");
         //this.getGoods();
       });
      //console.log(this.myJson); */
      let js = JSON.stringify(this.myJson);
      let istr = `{ "RECORDS" : [${js}]}`;

      console.log(istr);
    });
  }
  myStrJson = "";
  goodsAll: any = [];
  getGoodsDetailAll() {
    this.sql = `SELECT * from goodsdetail where officecode=${this.office.officecode}`;
    this.ps.getview(this.sql).then((data) => {
      this.goodsAll = data;
    });
  }
  sendJsons() {
    for (let p of this.selectedProjects) {
      this.goods = this.goodsAll.filter((g) => g.projectno == p.projectno);

      this.myJson.budgetYear = p.budgetYear;
      this.myJson.consider_method = p.consider_method;
      this.myJson.goodsId = String(p.goodsName);

      this.myJson.methodId = String(p.methodName);
      this.myJson.typeCase = p.typeCase;
      this.myJson.typeId = String(p.typeName);
      this.myJson.projectGovStatus = p.projectGovStatus;
      this.myJson.planId = p.planId;

      this.myJson.oldIdFrom = p.oldIdFrom;
      this.myJson.projectName = p.projectName;
      this.myJson.sourceBudget = p.sourceBudget;
      this.myJson.sourceBudgetIncome = p.sourceBudgetIncome;
      this.myJson.sourceNonbudget = p.sourceNonbudget; //= string;
      this.myJson.sourceNonbudgetIncome = p.sourceNonbudgetIncome; //= string;
      this.myJson.consider_method = p.consider_method; //= string;
      this.myJson.method_paid = p.method_paid; //= string;
      //  this.goodsAll = data;
      for (let g of this.goods) {
        this.myGoodsJson.code = g.dbid;
        this.myGoodsJson.Qty = g.Qty;
        this.myGoodsJson.pack = g.pack;
        this.myGoodsJson.addition_info = g.addition_info;
        this.myGoodsJson.price = g.price;
        this.myGoodsJson.price_estimate = g.price_estimate;
        this.myGoodsJson.source = g.source;
        //console.log(this.myGoodsJson);
        let cl = { ...this.myGoodsJson };
        this.goodsDetailArr.push(cl);
        //console.log("ar", this.goodsDetailArr);
      }
      this.myJson.goodsDetail = this.goodsDetailArr;
      /*  this.ps.saveData("egpproject", pdnew).then(data => {
           console.log("save");
           //this.getGoods();
         });
        //console.log(this.myJson); */
      let js = JSON.stringify(this.myJson);
      //  let istr = `{ "RECORDS" : [${js}]}`;
      this.myStrJson = "," + js;
    }
    this.myStrJson = this.myStrJson.substr(1);
    this.myStrJson = `{ "RECORDS" : [${this.myStrJson}]}`;
    this.dynamicDownloadJson();
  }
  doShowDetail(p) {
    this.router.navigateByUrl("/egp/gdsAdd/" + p.projectno);
  }
  doClick() {
    console.log(this.projectGovStatus);
    this.pj.planId = this.planId;
    this.pj.projectId = this.projectId;
    this.pj.projectName = this.projectName;
    this.pj.projectGovStatus = this.projectGovStatus;
    this.pj.sourceNonbudgetIncome = this.sourceNonbudgetIncome;
    this.pj.sourceBudgetIncome = this.sourceBudgetIncome;
    this.pj.budgetYear = this.budgetYear;
    this.pj.consider_method = this.consider_method;
    this.pj.methodId = this.methodId;
    this.pj.goodsId = this.goodsId;
    this.pj.method_paid = this.method_paid;
    this.pj.typeId = this.typeId;
    this.pj.sourceBudget = this.sourceBudget;
    this.pj.sourceNonbudget = this.sourceNonbudget;

    let pdnew = Object.assign({}, this.pj);
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
      this.doPostEdit();
      this.doSyncEdit();
      this.isEdit = false;
      //this.getGoods();
    });
  }
  goToGoodsDetails(id) {
    console.log(id);

    this.router.navigate(["/pages", "egp", "goods", id]).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }
  gotoDynamic(p) {
    p["updateId"] = ` projectno = ${p.projectno} `;
    //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    this.router.navigateByUrl("/egp/pjadd", { state: p });
  }

  dynamicDownloadTxt() {
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: "My Report",
        text: JSON.stringify(res),
      });
    });
  }

  dynamicDownloadJson() {
    const filename = "egpexport_" + this.office.officecode + ".json";
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: filename,
        text: this.myStrJson,
      });
    });
  }
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement,
    },
  };

  fakeValidateUserData() {
    return of({
      userDate1: 1,
      userData2: 2,
    });
  }
  private dyanmicDownloadByHtmlTag(arg: { fileName: string; text: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement("a");
    }
    const element = this.setting.element.dynamicDownload;
    const fileType =
      arg.fileName.indexOf(".json") > -1 ? "text/json" : "text/plain";
    element.setAttribute(
      "href",
      `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`
    );
    element.setAttribute("download", arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  office: any;
  ngOnInit() {
    this.office = this.ps.getLocal("egpoffice");
    // console.log("office", this.office.officename);

    this.sourceNonbudgetIncome = this.sourceNonbudgetIncomes[0];
    this.sourceBudgetIncome = this.sourceBudgetIncomes[0];
    this.projectGovStatus = this.projectGovStatuss[0];

    this.getProject();
    this.getMethod();
    this.getGoods();
    this.getType();
    this.getGoodsNumAll();
    this.getGoodsDetailAll();
  }
}
