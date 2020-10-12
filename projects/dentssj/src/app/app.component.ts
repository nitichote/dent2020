import { tblProvince, tblContacts } from './service/dentssjModel';
import { Component, ViewEncapsulation } from '@angular/core';
import { DentssjService } from './service/dentssj_service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
//import { latLng, tileLayer } from 'leaflet';
import * as area from './service/maparea';
declare let L;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private confirmationService: ConfirmationService, private ps: DentssjService, private messageService: MessageService) { }
  pvtumbon: any;
  tuntaArea: any;
  mymap: any;
  geojsonLayer1: any;
  geojsonLayer2: any;
  pvarea: any;
  zonearea: any;
  title = 'dentssj';
  khets = [];
  isHome="true";
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
  lastupdate=new Date();
  showMessageLogin=true;
  rpvFilter:any=[];
  listMarkerLayer1 = new Array();
  listMarkerLayer2 = new Array();
  listMarkerLayer3 = new Array();

  listDataLayer1; // 1.0 สำหรับเก็บข้อมูลค่าของแต่ละพื้นที่
  listDataLayer2;
  listDataLayer3;
  hospins: any = [];
  markers: any = [];

  getLastUpdate(pvcode){

  }
  getbgColor(v){
    let bgcol ="white";
if(v ==0){
  bgcol = "red";
}
return bgcol;

  }
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
        this.getPvnow(this.pvs[k]['pvcode']);
    
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
  sumDentist=0;
