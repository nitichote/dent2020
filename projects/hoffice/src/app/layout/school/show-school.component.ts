import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { HofficeService } from "../../service/hoffice_service";
import * as moment from "moment";
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-show-school",
  templateUrl: "./show-school.component.html",
  styleUrls: ["./show-school.component.scss"],
})
export class ShowSchoolComponent implements OnChanges {
  constructor(private _http: HttpClient,private ps: HofficeService, private messageService: MessageService) { }
  @Input() rpyear: any;
  @Input() hcode: any;
  @Input() ampcode: any;
  formData = new FormData();
 
  schools: any = [];
  amps: any = [];
  schoolsAmp: any = [];
  coke: any;
  sweet:any;
  candy:any;
  today = moment().format("YYYY-MM-DD hh:mm:ss");
  showAmp(ampcode) {
    this.schoolsAmp = this.schools.filter((x) => {
      return x.code === ampcode;
    });
  }
  myColorVaraible = "yellow";
  txtPincode = "";
  pincode = "";
  isLog = false;
  logLevel = "";
  logUser = "";
  schpin = localStorage.getItem('schoolPincode');
  amp = ["3601", "3602", "3603", "3604", "3605", "3606", "3607", "3608", "3609",
    "3610", "3611", "3612", "3613", "3615", "3616", "3614"
  ];
  onSubmit() {
    return this._http.post('http://127.0.0.1:3000/hoffice/profile', this.formData).subscribe(
      (response) => {
        alert('File Uploaded Successfully')
      },
      (error) => {
        alert('Something Went Wrong !!!')
      }
    );
  }
  runDoLogin() {
    this.doLogin();
  }
  doLogin() {
    this.pincode = this.txtPincode.trim().slice(1);
    
    //console.log("pincode=", this.pincode);
    if (this.pincode.length == 4 && this.txtPincode.substr(0, 1) == "s") {
      let k = this.amps.findIndex(x => x.code == this.pincode);
      if (k > -1) {

        
        this.isLog = true;
        this.logUser = this.amps[k]['name'];
        this.logLevel = "อำเภอ";
        let sc = {pincode:this.pincode,logUser:this.logUser,logLevel:this.logLevel};
        localStorage.setItem("schoolPincode", JSON.stringify(sc));
        this.doSchoolTag(this.pincode);
      } else {
        this.getErrorLogin();
      }
    }
    else if (this.pincode.length == 5 && this.txtPincode.substr(0, 1) == "s") {

      let ind = this.offices.findIndex(x => x.off_id == this.pincode);

      //console.log("h=",h);
      if (ind > -1) {
        this.logUser = this.offices[ind]['off_name'];
        this.logLevel = "หน่วยบริการ";
        
        let sc = {pincode:this.pincode,logUser:this.logUser,logLevel:this.logLevel};
        localStorage.setItem("schoolPincode", JSON.stringify(sc));
        this.isLog = true;
        this.doSchoolTag(this.pincode);
      } else {
        this.getErrorLogin();

      }

    }
    else {
      this.getErrorLogin();
    }

  }
  getErrorLogin() {
    this.messageService.add({ severity: 'error', summary: 'Log in Not correct', detail: 'โปรดป้อน PinCode ใหม่' });
    this.txtPincode = "";
    this.pincode = "";
   // localStorage.removeItem('schoolPincode');
  }
  doLogOut() {
    localStorage.removeItem('schoolPincode');
    this.txtPincode="";
    this.isLog = false;
    for (var x of this.schools) {
      x['tag']="";
      }
      for (var x of this.schoolsAmp) {
        x['tag']="";
        }
  }

