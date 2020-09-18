import { tblProvince, tblContacts } from './service/dentssjModel';
import { Component } from '@angular/core';
import { DentssjService } from './service/dentssj_service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private confirmationService: ConfirmationService, private ps: DentssjService, private messageService: MessageService) { }
  title = 'dentssj';
  khets = [];
  dobj = {};
  pvs = [];
  pvKhet = [];
  contacts = [];
  contactInPv = [];
  isShowPv = false;
  pvNow: any = {};
  contactNow: tblContacts = {};
  isLogin = false;
  userpvname = "";
  txtPincode = "";
  pincode = "";
  dgShow = false;
  dgShowContact = false;
  dgShowDelete = false;
  myContact: tblContacts = {};
  myProvince: tblProvince = {};
  yearNow = new Date().getFullYear();
  denttypeOptions = [];
  jobOptions = [];
  posnameOptions = [];
  sexOptions=[];
  action = "";
  showMessageLogin=true;
  doLogIn() {
    

    if (this.txtPincode.trim().substr(0, 1).toLowerCase() == "p") {
      this.pincode = this.txtPincode.trim().substr(1, 2);
      let k = this.pvs.findIndex(x => x.pvcode == this.pincode);
      if (k > -1) {
        this.showMessageLogin=true;
        this.isLogin = true;
        this.userpvname = this.pvs[k]['pvname'];
        this.getPvinRegion(this.pvs[k]['khet']);
       let pin={pvcode:this.pincode};
        
        this.getContactInPv(this.pvs[k]);
        this.isShowPv=true;
      } else {
        this.showMessageLogin=false;
        this.doShowErrMessage();
      }
    } else {
      this.showMessageLogin=false;
    }
  }
  doShowErrMessage() {
    this.isLogin = false;
    this.userpvname = "";
    this.messageService.add({ severity: 'error', summary: 'Log in Not correct', detail: 'โปรดป้อน PinCode ใหม่' });
    this.txtPincode = "";
    this.pincode = "";

  }
  doLogOut() {
    this.isLogin = false;
    this.userpvname = "";
    this.txtPincode = "";
    this.pincode = "";
    this.showMessageLogin=true;
    this.isShowPv=false;
  }
  getPvinRegion(k) {
   //console.log("xxxx=",this.pvs);
   if(this.isLogin){

    this.pvKhet = this.pvs.filter(x => {
      return x.khet == k;
    }); 
    this.showMessageLogin=false;
    this.isShowPv = false;

  }else{
    this.showMessageLogin=true;
  } 
}
  maxContacts=[];
  maxid=0;
  getMaxId(){
    this.ps.getContacts().then((x) => {
      this.maxContacts = x["message"];
      this.maxid= Math.max(...this.maxContacts.map(s => s.amount));
      console.log(this.maxid);
      
    });
   
  }
  getContactInPv(p) {
    this.contactInPv = this.contacts.filter(x => {
      return x.pvcode == p.pvcode;
    });

    for (let x of this.contactInPv) {
      let yr: number = Number(x.yearbrth);
      let age = this.yearNow - (yr - 543);
      x['age'] = age;
    }

    this.isShowPv = true;
    this.pvNow = p;
    console.log(this.pvNow);
    
  }
  doSaveProvince() {
    let where = { pvcode: this.pvNow.pvcode };

    this.ps.updateData("province", where, this.myProvince).then((x) => {
      this.dgShow = false;

    });
  }
  editPerson(r, i) {
    this.action = "edit";
    this.myContact = r;
    this.dgShowContact = true;
  }
  viewPerson(r) { }
  movePerson(r, i) {
    console.log("r", r, "i=", i);

    this.confirmationService.confirm({
      message: 'ท่านต้องการลบข้อมูลรายการนี้?',
      accept: () => {
        this.contactInPv.splice(i, 1);
        let where = { id: r.id };

        this.ps.deleteData("contacts", where).then((x) => {
         
        });
        //Actual logic to perform a confirmation
      }
    });
  }
  doCancelContact() {
    this.myContact = {};
    this.dgShowContact = false;
  }
  doCheckContactForm() {
    let ispass = true;
    let ms ="";
    if (this.myContact.dentname==null || this.myContact.dentname == "") {
      ispass = false;
      ms="ข้อมูลชื่อ ไม่ถูกต้อง,";
    }
    if ( this.myContact.denttype==null || this.myContact.denttype == "") {
      ispass = false;
      ms=ms+"ข้อมูลประเภท ไม่ถูกต้อง,";
    }
    if (this.myContact.posname==null || this.myContact.posname == "") {
      ispass = false;
      ms=ms+"ข้อมูลบทบาท ไม่ถูกต้อง,";
    }
    if (this.myContact.job==null || this.myContact.job == "") {
      ispass = false;
      ms=ms+"ข้อมูลตำแหน่ง ไม่ถูกต้อง,";
    }
    if(this.myContact.yearbrth==null || this.myContact.yearbrth < 2000){
      ispass = false;
      ms=ms+"ข้อมูลปีเกิด พศ.เกิดไม่ถูกต้อง,";
    }
    if(this.myContact.yearbrth){
     let yr=Number(this.myContact.yearbrth);
     console.log(yr);
     
     if(isNaN(yr) || yr<2500 || yr >2560){
       ispass = false;
       ms=ms+"ข้อมูลปีเกิด พศ.ไม่ถูกต้อง,";
     }
    }
    if(! ispass){
    this.messageService.add({ severity: 'error', summary: ms, detail: 'โปรดป้อนข้อมูลเพิ่ม' });
    }else{
this.doSaveContact();
    }

  }
  doSaveContact() {
    this.dgShowContact = false;
    if (this.action == "add") {

      this.ps.insertData("contacts", this.myContact).then(v=>{
        //this.myContact
        this.ps.getContacts().then((x) => {
          this.contacts = x["message"];
          /* this.maxContacts = x["message"];
          console.log(this.maxContacts);
          
          this.maxid= Math.max(...this.maxContacts.map(s => s.amount)); */
this.contactInPv=this.contacts.filter(f=>{
  return f.pvcode == this.pincode;
});
          //console.log(this.maxid);
          
        });
        
      });

    } else {
      let where = { id: this.myContact.id };

      this.ps.updateData("contacts", where, this.myContact).then((x) => {

      });
    }
  }
  doAddNewContact() {
    this.action = "add";
    this.myContact = {};
    this.myContact.pak = this.pvNow.pak;
    this.myContact.pvcode = this.pvNow.pvcode;
    this.myContact.pvname = this.pvNow.pvname;
    this.myContact.khet = this.pvNow.khet;
    this.dgShowContact = true;
  }
  doEditOffice() {
    this.showDialogProvince();
  }

  showDialogProvince() {
    this.myProvince = this.pvNow;
    this.dgShow = true;
  }
  ngOnInit(): void {
    this.dobj = this.ps.getdobj();
    this.jobOptions = this.dobj['jobs'];
    this.denttypeOptions = this.dobj['denttypes'];
    this.posnameOptions = this.dobj['posnames'];
    this.sexOptions = this.dobj['sexs'];
    this.khets = this.dobj['khets'];
    this.ps.getProvinces().then((x) => {
      this.pvs = x["message"];
    });
    this.ps.getContacts().then((x) => {
      this.contacts = x["message"];
    });
  }
}

