//import {ChangeDetectionStrategy } from '@angular/core';
import { tblProvince, tblContacts } from "./service/dentssjModel";
import { Component, ViewEncapsulation , ViewChild, ElementRef,Renderer2 } from "@angular/core";
import { DentssjService } from "./service/dentssj_service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
//import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  
//mport { faCoffee } from "@fortawesome/free-solid-svg-icons";
//import { latLng, tileLayer } from 'leaflet';
import * as area from "./service/maparea";
import { tokenize } from "@angular/compiler/src/ml_parser/lexer";
import { isNull } from "@angular/compiler/src/output/output_ast";
declare let L;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private ps: DentssjService,
    private messageService: MessageService
  ) {
    this.getReportDentnum();
    this.datax = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
    this.options = {
      title: {
        display: false,
        text: "My Title",
        fontSize: 16,
      },
      legend: { display: true, position: "bottom" },
    };
  }
 @ViewChild('htmlData', { static: false }) dt:ElementRef;
  //@ViewChild('dt') em:ElementRef;
  options: any;
  pvtumbon: any;
  tuntaArea: any;
  mymap: any;
  geojsonLayer1: any;
  geojsonLayer2: any;
  pvarea: any;
  zonearea: any;
  title = "dentssj";
  khets = [];
  isHome = "true";
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
  sexOptions = [];
  action = "";
  lastupdate = new Date();
  showMessageLogin = true;
  rpvFilter: any = [];
  listMarkerLayer1 = new Array();
  listMarkerLayer2 = new Array();
  listMarkerLayer3 = new Array();

  listDataLayer1; // 1.0 สำหรับเก็บข้อมูลค่าของแต่ละพื้นที่
  listDataLayer2;
  listDataLayer3;
  hospins: any = [];
  markers: any = [];
  //faCoffee = faCoffee;
  getLastUpdate(pvcode) {}
  getbgColor(v) {
    let bgcol = "white";
    if (v == 0) {
      bgcol = "red";
    }
    return bgcol;
  }
  goGenLink(pvcode){
    let p =this.syspv.find(x=> x.pvcode == pvcode);
        
    return 'https://'+p['ucode'];
  }
  pvcodelink='';
  doLogIn() {
    if (this.txtPincode.trim().substr(0, 1).toLowerCase() == "p") {
      this.pincode = this.txtPincode.trim().substr(1, 2);
      let k = this.pvs.findIndex((x) => x.pvcode == this.pincode);
      if (k > -1) {
        this.showMessageLogin = true;
        this.isLogin = true;
        this.userpvname = this.pvs[k]["pvname"];
        this.getPvinRegion(this.pvs[k]["khet"]);
        let pin = { pvcode: this.pincode };

        this.getContactInPv(this.pvs[k]);
        this.getPvnow(this.pvs[k]["pvcode"]);

        this.isShowPv = true;
      /*   let p =this.syspv.find(x=> x.pvcode == this.pincode);
        
        this.pvLink = 'https://'+p['ucode']
        console.log('pvlink=',this.pvLink); */
        
      } else {
        this.showMessageLogin = false;
        this.doShowErrMessage();
      }
    } else {
      this.showMessageLogin = false;
    }
  }
  doShowErrMessage() {
    this.isLogin = false;
    this.userpvname = "";
    this.messageService.add({
      severity: "error",
      summary: "Log in Not correct",
      detail: "โปรดป้อน PinCode ใหม่",
    });
    this.txtPincode = "";
    this.pincode = "";
  }
  doLogOut() {
    this.isLogin = false;
    this.userpvname = "";
    this.txtPincode = "";
    this.pincode = "";
    this.showMessageLogin = true;
    this.isShowPv = false;
  }
  sumDentist = 0;
  sumTunta = 0;
  sumVichakan = 0;
  sumClinic = 0;
  sumAssist = 0;
  sumOthers=0;
  bgColor = "white";
  getPvinRegion(k) {
    //console.log("xxxx=",this.pvs);
    if (this.isLogin) {
      this.pvKhet = this.pvs.filter((x) => {
        return x.khet == k;
      });

      this.showMessageLogin = false;
      this.isShowPv = false;
    } else {
      this.showMessageLogin = true;
    }
    this.rpvFilter = this.rpvs.filter((x) => {
      return x.khet == k;
    });
    this.getSum();
  }
  maxContacts = [];
  maxid = 0;
  getMaxId() {
    this.ps.getContacts().then((x) => {
      this.maxContacts = x["message"];
      this.maxid = Math.max(...this.maxContacts.map((s) => s.amount));
    
    });
  }
  getContactInPv(p) {
    this.contactInPv = this.contacts.filter((x) => {
      return x.pvcode == p.pvcode;
    });

    for (let x of this.contactInPv) {
      let yr: number = Number(x.yearbrth);
      let age = this.yearNow - (yr - 543);
      x["age"] = age;
    }

    this.isShowPv = true;
    this.pvNow = p;
  
    this.getPvnow(p["pvcode"]);
  }
  doSaveProvince() {
    let where = { pvcode: this.pvNow.pvcode };
    let now = new Date();
    this.myProvince.dateupdate =
      now.toISOString().split("T")[0] + " " + now.toTimeString().split(" ")[0];
    this.ps.updateData("province", where, this.myProvince).then((x) => {
      this.dgShow = false;
    });
  }
  editPerson(r, i) {
    this.action = "edit";
    this.myContact = r;
    this.dgShowContact = true;
  }
  viewPerson(r) {}
  movePerson(r, i) {
    this.confirmationService.confirm({
      message: "ท่านต้องการลบข้อมูลรายการนี้?",
      accept: () => {
        this.contactInPv.splice(i, 1);
        let where = { id: r.id };

        this.ps.deleteData("contacts", where).then((x) => {});
        //Actual logic to perform a confirmation
      },
    });
  }
  doCancelContact() {
    this.myContact = {};
    this.dgShowContact = false;
  }
  doCheckContactForm() {
    let ispass = true;
    let ms = "";
    if (this.myContact.dentname == null || this.myContact.dentname == "") {
      ispass = false;
      ms = "ข้อมูลชื่อ ไม่ถูกต้อง,";
    }
    if (this.myContact.denttype == null || this.myContact.denttype == "") {
      ispass = false;
      ms = ms + "ข้อมูลประเภท ไม่ถูกต้อง,";
    }
    if (this.myContact.posname == null || this.myContact.posname == "") {
      ispass = false;
      ms = ms + "ข้อมูลบทบาท ไม่ถูกต้อง,";
    }
    if (this.myContact.job == null || this.myContact.job == "") {
      ispass = false;
      ms = ms + "ข้อมูลตำแหน่ง ไม่ถูกต้อง,";
    }
    if (this.myContact.yearbrth == null || this.myContact.yearbrth < 2000) {
      ispass = false;
      ms = ms + "ข้อมูลปีเกิด พศ.เกิดไม่ถูกต้อง,";
    }
    if (this.myContact.yearbrth) {
      let yr = Number(this.myContact.yearbrth);

      if (isNaN(yr) || yr < 2500 || yr > 2560) {
        ispass = false;
        ms = ms + "ข้อมูลปีเกิด พศ.ไม่ถูกต้อง,";
      }
    }
    if (!ispass) {
      this.messageService.add({
        severity: "error",
        summary: ms,
        detail: "โปรดป้อนข้อมูลเพิ่ม",
      });
    } else {
      this.doSaveContact();
    }
  }
  doSaveContact() {
    this.dgShowContact = false;
    if (this.action == "add") {
      let now = new Date();
      this.myContact.dateupdate =
        now.toISOString().split("T")[0] +
        " " +
        now.toTimeString().split(" ")[0];
      this.ps.insertData("contacts", this.myContact).then((v) => {
        //this.myContact
        this.ps.getContacts().then((x) => {
          this.contacts = x["message"];
          /* this.maxContacts = x["message"];
       
          
          this.maxid= Math.max(...this.maxContacts.map(s => s.amount)); */
          this.contactInPv = this.contacts.filter((f) => {
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
      this.myContact.dateupdate =
        now.toISOString().split("T")[0] +
        " " +
        now.toTimeString().split(" ")[0];
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
  getShowHome() {
    this.isShowPv = false;
    this.rpvFilter = [...this.rpvs];
    this.getSum();
  }
  rpvs: any = [];
  dentnums: any = [];
  isClinicShow = false;
  dentnum: any = {
    pvcode: "",
    dentist: 0,
    tunta: 0,
    vichakan: 0,
    pvname: "..",
  };
  toggleShowClinic() {
  
    if (this.isClinicShow) {
      this.getShowMarkerClinic();
    } else {
      this.getRemoveMarkerClinic();
    }
  }
  getDentnum() {
    this.ps.getDentnum().then((x) => {
      this.dentnums = x["message"];
    });
  }
  getSum() {
    this.sumDentist = this.rpvFilter.reduce((n, { dentist }) => n + dentist, 0);
    this.sumTunta = this.rpvFilter.reduce((n, { tunta }) => n + tunta, 0);
    this.sumVichakan = this.rpvFilter.reduce(
      (n, { vichakan }) => n + vichakan,
      0
    );
    this.sumClinic = this.rpvFilter.reduce(
      (n, { isclinic }) => n + isclinic,
      0
    );
    this.sumAssist = this.rpvFilter.reduce(
      (n, { assist }) => n + assist,
      0
    );
    this.sumOthers = this.rpvFilter.reduce(
      (n, { others }) => n + others,
      0
    );
    this.totalDentist = this.sumDentist;
    this.totalTunta = this.sumTunta + this.sumVichakan;
    this.totalAssist = this.sumAssist+this.sumOthers;
    this.totalClinic = this.sumClinic;
    this.totalOthers = this.sumOthers;
  }
  dentagegroups = [];
  dataDentistAge: any;
  dataTuntaAge: any;
  datax: any;

  labels = ["20-25", "26-35", "36-45", "46-55", "56-60", "ไม่ระบุ"];
  labelsTunta = ["20-25", "26-35", "36-45", "46-55", "56-60", "ไม่ระบุ"];
  setDentnumval(age, dtype) {
    const MyAgeDentists = this.dentagegroups.filter(
      (x) => x.denttype == dtype && x.age_group == age
    );
  

    if (MyAgeDentists.length == 0) {
      return 0;
    } else {
      return MyAgeDentists[0]["age_count"];
    }
  }
  setTuntanumval(age, dtype) {
    const MyAgeDentists = this.dentagegroups.filter(
      (x) => x.denttype == dtype && x.age_group == age
    );
//   console.log("ckeckFunction", dtype, age);

    if (MyAgeDentists.length == 0) {
      return 0;
    } else {
      return MyAgeDentists[0]["age_count"];
    }
  }
  genChartData() {
    let ageDt: any;
    let lb = [...this.labels];
    let dentistLabels = lb.reduce(
      (o, k) => ((o[k] = this.setDentnumval(k, "ทันตแพทย์")), o),
      {}
    );
    let s = dentistLabels;
    ageDt = Object.keys(s).map((x) => s[x]);

    //  ageDt = Array.from(values, (y) => y["age_count"]);
    this.dataDentistAge = {
      labels: [...this.labels].map(() => this.labels.pop()),
      datasets: [
        {
          data: [...ageDt].map(() => ageDt.pop()),
          backgroundColor: [
            "#030800",
            "#36A2EB",
            "#FB5607",
            "#FF006E",
            "#8338EC",
            "#55a630",
          ],
          hoverBackgroundColor: [
            "#030800",
            "#36A2EB",
            "#FB5607",
            "#FF006E",
            "#8338EC",
            "#55a630",
          ],
        },
      ],
    };
  }
  genChartDataTunta() {
    let ageDt: any;
    let lb = [...this.labelsTunta];

    let dentistLabels = lb.reduce(
      (o, k) => ((o[k] = this.setTuntanumval(k, "ทันตาภิบาล")), o),
      {}
    );

    ageDt = Object.keys(dentistLabels).map((x) => dentistLabels[x]);
    this.dataTuntaAge = {
      labels: [...lb].map(() => lb.pop()),
      datasets: [
        {
          data: [...ageDt].map(() => ageDt.pop()),
          backgroundColor: [
            "#030800",
            "#36A2EB",
            "#FB5607",
            "#FF006E",
            "#8338EC",
            "#55a630",
          ],
          hoverBackgroundColor: [
            "#030800",
            "#36A2EB",
            "#FB5607",
            "#FF006E",
            "#8338EC",
            "#55a630",
          ],
        },
      ],
    };
  }
  totalDentist = 0;
  totalTunta = 0;
  totalClinic = 0;
  totalAssist = 0;
  totalOthers=0;
  arExceldent=[];
  getReportDentnum() {
    this.ps.getReportDentnum().then((x) => {
      this.rpvs = x["message"];
   //  console.log(this.rpvs);
      
      this.rpvs.forEach(z=>{
        let exdnum:rpDentExcel={
          region:z.khet,
          provincecode:z.pvcode,
          provincename:z.pvname,
SsjSize:z.ssjsize,
DentalClinic:z.isclinic,
Dentist:z.dentist,
Tunta:z.tunta,
Vichakan:z.vichakan,
Assist:z.assist,
Others:z.others
        }
this.arExceldent.push(exdnum);
      });
this.arExceldent.sort((a, b) => (a.region > b.region) ? 1 : (a.region === b.region) ? ((a.pvcode > b.pvcode) ? 1 : -1) : -1 );
  
      
      this.rpvFilter = [...this.rpvs];
      this.getSum();
    });

    this.ps.getAgeRroup().then((x) => {
      this.dentagegroups = x["message"];
   

      this.genChartData();
      this.genChartDataTunta();
    });
  }
  getPvnow(pvcode) {
  

    this.dentnum = this.dentnums.filter((f) => {
      return f.pvcode == pvcode;
    });
  }
  reportDentnums: any = [];

  setMarker() {
    const hosicon = L.icon({
      iconUrl: "assets/img/S.png",
      iconSize: [15, 20],
    });

    this.ps.getProvinces().then((x) => {
      this.pvs = x["message"];

      this.pvs.forEach((p, index) => {
        // console.log("p=",p);
        // console.log("p=",p);

        if (p.isclinic == 1) {
          // console.log("p.isclinic",p);

          const imarker = L.marker([p.lat, p.lng], {
            icon: hosicon,
            title: p.province,
            splevel: p.province,
          });
          let txt = "จังหวัด" + p.pvname + "<br>";
          txt += "(" + p.khet + ")<br>";

          imarker.bindPopup(txt).openPopup();
          //    L.layer(imarker).addTo(this.mymap);
          this.listMarkerLayer1.push(imarker);
          //  console.log(markers);
        }
      });

      this.listMarkerLayer1.forEach((marker) => {
        this.mymap.addLayer(marker);
      });
    });
  }
  geojsonLayerKpi: any;
  dataLayerKpi: any;
  kpiSelect="";
  kpirate=0.5;
  styleLayerKpi = (feature) => {
    let color = "";
 color = this.getKpiColor(feature.properties.id);
     
    return {
      fillColor: color, //this.getDentistColor(feature.properties.id),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };
  colors100=['#617aec','#3ea363','#73b87e','#84bb7b','#94bd77','#a4c073','#b0be6e','#c4c56d','#d4c86a','#e2c965','#f5ce62','#f3c563','#e9b861','#e6ad61','#ecac67','#e9a268','#e79a69','#e5926b','#df6b48','#eb4827',' #aa1a0d'];
  colors=[];
  getInfoColor(pc,rate){
   // console.log("pcRate==",pc,rate,this.colors100[(pc/rate)/5]);
    let k = this.getKpiLevel((pc/rate)/5);
   return this.colors100[k];
  }
  getKpiColor(d) {
    if (d == 10) {
      d = 12;
    }
    let p = this.kpiPv.filter((x) => {
    //  console.log("kpiSelect",this.kpiSelect,"d=",d,"xKpi=",x.kpi);
      
      return x.pvcode == d ;
    });
   // console.log("p=",p[0]);

    let z = 2;
    let kvalue=2;
    if (p.length > 0) {
      z = p[0][this.kpiSelect];
      kvalue= this.getKpiLevel(z/this.kpirate);
    }
  //  console.log("kvalue=",kvalue,kvalue/5,this.colors100[kvalue/5]);
    
    return this.colors100[kvalue/5];
  }

  geojsonLayerDentist: any;
  dataLayerDentist: any;
  styleLayerDentist = (feature) => {
    let color = "";
    this.showDentistOrTunta == "dentist"
      ? (color = this.getDentistColor(feature.properties.id))
      : this.showDentistOrTunta == "tunta"
      ? (color = this.getTuntaColor(feature.properties.id))
      : this.showDentistOrTunta == "c9"
      ? (color = this.getC9Color(feature.properties.id))
      : "#FFFFFF";
    return {
      fillColor: color, //this.getDentistColor(feature.properties.id),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  showDentistOrTunta = "";
  info = L.control(); // #1
  getInfo() {
    //console.log("myRpvs=",this.rpvs);

    this.info = L.control(); // #1

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };
    const vv = this;
    this.info.update = function (properties) {
      let pv;
      let kpi;
      let ms = "x";
      if (properties) {
        pv = vv.rpvs.filter((x) => {
          return x.pvcode == properties.id;
        });
       kpi= vv.kpiPv.filter((x) => {
          return x.pvcode == properties.id;
        });
        ms =
          "<h4>จังหวัด" +
          properties.name +
          "</h4><br>" +
          "เขต:" +
          pv[0]["khet"] +
          "<br>" +
          "ขนาด:" +
          pv[0]["ssjsize"] +
          "<br>" +
          "คลีนิกทันตกรรม:" +
          pv[0]["isclinic"] +
          "<br>" +
          "จำนวนทันตแพทย์:" +
          pv[0]["dentist"] +
          "<br>" +
          "จำนวนทันตาภิบาล:" +
          pv[0]["tunta"] +
          "<br>" +
          "จำนวน นวก.:" +
          pv[0]["vichakan"] +
          "<br><hr>" +
          "อัตราเข้าถึงบริการ:" + 
          kpi[0]["access"].toFixed(1) +"%<br>"+
          "รพสต.14กิจกรรม:" +
          kpi[0]["p14act"].toFixed(1) +"%<br>"+
          "Fs_ANC:" +
          kpi[0]["anc"].toFixed(1) +"%<br>"+
          "Fs_Fluoride4-12Y:" +
          kpi[0]["fluoride"].toFixed(1) +"%<br>"+
          "Fs_Sealant6-12Y:" +
          kpi[0]["sealant"].toFixed(1) +"%"+
          "<br><hr>" 
          ;
      }
      this._div.innerHTML = properties ? ms : "เลื่อนเม้าท์ไปบนแผนที่";
    };

    //this.info.addTo(this.mymap);
  }
  onEachFeatureLayerDentist = (feature, layer) => {
    // console.log(feature);
    const center = layer.getBounds().getCenter();
    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "my-leaflet-tooltip",
    });
    // this.listgeoName2.push(marker);
    // .addTo(this.mymap);

    /*  listMarkerLayer1.push(marker); */

    layer.on({
      mouseover: this.highlightFeatureDentist,
      mouseout: this.resetHighLightDentist,
    });
  };
  highlightFeatureDentist = (e) => {
    const layer = e.target;
    // console.log(layer);
    this.info.update(layer.feature.properties); // #
    layer.setStyle({
      color: "black",
      weight: 3,
      fillOpacity: 0.8,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  resetHighLightDentist = (e) => {
    this.info.update();

    this.geojsonLayerDentist.resetStyle(e.target);
  };
  kpiname={
    access:"อัตราการเข้าถึงบริการทันตกรรม(40)",
    fluoride:"ร้อยละการให้Fluorideเด็ก4-12ปี(50)",
    sealant:"ร้อยละการให้บริการSealantเด็ก6-12ปี(50)",
    anc:"ร้อยละการให้บริหารหญิงมีครรภ์(50)",
    p14act:"ร้อยละรพสต.คุณภาพ14กิจกรรม(60)",

};
  getShowGeoLayerKpi(kpi,rate){
this.kpiSelect=kpi;
this.kpirate=rate;
    this.geojsonLayerDentist = L.geoJson(this.pvborder, {
      style: this.styleLayerKpi,
      onEachFeature: this.onEachFeatureLayerDentist,
    }).addTo(this.mymap);
    this.menuTitle = this.kpiname[kpi];
    this.getLegendMenu();
  }
  getShowGeoLayerDentist(k) {
    // console.log("rpvs=",this.rpvs);

    this.showDentistOrTunta = k;
    if (this.geojsonLayerDentist != undefined) {
      this.geojsonLayerDentist.remove();
    }
    if (this.legendDentist != undefined) {
      this.legendDentist.remove();
    }
    // this.geojsonLayerDentist.remove();
    this.legendSSjsize.remove();
    this.getRemoveMarkerClinic();

    this.geojsonLayerDentist = L.geoJson(this.pvborder, {
      style: this.styleLayerDentist,
      onEachFeature: this.onEachFeatureLayerDentist,
    }).addTo(this.mymap);
this.menuTitle ="แสดง "+k; 
    this.getLegendMenu();
  }
  getShowMarkerClinic() {
    this.getRemoveMarkerClinic();

    this.setMarker();
  }
  getRemoveMarkerClinic() {
    this.listMarkerLayer1.forEach((marker) => {
      this.mymap.removeLayer(marker);
    });
  }

  pvborder: any;
  getPvGeoLayer(pv: string) {
    this.ps.getPvGeo("v").then((x) => {
      this.pvborder = x;
    });
  }
  ssjsizes: any = [];

  getLgColor = (d) => {
    let z = d;
    return z == "Extra"
      ? "#a39cff"
      : z == "XL"
      ? "#b4a5ff"
      : z == "L"
      ? "#b9c2ff"
      : z == "M"
      ? "#c4e7ff"
      : z == "S"
      ? "#cdfcff"
      : "#cdfcff";
  };
 
  getDentistColor(d) {
    if (d == 10) {
      d = 12;
    }
    //console.log(this.rpvs);

    let p = this.rpvs.filter((x) => {
      return x.pvcode == d;
    });
    // console.log("p=",p[0]);

    let z = 2;
    if (p.length > 0) {
      z = p[0]["dentist"];
    }
    return z == 0
      ? "#FF0000"
      : z == 1
      ? "#F9C74F"
      : z == 2
      ? "#90BE6D"
      : z == 3
      ? "#43AA8B"
      : z >= 4
      ? "#6e44ff"
      : "#77ff55";
  }
  getC9Color(d) {
    if (d == 10) {
      d = 12;
    }
    //console.log(this.rpvs);

    let p = this.c9s.filter((x) => {
      return x.pvcode == d;
    });
    // console.log("p=",p[0]);

    let z = -1;
    if (p.length > 0) {
      z = p[0]["cnt"];
    }
    return z == 0 ? "#FF0000" : z >= 1 ? "#6e44ff" : "#77ff55";
  }
  getTuntaColor(d) {
    if (d == 10) {
      d = 12;
    }
    //console.log(this.rpvs);

    let p = this.rpvs.filter((x) => {
      return x.pvcode == d;
    });
    // console.log("p=",p[0]);

    let z = 2;
    if (p.length > 0) {
      z = p[0]["tunta"] + p[0]["vichakan"];
    }
    return z == 0
      ? "#FF0000"
      : z == 1
      ? "#F9C74F"
      : z == 2
      ? "#90BE6D"
      : z == 3
      ? "#43AA8B"
      : z >= 4
      ? "#6e44ff"
      : "#77ff55";
  }
  getDentistColorLegend(z) {
    return z == 0
      ? "#FF0000"
      : z == 1
      ? "#F9C74F"
      : z == 2
      ? "#90BE6D"
      : z == 3
      ? "#43AA8B"
      : z >= 4
      ? "#6e44ff"
      : "#77ff55";
  }

  getColor = (d) => {
    if (d == 10) {
      d = 12;
    }
    let p = this.pvs.filter((x) => {
      return x.pvcode == d;
    });
    let z = p[0]["ssjsize"];
    return z == "Extra"
      ? "#a39cff"
      : z == "XL"
      ? "#b4a5ff"
      : z == "L"
      ? "#b9c2ff"
      : z == "M"
      ? "#c4e7ff"
      : z == "S"
      ? "#cdfcff"
      : "#cdfcff";
  };
  styleSsjsize = (feature) => {
    return {
      fillColor: this.getColor(feature.properties.id),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  showG1Ssjsize(mymap) {
    this.ps.getPvGeo("v").then((x) => {
      this.pvborder = x;
      this.geojsonLayer1 = L.geoJson(this.pvborder, {
        style: this.styleSsjsize,
      }).addTo(mymap);
      this.getInfo();
      this.info.addTo(this.mymap);
    });
  }
  legendDentist: any;
  getLegendDentist() {
    const klv = ["0", "1คน", "2คน", "3คน", "4คนขึ้นไป"];
    this.legendDentist = L.control({ position: "bottomright" });
    const vm = this;
    this.legendDentist.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        ranges = [0, 1, 2, 3, 4],
        labels = [];
      for (var i = 0; i < klv.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          vm.getDentistColorLegend(ranges[i]) +
          '"></i> ' +
          (ranges[i + 1] ? klv[i] + "<br>" : klv[i]);
      }
      return div;
    };
 //   this.legendDentist.addTo(this.mymap);
  }
  menuTitle="คลิ้กเลือกเมนูแสดงGis";
  legendMenu: any;
  getLegendMenu() {
    if (this.legendMenu != undefined) {
      this.legendMenu.remove();
    }
    const klv = ["0", "1คน", "2คน", "3คน", "4คนขึ้นไป"];
    this.legendMenu = L.control({ position: "bottomright" });
    const vm = this;
    this.legendMenu.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        ranges = [0, 1, 2, 3, 4],
        labels = [];
     
        div.innerHTML =
          '<i style="background:green' +
          '"></i> ' +
         vm.menuTitle;
    
      return div;
    };
   
   
   this.legendMenu.addTo(this.mymap);
  }
  legendSSjsize: any;
  getLegendSsjSize() {
    const klv = ["Extra", "XL", "L", "M", "S"];
    this.legendSSjsize = L.control({ position: "bottomright" });
    const vm = this;
    this.legendSSjsize.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        ranges = [30, 60, 80, 45, 8],
        labels = [];
      for (var i = 0; i < klv.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          vm.getLgColor(klv[i]) +
          '"></i> ' +
          (ranges[i + 1] ? klv[i] + "<br>" : klv[i]);
      }
      return div;
    };
    this.legendSSjsize.addTo(this.mymap);
  }
  myData:any;
  ngAfterViewInit() {
  
    this.myData=this.dt.nativeElement;
    
    
    this.mymap = L.map("map").setView([13.850314, 100.529339], 6);
    this.pvarea = area.pvarea;
    this.zonearea = area.zonearea;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mymap);
    this.showG1Ssjsize(this.mymap);
    this.getLegendSsjSize();
  }
  dataDentist = [];
  jobs = [];
  c9s = [];
  kpis = [];
  kpiObj = {};
  kpiPv = [];
  imgs = [
    { pic: "./assets/img/Slide1_resize.jpg" },
    { pic: "./assets/img/Slide2_resize.jpg" },
    { pic: "./assets/img/Slide3_resize.jpg" },
    { pic: "./assets/img/Slide4_resize.jpg" },
  ];
  pdfSrc = "./assets/img/ssjclub.pdf";
  pdfSrc2 ='https://1drv.ms/b/s!AjCV3qKMiqhsrW4Wg_BtHt8bjJMW?e=MiOKji';
  getKpiValue(pvcode) {
    let p: any;
    p = this.kpis.find((x) => x.pvcode == pvcode && x.kpi == "fluoride");
    let r = this.kpis.filter((x) => x.pvcode == pvcode && x.kpi == "fluoride");
    //console.log("kpis=",this.kpis);
    //console.log("p0=",p);
    //console.log("r=",r);
    let pvname = p["pvname"];
    
    let fluoride = (p["result"] * 100) / p["target"];
    p = this.kpis.find((x) => x.pvcode == pvcode && x.kpi == "sealant");
    let sealant = (p["result"] * 100) / p["target"];
    p = this.kpis.find((x) => x.pvcode == pvcode && x.kpi == "14act");
    let p14act = (p["result"] * 100) / p["target"];
    p = this.kpis.find((x) => x.pvcode == pvcode && x.kpi == "anc");
    let anc = (p["result"] * 100) / p["target"];
    p = this.kpis.find((x) => x.pvcode == pvcode && x.kpi == "access");
    let access = (p["result"] * 100) / p["target"];
    return {
      pvcode: pvcode,
      pvname: pvname,
      khet:p['khet'],
      anc: anc,
      fluoride: fluoride,
      sealant: sealant,
      access: access,
      p14act: p14act,
    };
  }
  getKpiLevel(pc) {
    if (pc > 100) {
      return 100;
    }
    for (let i = 0; i <= 100; i += 5) {
      if (pc <= i) {
        return i;
      }
    }
  }
  getKpilevelClass(i){


  }
  getKpi() {
    this.ps.getReportView(3).then((x) => {
      this.kpis = x["message"];

      this.pvs.forEach((x) => {
        this.kpiPv.push(this.getKpiValue(x.pvcode));
      });
   //  console.log("kpiPV", this.kpiPv);
      let maxFluoride = Math.max(...this.kpiPv.map((o) => o.kpi), 0);
      let minFluoride = Math.min(...this.kpiPv.map((o) => o.kpi), 0);
    
    });
  }
  getC9() {
    this.ps.getReportView(1).then((x) => {
      this.c9s = x["message"];
    });
  }
  klevel = 0;

  cols: any[];
  exportColumns: any[];
  dexchanges=[];
  syspv=[];
  pvLink="";
  ssjall=[];
  pvdetail=[];

  pvall=[];
 ptm:pitem;
yearnow = new Date().getFullYear()+543;
  checkPvData(){
  //  console.log(this.yearnow);
 let  maxmon=1000;    
this.pvall.forEach(x=>{
//  console.log(x.pvname);
  let mes="";
  maxmon=1000;
  this.contacts.forEach(y=>{

    if(x.pvcode==y.pvcode){
           
if(y.yearbrth==0){
  mes+=y.dentname +" ไม่ลงปีเกิด,";
}
if(y.yearbrth > 1 && y.yearbrth<(this.yearnow-60)){
  mes+=y.dentname +" ปีเกิดระบุว่าเกษียณอายุแล้ว,";
}
if(y.denttype==null){
  mes+=y.dentname +" ไม่ระบุประเภทบุคลากร,";
}
if(y.posname==""){
  mes+=y.dentname +" ไม่ระบุบทบาทในกลุ่มงาน,";
}
if(y.sex==null){
  mes+=y.dentname +" ไม่ระบุเพศ,";
}
let jb:string=y.job;
if(y.job==null || jb.length<3){
  mes+=y.dentname +" ไม่ระบุตำแหน่ง";
}

var d1 = new Date( y.dateupdate);
let d2 = new Date();
let mon = this.monthDiff(d1,d2);
if(mon < maxmon){maxmon=mon;}
    }
  });
  let dmes ="";
  if(maxmon>=6){
    dmes="นานกว่า 6เดือน";
  }else{
    dmes="...ตรวจสอบ";
  }

  let contact="";
  if(x.contacttel==null){
//console.log(x.pvname,x.contacttel);
contact = " ...กลุ่มงานทันตะยังไม่ระบุผู้ติดต่อ";
mes += contact;
  }
 let ss:pitem = {lastupdate:`${dmes}` ,khet:x.khet,pvcode:x.pvcode,pvname:x.pvname,errTxt:mes,complete:0,contact:contact }
this.pvdetail.push(ss);

});
//console.log(this.pvdetail);
this.pvdetail.sort((a, b) => (a.khet > b.khet) ? 1 : (a.khet === b.khet) ? ((a.pvcode > b.pvcode) ? 1 : -1) : -1 );
  }
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
  ngOnInit(): void {
    this.ps.getReportView(7).then(x=>{this.dexchanges = x["message"];  //console.log(this.dexchanges);
  });
    this.ps.getReportView(8).then(x=>{this.syspv = x["message"];});
    this.ps.getReportView(9).then(x=>{this.ssjall = x["message"];});
    this.ps.getReportView(10).then(x=>{
      this.pvall = x["message"];
      this.ps.getReportView(11).then(x=>{
        this.contacts = x["message"];
        this.checkPvData();  
      });

  });
    const reversed = this.colors100.reverse();
    this.cols = [
      { field: 'khet', header: 'KHET' },
      { field: 'pvname', header: 'PV' },
      { field: 'anc', header: 'ANC' },
      { field: 'fluoride', header: 'Fluoride' },
      { field: 'sealant', header: 'Sealant' },
      { field: 'p14act', header: 'P14Act' },
      { field: 'access', header: 'Access' }
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  this.klevel= this.getKpiLevel(84);
   

    this.getC9();

    this.getDentnum();

    this.dobj = this.ps.getdobj();
    this.jobOptions = this.dobj["jobs"];
    this.denttypeOptions = this.dobj["denttypes"];
    this.posnameOptions = this.dobj["posnames"];
    this.sexOptions = this.dobj["sexs"];
    this.khets = this.dobj["khets"];
    this.ps.getProvinces().then((x) => {
      this.pvs = x["message"];
      this.dataDentist = x["message"];
      this.getKpi();
    });
    this.getInfo();
    // this.getReportDentnum();
    this.ps.getContacts().then((x) => {
      this.contacts = x["message"];
    });
  }


exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.kpiPv);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    });
}

exportExceldent() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.arExceldent);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ข้อมูลจำนวนบุคลากร");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

}
export interface pitem {
  khet:string,
     pvcode:string,
    pvname:string,
    errTxt:string,
    complete:number,
    lastupdate:string,
    contact:string
     }
export interface rpDentExcel {
  region?:string,
      provincecode?:string,
     provincename?:string,
     SsjSize?:string,
     DentalClinic?:string,
     Dentist?:number,
     Tunta?:number,
     Vichakan?:number,
     Assist?:number,
     Others?:number
     }
    
      
          