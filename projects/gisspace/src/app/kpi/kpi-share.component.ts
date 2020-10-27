import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GisService } from '../service/gis_service';

@Component({
  selector: 'app-kpi-share',
  templateUrl: './kpi-share.component.html',
  styleUrls: ['./kpi-share.component.scss']
})
export class KpiShareComponent implements OnInit {

  constructor(
    public confirmationService: ConfirmationService,
    public ps: GisService,
    public messageService: MessageService
  )  { }

  ngOnInit(): void {
  }

}