sumTunta=0;
sumVichakan=0;
sumClinic=0;
sumAssist=0;
bgColor="white";
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
  this.rpvFilter = this.rpvs.filter(x => {
    return x.khet == k;
  });
  this.getSum();
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
    this.getPvnow(p['pvcode']);
   
  }
  doSaveProvince() {
    let where = { pvcode: this.pvNow.pvcode };
    let now = new Date();
    this.myProvince.dateupdate = now.toISOString().split('T')[0]+' '+now.toTimeString().split(' ')[0];
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
      let now = new Date();
      this.myContact.dateupdate = now.toISOString().split('T')[0]+' '+now.toTimeString().split(' ')[0];
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
        this.ps.getDentnum().then((y) => {
          this.dentnums = y["message"]; 
          this.getPvnow(this.pincode); 
        });
      
      });

    } else {
      let where = { id: this.myContact.id };
      let now = new Date();
      this.myContact.dateupdate = now.toISOString().split('T')[0]+' '+now.toTimeString().split(' ')[0];
      this.ps.updateData("contacts", where, this.myContact).then((x) => {
        this.ps.getDentnum().then((y) => {
          this.dentnums = y["message"]; 
         
          this.getPvnow(this.pincode); 
        });
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
  getShowHome(){
    this.isShowPv=false;
    this.rpvFilter =[...this.rpvs];
    this.getSum();
  }
  rpvs:any=[{x:1,y:2}];
  dentnums:any=[];
  dentnum:any={pvcode:"",dentist:0,tunta:0,vichakan:0,pvname:".."};
  getDentnum(){
    this.ps.getDentnum().then((x) => {
      this.dentnums = x["message"];
    });
  }
  getSum(){
    this.sumDentist=this.rpvFilter.reduce((n, {dentist}) => n + dentist, 0);
    this.sumTunta=this.rpvFilter.reduce((n, {tunta}) => n + tunta, 0);
    this.sumVichakan=this.rpvFilter.reduce((n, {vichakan}) => n + vichakan, 0);
    this.sumClinic=this.rpvFilter.reduce((n, {isclinic}) => n + isclinic, 0);
    this.sumAssist=this.rpvFilter.reduce((n, {assistnum}) => n + assistnum, 0);
  }
  getReportDentnum(){
    console.log("ddd");
     this.ps.getReportDentnum().then((x) => {
      this.rpvs = x["message"];
      this.rpvFilter = [...this.rpvs];
      
this.getSum();

    });
  
  }
   getPvnow(pvcode){
     console.log("pvfilter=",pvcode);
     
    this.dentnum=this.dentnums.filter(f=>{
      return f.pvcode == pvcode;
    });
  }
  reportDentnums:any=[];
  setMarker(){
    console.log("marker");
    
  let pvlatlng00=area.pvlatlng.filter((x)=>{
    let y:string = String(x['zip']);
   let z= y.slice(y.length-3);
  
   return z=='000';
  });
  
   const hosicon = L.icon({
      iconUrl: "assets/img/S.png",
      iconSize: [15, 20]
  });
  pvlatlng00.forEach((p, index) => {
    console.log("p=",p);
   
    const imarker = L.marker([p.lat, p.lng], {
        icon: hosicon,
        title: p.province,
        splevel: p.province
    });
    let txt = "จังหวัด" + p.province + "<br>";
    txt += "(" + p.district + ")<br>";

   imarker.bindPopup(txt).openPopup();
    //    L.layer(imarker).addTo(this.mymap);
    this.listMarkerLayer1.push(imarker);
    //  console.log(markers);
});
this.listMarkerLayer1.forEach(marker => {
    this.mymap.addLayer(marker);
});
  }
  ngAfterViewInit(){
    console.log("ddddssss");
    
    this.mymap = L.map('map').setView([13.850314, 100.529339], 6);
    this.pvarea = area.pvarea;
    this.zonearea = area.zonearea;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
    this.showG1(this.mymap);

    const klv=['Extra','XL','L','M','S'];
    var legend = L.control({position: 'bottomright'});
    const vm = this;
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            ranges = [30, 60, 80,45,8],
            labels = [];
       for (var i = 0; i < klv.length; i++) {
            div.innerHTML +=
                '<i style="background:' + vm.getLgColor(klv[i]) + '"></i> ' +
                (ranges[i + 1] ? klv[i] + '<br>' : klv[i]);
       }
        return div;
      };
      legend.addTo(this.mymap);
      
      this.setMarker();

  }
  pvborder:any;
  getPvGeoLayer(pv: string){
    this.ps.getPvGeo('v').then((x)=>{
this.pvborder=x;
    });
  }
  ssjsizes:any=[];
 
 getLgColor=(d)=> {
   console.log("d=",d);
   let z = d ;
   return z=='Extra' ? '#a39cff' :
   z=='XL'  ? '#b4a5ff' :
   z=='L'  ? '#b9c2ff' :
   z=='M'  ? '#c4e7ff' :
   z=='S'  ? '#cdfcff' :
             '#cdfcff'; 
    
}


getColor=(d)=> {
  //console.log("d=",d);
  if(d==10){d=12;}
 // console.log("d2=",d);
   let p = this.pvs.filter((x)=>{
return x.pvcode==d;
   }); 
 //  console.log("p=",p); 
let z = p[0]['ssjsize'] ;
    return z=='Extra' ? '#a39cff' :
    z=='XL'  ? '#b4a5ff' :
    z=='L'  ? '#b9c2ff' :
    z=='M'  ? '#c4e7ff' :
    z=='S'  ? '#cdfcff' :
              '#cdfcff';
}
 myStyle=(feature)=> {
    return {
        fillColor: this.getColor(feature.properties.id),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

  showG1(mymap) {
    this.ps.getPvGeo('v').then((x)=>{
      this.pvborder=x;
        console.log(this.pvborder);
        
    this.geojsonLayer1 = L.geoJson(this.pvborder, {style:this.myStyle
      //   fillColor: this.getColor(this.pvborder.feature.properties.id), // สีของพื้นที่
        // style: this.styleLayerTambon1,
        // fillColor:this.styleLayerTambon1,
        // click:ck()
       /* style: {
           color: 'green', // สีของเส้น
            // opacity: 0.5, // 0.0 - 1.0 ความทึบแสงของเส้น
            // fillColor: 'green', // สีของพื้นที่
         fillOpacity: 0.5, // 0.0 - 1.0 ความทึบแสงของพื้นที่
       weight: 2, // 0 - 99 ความหนาหน่วยเป็น pixel
           dashArray: 3 // เส้นปะ
       }, */
       // onEachFeature: this.onEachFeaturePvarea
    }).addTo(mymap);
  });
}
  ngOnInit(): void {
   
    this.getDentnum();
    this.dobj = this.ps.getdobj();
    this.jobOptions = this.dobj['jobs'];
    this.denttypeOptions = this.dobj['denttypes'];
    this.posnameOptions = this.dobj['posnames'];
    this.sexOptions = this.dobj['sexs'];
    this.khets = this.dobj['khets'];
    this.ps.getProvinces().then((x) => {
      this.pvs = x["message"];
     
    });
    
    this.getReportDentnum();
    this.ps.getContacts().then((x) => {
      this.contacts = x["message"];
    });
  }
}

 