import { Component, OnInit } from "@angular/core";
import { HofficeService } from "../../service/hoffice_service";

@Component({
  selector: "app-home-school",
  templateUrl: "./home-school.component.html",
  styleUrls: ["./home-school.component.scss"],
})
export class HomeSchoolComponent implements OnInit {
  ampcode = "2563";
  pincode="";
  constructor(private ps: HofficeService) {}
  schools: any = [];
  amps: any = [];
  hcode: any;
  schoolsAmp: any = [];
  offices: any = [];
  rpyear = "2563";
  showAmp(ampcode) {
    //  this.schoolsAmp = this.schools.filter((x) => {
    //    return x.code === ampcode;
    //   });
    this.ampcode = ampcode;
  }
  onTabOpen(e) {
    // console.log(this.amps[e.index].name);
    this.showAmp(this.amps[e.index].code);
  }
  doAmpChange() {}
  getFilterOffice(hcode) {
    //  console.log(hcode);
    this.hcode = hcode;
    this.schoolsAmp = this.schools.filter((x) => x.hcode == hcode);
    //  console.log(this.schoolsAmp);
  }
  ngOnInit(): void {
    this.ps.getOfficesSch().then((x) => {
      this.offices = x["message"];
      // console.log(this.offices);
    });
    this.ps.getSchools().then((x) => {
      this.schools = x["message"];
      this.schoolsAmp = this.schools.filter((x) => x.code == "3601");
    });
    this.ps.getAmp36().then((x) => {
      this.amps = x["message"];
    });
  }
}
