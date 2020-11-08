import { Component, OnInit } from '@angular/core';
import { HofficeService } from "../../service/hoffice_service";
@Component({
  selector: 'app-home-office',
  templateUrl: './home-office.component.html',
  styleUrls: ['./home-office.component.scss']
})
export class HomeOfficeComponent implements OnInit {

  constructor(private ps: HofficeService) {}
offices=[];
amps=[];
  ngOnInit(): void {
    this.ps.getReport('2').then((x) => {
      this.offices = x["message"];
      console.log(this.offices);
      
     let a =this.offices.map(x=>{
        return {
        ampcode:x.ampcode,ampname:x.ampname}
      }
        );
        this.amps = [...new Set(a)]   ;    
console.log("amps=",this.amps);

    });
  }

}
