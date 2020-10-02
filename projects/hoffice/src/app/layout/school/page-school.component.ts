import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HofficeService } from "../../service/hoffice_service";
@Component({
  selector: 'app-page-school',
  templateUrl: './page-school.component.html',
  styleUrls: ['./page-school.component.scss']
})
export class PageSchoolComponent implements OnInit {

  constructor(private ps: HofficeService) {}
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  schools:any=[];

  ngOnInit(): void {
    let sql="select * from schoolresult";
    console.log("onot");
    
    let data={
      sql:sql
    };
    this.ps.getSql(data).then((x) => {
      this.schools = x["message"];
      console.log(this.schools);
      console.log("ffff");
      
    });
  }

}
