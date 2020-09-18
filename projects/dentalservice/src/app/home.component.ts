import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DentalClinicService } from "./service/dentalservice_service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private ps: DentalClinicService, private messageService: MessageService) { }
 
title = 'Mydentalservice';
pts=[];
txtSearch="xx";
getPtSearch(){
  let txt = this.txtSearch;
  console.log("txt=",txt);
  
  this.ps.getPtSearch(txt).then((x) => {
    this.pts = x["message"];
  });
}
  ngOnInit(): void {
    this.getPtSearch();
  }

}
