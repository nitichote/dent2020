import { environment } from 'src/environments/environment';

import { Injectable } from "@angular/core";
// import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



import { HttpClient, HttpHeaders } from "@angular/common/http";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class DentssjService {
  hasToken(): boolean {
    return !!localStorage.getItem("token");
    console.log("return token");
  }
  public showLoginText: string;
  constructor(private _http2: HttpClient) {
    // this.token=this._dt.token;
  }

  public isLoggedIn = false; // กำหนดสถานะล็อกอินเริ่มต้นเป็น false
  public redirectUrl: string; // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป
  public myOffice: any;
  token = "";
  res: any;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  // api = "https://dmfzero.com/api_egp/apis.php";
  api1="";
  
 
 // api = `${environment.api}/dentssj/`;
api = `http://digitalmolar.com:3002/dentssj/`;
//api="http://127.0.0.1:3002/dentssj/";
 getdobj(){
     const dobj={
     khets:[1,2,3,4,5,6,7,8,9,10,11,12],
     jobs:['ปฏิบัติงาน','อาวุโส','ชำนาญงาน','ชำนาญการ','ชำนาญการพิเศษ','เชี่ยวชาญ','อื่นๆ'],
     denttypes:['ทันตแพทย์','นวก(ทันต)','ทันตาภิบาล','ลูกจ้าง','อื่นๆ'],
     posnames:['หัวหน้ากลุ่มงาน','รักษาการ','บุคลากรในกลุ่มงาน'],
    sexs:[{label:'ชาย',value:'1'},{label:'หญิง',value:'2'}]
    };
     return dobj;

 }
  async getgSearch(con, dname) {
    let api2020 = this.api + "gsearch/" + con + "/" + dname;

    return await this._http2.get(api2020).toPromise();
  }
  async getPvGeo(pv: string) {
    {
        const url =
            'https://opendata.service.moph.go.th/gis/v1/geojson/2/' ;
        return await this._http2.get(url).toPromise();
    }
}
async getReportView(id) {
  let api2020 = this.api + "reportview/"+id;

  return await this._http2.get(api2020).toPromise();
}
async getAgeRroup() {
  let api2020 = this.api + "agegroup";

  return await this._http2.get(api2020).toPromise();
}
  async getDentnum() {
    let api2020 = this.api + "dentnum";

    return await this._http2.get(api2020).toPromise();
  }
  async getReportDentnum() {
    let api2020 = this.api + "reportdentnum";
//console.log(api2020);

    return await this._http2.get(api2020).toPromise();
  }
  async getProvinces() {
    let api2020 = this.api + "province";

    return await this._http2.get(api2020).toPromise();
  }
  async getContacts() {
    let api2020 = this.api + "contacts";


    return await this._http2.get(api2020).toPromise();
  }
  async getOfficeCpho1(pincode) {
    let api2020 = this.api + "officeCpho1/"+pincode;

    return await this._http2.get(api2020).toPromise();
  }
  
  async getOffices() {
    let api2020 = this.api + "offices";

    return await this._http2.get(api2020).toPromise();
  }
  async getOfficesSch() {
    let api2020 = this.api + "officesSch";

    return await this._http2.get(api2020).toPromise();
  }
  async getSchools() {
    let api2020 = this.api + "school/show";

    return await this._http2.get(api2020).toPromise();
  }
  async getSchoolsEnv() {
    let api2020 = this.api + "schoolenv/show";

    return await this._http2.get(api2020).toPromise();
  }
  async getAmp36() {
    let api2020 = this.api + "amp36";

    return await this._http2.get(api2020).toPromise();
  }
  async getTbl(tbl) {
    let api2020 = this.api + "tbl/" + tbl;

    return await this._http2.get(api2020).toPromise();
  }
  async login(usercode, pincode) {
    // เมื่อล็อกอิน
    let r: any;

    const sql = `SELECT * from office where usercode ='${usercode}' and pincode = '${pincode}' `;
    let x = await this.getview(sql).then((data) => {
      if (data[0]) {
        this.showLoginText = "ยินดีในการกลับเข้ามาใช้บริการ";
        const egpoffice = {
          officecode: data[0].officecode,
          officename: data[0].officename,
        };

        this.setLocal(egpoffice);
        localStorage.setItem("token", "JWT");
        console.log("ok ok ok");

        this.isLoginSubject.next(true);

        r = { isLog: true, showText: this.showLoginText, myOffice: egpoffice };
      } else {
        r = {
          isLog: false,
          showText: "ท่าน Login ไม่ผ่าน กรุณาลองอีกครั้ง",
          myOffice: {
            officecode: "",
            officename: "",
          },
        };
      }
      console.log("r", r);
    });
    return await r;
  }
  isSignIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  // ฟังก์ชั่นจำลองการล็อกเอาท์
  logout(): void {
    // ให้ค่าสถานะล็อกอินเป็น false
    this.isLoggedIn = false;
    localStorage.removeItem("egpoffice");
    localStorage.removeItem("token");
  }
  getLocal(v: any) {
    console.log(v);
    this.setLocal(v);
    if (localStorage.getItem(v)) {
      const myItem = localStorage.getItem(v);
      console.log(myItem);

      return JSON.parse(myItem);
      // this.officecode = u.officecode;
    } else {
      return { x: 1, y: 2 };
    }
  }
  setLocal(o: any) {
    const egpoffice = {
      officecode: "00109760036000000",
      officename: "รพ.หนองบัวระเหว",
    };
    const myItem = localStorage.setItem("egpoffice", JSON.stringify(egpoffice));
    // ng g service auth-guard  return JSON.parse(myItem);
    // this.officecode = u.officecode;
  }
  async getview(view) {
    const url = "https://dmfzero.com/api_egp/apis.php/egp/view";

    const body = { view };
    return await this._http2.post(url, body).toPromise();
  }
  async getpcoutput() {
    const url = "https://dmfzero.com/apileaf/apis.php/dentalkpi/reppcs";
    return await this._http2.get(url).toPromise();
  }
  async getkpis() {
    const url =
      "https://dmfzero.com/apileaf/apis.php/dentalkpi/dentreporttemplate/hdc";
    return await this._http2.get(url).toPromise();
  }
  async postsql(sqlTable) {
    const body = { tbl: sqlTable, token: "1" };
    const url = this.api + `/dentalkpi/sql`;
    return await this._http2.post(url, body).toPromise();
  }

  async getApiData(p: string) {
    const url = this.api + p;
    console.log(url);

    // return await 'ss' ; // this._http2.get(url).toPromise();
  }
  async del(data) {
    {
      const url = "https://dmfzero.com/api_egp/apis.php/del/1";
      const bodys = JSON.stringify(data);
      let headers = new HttpHeaders();
      headers = headers.set(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=utf-8"
      );
      return await this._http2.post(url, bodys, { headers }).toPromise();
    }
  }
  async saveData(tbl, data) {
    {
      const url = "https://dmfzero.com/api_egp/apis.php/egp/savedata/" + tbl;
      const bodys = JSON.stringify(data);
      let headers = new HttpHeaders();
      headers = headers.set(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=utf-8"
      );
      return await this._http2.post(url, bodys, { headers }).toPromise();
    }
  }
  async insertUpdateData(tableName: string, whereName: any, formData: any) {
    const w = [];
    w.push(whereName);
    const f = [];
    f.push(formData);
    const url = `${this.api}insertUpdate`;
    const data = {
      tableName,
      whereName: w,
      formData: f,
    };
    const body = {
      data,
    };
    // console.log(body);

    const rs: any = await this._http2.post(url, body).toPromise();
    console.log(rs);

    return rs;
  }
  async updateData(tableName: string, whereName: any, formData: any) {
    const w = [];
    w.push(whereName);
    const f = [];
    f.push(formData);
    const url = `${this.api}update`;
    const data = {
      tableName,
      whereName: w,
      formData: f,
    };
    const body = {
      data,
    };
    //  console.log(body);

    const rs: any = await this._http2.post(url, body).toPromise();
    return rs;
  }

  async insertData(tableName: string, formData: any) {
    const f = [];
    f.push(formData);
    const url = `${this.api}insert`;
    const data = {
      tableName,
      formData: f,
    };
    const body = {
      data,
    };
    

    const rs: any = await this._http2.post(url, body).toPromise();
   

    return rs;
  }
  async deleteData(tableName: string, whereData: any) {
    const f = [];
    f.push(whereData);
    const url = `${this.api}del`;
    const data = {
      tableName,
      whereName: f,
    };
    const body = {
      data,
    };
    console.log(body);

    const rs: any = await this._http2.post(url, body).toPromise();
    return rs;
  }
  async getHosInAmphur(pv: string, ampcode2: string) {
    {
      const url =
        "https://opendata.service.moph.go.th/gis/v1/getgis/	provcode/" +
        pv +
        "/distcode/" +
        ampcode2;
      console.log(url);

      return await this._http2.get(url).toPromise();
    }
  }
  async getUsers() {
    const url = this.api + "dmat/users";
    // console.log(url);

    return await this._http2.get(url).toPromise();
  }
  async getStockIns(stockdate, mid) {
    const url = this.api + "dmat/stockin/" + stockdate + "/" + mid;
    //  console.log(url);

    return await this._http2.get(url).toPromise();
  }
  async getStockOut(stockdate, mid) {
    const url = this.api + "dmat/stockout/" + stockdate + "/" + mid;
    //  console.log(url);

    return await this._http2.get(url).toPromise();
  }
  getCurrentFiscalYear(option = "Y") {
    // get current date
    const today = new Date();

    // get current month
    const curMonth = today.getMonth();

    let fiscalYr = "";
    if (curMonth > 9) {
      //
      const nextYr1 = (today.getFullYear() + 1).toString();
      fiscalYr = today.getFullYear().toString(); // ;+ '-' + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
      const nextYr2 = today.getFullYear().toString();
      fiscalYr = (today.getFullYear() - 1).toString(); // + '-' + nextYr2.charAt(2) + nextYr2.charAt(3);
    }
    let fx = "";
    if (option === "Y") {
      fx = fiscalYr;
    }
    if (option === "end") {
      fx = fiscalYr + "09" + "01";
    }
    if (option === "begin") {
      fx = fiscalYr + "10" + "01";
    }
    return fx;
  }
  async getCoTables(tbl: string) {
    {
      const url = this.api + "dmat/getco/" + tbl;
      return await this._http2.get(url).toPromise();
    }
  }
  async getData(tbl, con) {
    {
      const body = { tbl, con };
      const url = this.api + "dmat/getdata";
      return await this._http2.post(url, body).toPromise();
    }
  }
  async getBalance(cutdate) {
    {
      const body = { cutdate };
      const url = this.api + "dmat/stocksbalance";
      return await this._http2.post(url, body).toPromise();
    }
  }
  async getTables() {
    {
      const url = this.api + "tableshow";
      return await this._http2.get(url).toPromise();
    }
  }
  // http://localhost:3000/tableshow/tbl_stockin
  async getTableShow(tbl: string) {
    {
      const url = this.api + "tableshow/" + tbl;

      return await this._http2.get(url).toPromise();
    }
  }
  async getStocks(pv: string) {
    {
      const url = this.api + "dmat/stocks";

      return await this._http2.get(url).toPromise();
    }
  }
  async getStockin(pv: string) {
    {
      const url = this.api + "dmat/stockin";

      return await this._http2.get(url).toPromise();
    }
  }
  async getCats(pv: string) {
    {
      const url = this.api + "dmat/cats";
      return await this._http2.get(url).toPromise();
    }
  }
  convDateToString(dt) {
    const m = 100 + Number(dt.month);
    const d = 100 + Number(dt.day);
    return dt.year + "-" + String(m).slice(-2) + "-" + String(d).slice(-2);
  }

  getCopyObj(source, target) {
    for (const k in source) {
      target[k] = source[k];
    }
  }

  fnGetnow(ymd = true, dot = "-") {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    let now = "";
    let mmm = mm.toString();
    let ddd = dd.toString();
    const yyyy = today.getFullYear();
    if (dd < 10) {
      ddd = "0" + dd;
    }
    if (mm < 10) {
      mmm = "0" + mm;
    }
    if (ymd) {
      now = yyyy + dot + mmm + dot + ddd;
    } else {
      now = ddd + dot + mmm + dot + yyyy;
    }
    return now;
  }
}
export class Appvar {
  public static isAdmin = false;
  public static logDoctorid = 0;
  public static apptitle = "โปรแกรมบันทึกคลีนิกทันตกรรม";
  public static visit: any;
  public static visits = [];
  public static cPrenames = [];
  public static cDoctors = [];
  public static cAssists = [];
}
