import { Component, OnInit } from '@angular/core';
import { KpiShareComponent } from './kpi-share.component';

@Component({
  selector: 'app-kpi-home',
  templateUrl: './kpi-home.component.html',
  styleUrls: ['./kpi-home.component.scss']
})
export class KpiHomeComponent extends KpiShareComponent  implements OnInit {



  ngOnInit(): void {
  }

}
