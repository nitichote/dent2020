import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HofficeService } from "../../service/hoffice_service";
@Component({
  selector: 'app-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.scss']
})
export class SchoolReportComponent implements OnInit {
  constructor(private ps: HofficeService) {}
  barChartOptions: ChartOptions = {
    scales : { yAxes: [{ ticks: { min: 0,  max : 100, } }] } ,
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  if (data > 0) {
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                 }
              });
          });
      }
  },
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  barChartData2: ChartDataSets[] = [
  
  ];
  schools:any=[];
reportAmp:any=[];
  ngOnInit(): void {
/*     let sql="select * from schoolresult";
 
    
    let data={
      sql:sql
    };
    this.ps.getSql(data).then((x) => {
      this.schools = x["message"];
     
      
    }); */
    this.ps.getReport('5').then((x) => {
      this.schools = x["message"] });
    this.ps.getReport('1').then((x) => {
      this.reportAmp = x["message"] 
      let xx=Array.from(this.reportAmp,y=>y['name']);
      this.barChartLabels = xx;
let candy =Array.from(this.reportAmp,y=>y['pcisnocandy'].toFixed(1));
let coke =Array.from(this.reportAmp,y=>y['pcisnocoke'].toFixed(1));
let sweet =Array.from(this.reportAmp,y=>y['pcisnosweet'].toFixed(1));
this.barChartData =[
  {data:coke,label:"ปลอดน้ำอัดลม"},  

]
this.barChartData2 =[
  {data:coke,label:"ปลอดน้ำอัดลม"},  
{data:candy,label:"ปลอดขนมกรุบกรอบ"},
{data:sweet,label:"ปลอดน้ำหวาน"},
]
    });
  }
}
