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

  ngOnInit(): void {
   
  }

}
