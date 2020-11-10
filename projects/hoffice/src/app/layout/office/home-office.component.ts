import { Component, OnInit } from "@angular/core";
import { HofficeService } from "../../service/hoffice_service";
@Component({
  selector: "app-home-office",
  templateUrl: "./home-office.component.html",
  styleUrls: ["./home-office.component.scss"],
})
export class HomeOfficeComponent implements OnInit {
  constructor(private ps: HofficeService) {}
  offices = [];
  amps = [];
  hoss = [];
  officePersons=[];
  getHosInAmps(ampcode: string) {
    this.hoss = this.offices.filter((x) => x.ampcode === ampcode);
    console.log("hoss=", this.hoss);
  }
  getOfficeDetail(off_id) {
    console.log("off=", off_id);
this.officePersons=this.persons.filter(x=>{
  return x.off_id === off_id;
});
  }
  persons=[];
  ngOnInit(): void {
    this.ps.getReport("3").then(x=>{
this.persons=x["message"];
console.log("person=",this.persons);
    });
    this.ps.getReport("2").then((x) => {
      this.offices = x["message"];
      console.log(this.offices);

      let a = this.offices.map((x) => {
        return {
          ampcode: x.ampcode,
          ampname: x.ampname,
        };
      });

      this.amps = Object.values(
        a.reduce(function (r, e) {
          let ampcode = e.ampcode,
            ampname = e.ampname;
          return (r[`${ampcode}|${ampname}`] = { ampcode, ampname }), r;
        }, {})
      );
    });
  }
}
