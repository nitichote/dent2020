import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HofficeService } from "../../service/hoffice_service";
import { ApiChoteService } from "../../service/api-chote.service";
import { DpersonModule } from "./dperson.module";
import * as m from "./dperson.model";
import { SelectItem } from "primeng/api";
declare var $: any;
@Component({
  selector: "app-home-person",
  templateUrl: "./home-person.component.html",
  styleUrls: ["./home-person.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomePersonComponent implements OnInit {
  hcodebegin: any;
  beginwork: any;
  constructor(private ps: HofficeService, private ap: ApiChoteService) {}
  txtSearch = "";
  con = "office";
  p: m.Dperson = {};
  res: any = [];
  action = "add";
  doSelect() {
    if (this.txtSearch.trim().length > 2) {
    }
    this.ps.getgSearch(this.con, this.txtSearch.trim()).then((x) => {
      this.res = x["message"];
      console.log(this.res);
    });

    console.log(this.con);
  }
  editPerson(r) {
    console.log(r);
    for (let x in r) {
      this.p[x] = r[x];
    }
    this.modalTitle = "ปรับปรุงข้อมูล";
    this.action = "edit";
    this.openModal();
  }
  async getPis() {
    let sql = `SELECT * FROM pis_personnel where st=1 and  hcode='00024'`;
    let rs = await this.ap.sqlName(sql);
    console.log(rs);
  }
  modalTitle = "เพิ่มข้อมูล";
  office = "10702";
  offices: any = [];
  deglevelCombo: SelectItem[];
  degnameCombo: SelectItem[];
  officesCombo: SelectItem[];
  lstatusCombo: SelectItem[];
  sexCombo: SelectItem[];
  dtypeCombo: SelectItem[];
  sitem: SelectItem;
  sendPlace() {
    this.p.officenow = this.p.hcodebegin;
    this.p.dateofficenow = this.p.beginwork;
  }
  doSetPerson() {
    this.p = { hcodebegin: this.office };
  }

  doSavePerson(p) {
    $("#exampleModal").modal("toggle");
    let where = { ps_id: this.p.ps_id };
    if (this.action == "add") {
      console.log("adddddd");

      this.ps.insertData("dperrson", this.p);
    } else {
      console.log(this.action);

      this.ps.updateData("dperson", where, this.p).then((x) => {
        console.log("ok");
        this.modalTitle = "เพิ่มข้อมูล";
        this.hcodebegin = p.hcodebegin;
        this.beginwork = p.beginwork;
        this.p = {};
        this.p.hcodebegin = this.hcodebegin;
        this.p.beginwork = this.beginwork;
      });
    }

    this.action = "add";
  }
  movePerson(r) {}
  viewPerson(r) {}
  openModal() {
    $("#exampleModal").modal("show");
  }
  closeModal() {}
  tbl = "xxxx";
  ngOnInit(): void {
    this.modalTitle = `select * from ${this.tbl} `;
    this.dtypeCombo = [
      { label: "โปรดเลือกประเภท", value: "0" },
      { label: "ทันตแพทย์", value: "1" },
      { label: "ทันตาภิบาล", value: "2" },
      { label: "นักวิชาการสาธารณสุข", value: "3" },
      { label: "ผู้ช่วยทันตกรรม", value: "4" },
    ];
    this.sexCombo = [
      { label: "โปรดเลือกเพศ", value: "0" },
      { label: "ชาย", value: "1" },
      { label: "หญิง", value: "2" },
    ];
    this.lstatusCombo = [
      { label: "โปรดเลือกสถานะ", value: "0" },
      { label: "ทำงานอยู่", value: "1" },
      { label: "ลาเรียน", value: "2" },
      { label: "ลาออก,โยกย้าย", value: "3" },
    ];
    this.degnameCombo = [{ label: "โปรดเลือกสาขา", value: "0" }];
    this.deglevelCombo = [
      { label: "โปรดเลือกระดับ", value: "0" },
      { label: "ประกาศนียบัตร", value: "ประกาศนียบัตร" },
      { label: "ปริญญาโท", value: "ปริญญาโท" },
      { label: "Resident", value: "Resident" },
    ];
    let spec: any = [];
    this.ps.getTbl("spectype").then((x) => {
      spec = x["message"];
      for (let s of spec) {
        this.degnameCombo.push({
          label: String(s.specname),
          value: String(s.speccode),
        });
      }
    });

    this.doSetPerson();
    this.ps.getOfficesCpho().then((data) => {
      this.offices = data["message"];
      this.officesCombo = [{ label: "โปรดเลือกหน่วยงาน", value: "0" }];
      //   this.officesCombo.push({ label: "Axx", value: "eee" });
      for (let x of this.offices) {
        this.sitem = { label: String(x.off_name), value: String(x.off_id) };
        this.officesCombo.push(this.sitem);
      }
    });

    // this.getPis();
  }
}
