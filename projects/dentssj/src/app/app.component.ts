import { tblProvince, tblContacts } from "./service/dentssjModel";
import { Component, ViewEncapsulation } from "@angular/core";
import { DentssjService } from "./service/dentssj_service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
//mport { faCoffee } from "@fortawesome/free-solid-svg-icons";
//import { latLng, tileLayer } from 'leaflet';
import * as area from "./service/maparea";
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
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]   ,

      };
        this.options = {
            title: {
                display: false,
                text: 'My Title',
                fontSize: 16
            },
            legend: { display: false,
                position: 'bottom'
            }
        };
  }
  options :any;
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
      console.log(this.maxid);
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
    console.log(this.pvNow);
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
          console.log(this.maxContacts);
          
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
    console.log("ggg");

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
      (n, { assistnum }) => n + assistnum,
      0
    );
  }
  dentagegroups = [];
  dataDentistAge: any;
  datax:any;
  genChartData(dtype) {
    let ageDt: any;
    if (dtype == "ทันตแพทย์") {
      const ageDentists = this.dentagegroups.filter(
        (x) => x.denttype == "ทันตแพทย์"
      );

      ageDt = Array.from(ageDentists, (y) => y["age_count"]);
      console.log("ageDentist",ageDentists);
      
      console.log("ageDt",ageDt);
      
    }
    this.dataDentistAge = {
      labels: ["20-25", "26-35", "36-45", "46-55", "56-60", "ไม่ระบุ"],
      datasets: [
        {
          data: ageDt,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
        },
      ],
    };
  }
  getReportDentnum() {
    this.ps.getReportDentnum().then((x) => {
      this.rpvs = x["message"];
      this.rpvFilter = [...this.rpvs];
      this.getSum();
    });

    this.ps.getAgeRroup().then((x) => {
      this.dentagegroups = x["message"];
      console.log("dentagegroup",this.dentagegroups);
      
this.genChartData("ทันตแพทย์");

    });
  }
  getPvnow(pvcode) {
    console.log("pvfilter=", pvcode);

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
      let ms = "x";
      if (properties) {
        pv = vv.rpvs.filter((x) => {
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
          "<br>";
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

    this.getLegendDentist();
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
    this.legendDentist.addTo(this.mymap);
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
  ngAfterViewInit() {
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
  getC9() {
    this.ps.getReportView(1).then((x) => {
      this.c9s = x["message"];
    });
  }
  ngOnInit(): void {
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
    });
    this.getInfo();
    // this.getReportDentnum();
    this.ps.getContacts().then((x) => {
      this.contacts = x["message"];
    });


  }
}