  cellData: any;
  myEditInit(e) {
    //console.log(e);
    let d = e.data;
    this.cellData = d[e.field];
  }
  myEditComplete(e) {
    let d = e.data;

    if (this.cellData != d[e.field]) {
      let isnocoke: any;
      let isnocandy:any;
      let isnosweet:any;
      isnocoke = d["isnocoke"];
      isnocandy = d["isnocandy"];
      isnosweet = d["isnosweet"];
      let schoolid = d["schoolid"];
      //let year = "2563";
      let w = "schoolid=" + "'" + schoolid + "'";
      let formData = {
        schoolid: schoolid,
        lastupdate: this.today,
        isnocoke: isnocoke,
        isnocandy:isnocandy,
        isnosweet:isnosweet,
        rpyear: this.rpyear, 
        ip:this.ipAddress,
        userpin:this.pincode
      };
      let where = { schoolid: schoolid, rpyear: this.rpyear };
      this.ps.insertUpdateData("school_env", where, formData);
      d["ip"] = this.ipAddress;
      d["lastupdate"]=this.today;
    }
  }
  getSchoolAmp() {
    this.schoolsAmp = this.schools.filter((x) =>x.code == this.ampcode);
    if(this.pincode.length==4){
    this.doSchoolTag(this.pincode);
  }
}
  getSchoolHcode() {
    this.schoolsAmp = this.schools.filter((x) => x.hcode == this.hcode);
    if(this.pincode.length==5){
      this.doSchoolTag(this.pincode);
    }
  }
  // this.getSchoolAmp();
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case "rpyear": {
            this.doSomething(change.currentValue);
            break;
          }

          case "ampcode": {
            this.ampcode = change.currentValue;
            this.getSchoolAmp();
            break;
            // this.doSomething(change.currentValue);
          }
          case "hcode": {
            this.hcode = String(change.currentValue).padStart(5, "0");
            this.getSchoolHcode();
          }
        }
      }
    }
  }

  doSomething(currentValue: any) {
    //  throw new Error("Method not implemented.");
    //console.log(currentValue);
  }
  offices: any = [];
  doSchoolTag(pincode) {
    for (var x of this.schools) {
      x['tag']="";
      }

    //this.pincode = localStorage.getItem('schoolPincode');
    if (this.pincode.length == 4) {
      for (var x of this.schoolsAmp) {
        let m: string = x['tamboncode'];
        if (m.substr(0, 4) == pincode) {
          x['tag'] = 1;

        } else {
        x['tag'] = 0;
        }
      }
    }else{
      for (var x of this.schoolsAmp) {
        let m: string = x['hcode'];
        if (m == pincode) {
          x['tag'] = 1;

        } else {
        x['tag'] = 0;
        }
      }
    }
  }
  schLog:any={};
  ipAddress="";
  getIPAddress()
  {
    this._http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
     // console.log(this.ipAddress);
      
    });
  }
  ngOnInit(): void {
    // console.log(this.today);
this.getIPAddress();
   // console.log("schpincode",localStorage.getItem('schoolPincode'));
    
    let x="";
    if(localStorage.getItem('schoolPincode')!=null){
this.isLog=true;
this.schLog= JSON.parse(localStorage.getItem('schoolPincode'));
this.pincode = this.schLog.pincode;
this.logLevel = this.schLog.logLevel;
this.logUser = this.schLog.logUser;
//console.log("schLog = ",this.schLog);

this.doSchoolTag(this.pincode);
    } else{
      this.isLog=false;
    }
    this.coke = [
          { label: "โปรดเลือกรายการ", value: "0" },
      { label: "ไม่ปลอดน้ำอัดลม", value: "2" },
      { label: "ปลอดน้ำอัดลม ", value: "1" },
      { label: "ไม่ระบุ", value: "0" }
    ];
    this.sweet = [
      { label: "โปรดเลือกรายการ", value: "0" },
      { label: "ไม่ปลอดเครื่องดื่มรสหวาน", value: "2" },
      { label: "ปลอดเครื่องดื่มรสหวาน ", value: "1" },
      { label: "ไม่ระบุ", value: "0" }
    ];
    this.candy = [ { label: "โปรดเลือกรายการ", value: "0" },
      { label: "ไม่ปลอดขนมกรุบกรอบ", value: "2" },
      { label: "ปลอดขนมกรุบกรอบ ", value: "1" },
      { label: "ไม่ระบุ", value: "0" }
    ];
    //  this.ampcode = "";
    // this.rpyear = "2563";
    // this.hcode = "03967";
    this.ps.getAmp36().then((x) => {
      this.amps = x["message"];
   
      
    });
    this.ps.getOfficesCpho().then((x) => {
      this.offices = x["message"];;
    
    });
    this.ps.getSchoolsEnv().then((x) => {
      this.schools = x["message"];
      // console.log(this.schools.length());
      //console.log(this.schools);
      this.getSchoolAmp();

      //   console.log(this.schoolsAmp);
    });
  }
}
