import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as area from "../service/maparea";
import { KpiShareComponent } from "./kpi-share.component";
declare let L;
@Component({
  selector: "app-kpi-map",
  templateUrl: "./kpi-map.component.html",
  styleUrls: ["./kpi-map.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class KpiMapComponent extends KpiShareComponent implements OnInit {
  geojsonLayer1: any;
  mymap: any;
  pvarea: any;
  colors100 = [
    "#617aec",
    "#3ea363",
    "#73b87e",
    "#84bb7b",
    "#94bd77",
    "#a4c073",
    "#b0be6e",
    "#c4c56d",
    "#d4c86a",
    "#e2c965",
    "#f5ce62",
    "#f3c563",
    "#e9b861",
    "#e6ad61",
    "#ecac67",
    "#e9a268",
    "#e79a69",
    "#e5926b",
    "#df6b48",
    "#eb4827",
    " #aa1a0d",
  ];
  colors = [];
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
  kpirate = 1;
  kpiSelect = "";
  kpiOptions=["Access","14Act","Anc","Fluoride","Sealant"];
  kpiList = [
    {
      kpiname: "Access",
      kpiPc: "pcAccess",
      kpirate: 0.4,
      kpiInd: 0,
      kpiTitle:"ผลงานอัตราการเข้าถึงบริการทันตกรรม"
    },
    {
      kpiname: "14Act",
      kpiPc: "pc14A",
      kpirate: 0.6,
      kpiInd: 1,
      kpiTitle:"ผลงานรพสต./ศสม.คุณภาพ14กิจกรรม"
    },
    {
      kpiname: "Fs_Anc",
      kpiPc: "pcAnc",
      kpirate: 0.4,
      kpiInd: 2,
      kpiTitle:"ผลงานตรวจฟันขูดหินปูนหญิงมีครรภ์"
    },
    {
      kpiname: "Fs_Fluoride",
      kpiPc: "pcFluoride",
      kpirate: 0.5,
      kpiInd: 3,
      kpiTitle:"ผลงานการทา/เคลือยฟลูออไรด์เด็ก 4-12ปี"
    },
    {
      kpiname: "Fs_Sealant",
      kpiPc: "pcSealant",
      kpirate: 0.5,
      kpiInd: 4,
      kpiTitle:"ผลงานการเคลือบหลุมร่องฟันเด็ก6-12ปี"
    },
  ];
  kpiNow:any;
  getKpiChoice(i){
this.kpiNow=this.kpiList[i];
this.getShowKpis();
  }
  getKpiInfo() {}
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
  styleLayerR9 = (feature) => {
      return {
     fillColor: "green",//", //this.getDentistColor(feature.properties.id),
      weight: 2,
      opacity: 1,
      color: "red",
     // dashArray: "3",
      fillOpacity: 0,
    };
  };
  getShowR9(){
    this.showR9Map(this.mymap);
  }
  getShowKpis(){
    this.showAmpMap(this.mymap);
    this.geojsonLayerR9.bringToFront();
   
  }
  getKpiColor(d) {
   // console.log("D=",d);
    let p = this.kpis.filter((x) => {
     // console.log("x=",x);
      
      return x.ampcode == d;
    });
   
    
   // console.log("p=",p[0]);

this.kpiSelect=this.kpiNow.kpiPc;
this.kpirate = this.kpiNow.kpirate;
    let z = 2;
    let kvalue = 2;
    if (p.length > 0) {
      z = p[0][this.kpiSelect];
      kvalue = this.getKpiLevel(z / this.kpirate);
    }
    //  console.log("Z=",z,"kvalue=",kvalue,kvalue/5,this.colors100[kvalue/5]);

    return this.colors100[kvalue / 5];
  }
  onEachFeatureLayerAmp = (feature, layer) => {
    const center = layer.getBounds().getCenter();
    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "my-leaflet-tooltip",
    });
  };
  onEachFeatureLayerR9 = (feature, layer) => {
    const center = layer.getBounds().getCenter();
    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "my-leaflet-tooltip",
    });
  };
  showAmpMap(mymap) {
    this.geojsonLayerKpi = L.geoJson(this.pvarea, {
      style: this.styleLayerKpi,
    //  onEachFeature: this.onEachFeatureLayerAmp,
    }).addTo(mymap);
  //  mymap.fitBounds(this.geojsonLayer1.getBounds());
    // this.getInfo();
    //  this.info.addTo(this.mymap);
  }
  geojsonLayerBase:any;
  geojsonLayerR9:any;
  geojsonLayerKpi:any;
  showBaseMap(mymap) {
    this.geojsonLayerBase = L.geoJson(this.pvarea, {
    //  style: this.styleLayerKpi,
      onEachFeature: this.onEachFeatureLayerAmp,
    }).addTo(mymap);
    mymap.fitBounds(this.geojsonLayerBase.getBounds());
    // this.getInfo();
    //  this.info.addTo(this.mymap);
  }
  showR9Map(mymap) {
    this.geojsonLayerR9 = L.geoJson(area.r9, {
    style: this.styleLayerR9,
  // onEachFeature: this.onEachFeatureLayerR9,
    }).addTo(mymap);
  //  mymap.fitBounds(this.geojsonLayer1.getBounds());
    // this.getInfo();
    //  this.info.addTo(this.mymap);
  }
  ngAfterViewInit() {
    //this.myData=this.dt.nativeElement;

    this.mymap = L.map("map").setView(
      [14.45258624036948, 102.72686318633123],
      8
    );
    this.pvarea = area.r9Amp;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mymap);
    //  this.showG1Ssjsize(this.mymap);
    // this.getLegendSsjSize();
  this.showBaseMap(this.mymap);
  this.getShowR9();
  }
  kpis: any = [];
  ngOnInit(): void {
    this.colors100.reverse();
    this.ps.getReportView(4).then((x) => {
      this.kpis = x["message"];
    //  console.log("ggg", this.kpis);
    });
  }
}
