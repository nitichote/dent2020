
import { DentalClinicService } from './../service/dentalservice_service';
import { Component, OnInit } from '@angular/core';
import {Patient} from "./../service/dentalserviceModel"
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-regis-add-new',
  templateUrl: './regis-add-new.component.html',
  styleUrls: ['./regis-add-new.component.scss']
})
export class RegisAddNewComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private ps: DentalClinicService, private messageService: MessageService) { }
 
p:Patient={};
ageinput=0;
prenameOptions=[];
gerderOptions=[];
myPt:Patient={};
dgShowPt=false;


doCancel() {
  this.myPt = {};
  this.dgShowPt = false;
}
doCheckPtForm() {
  if(this.ageinput>0){
    let ny = new Date().getFullYear();
    this.myPt.yearbirth = ny+543-this.ageinput;
  }
  let ispass = true;
  let ms ="";
  if (this.myPt.fname==null || this.myPt.fname == "") {
    ispass = false;
    ms="ข้อมูลชื่อ ไม่ถูกต้อง,";
  }
  if (this.myPt.lname==null || this.myPt.lname == "") {
    ispass = false;
    ms="ข้อมูลนามสกุล ไม่ถูกต้อง,";
  }
  if ( this.myPt.prename==null || this.myPt.prename == "") {
    ispass = false;
    ms=ms+"ข้อมูลประเภท ไม่ถูกต้อง,";
  }
  
   
   if(this.myPt.yearbirth <2500 || this.myPt.yearbirth >2560){
     ispass = false;
     ms=ms+"ข้อมูลปีเกิด พศ.ไม่ถูกต้อง,";
   }
  
  if(! ispass){
  this.messageService.add({ severity: 'error', summary: ms, detail: 'โปรดป้อนข้อมูลเพิ่ม' });
  }else{
this.doSave();
  }

}
action="";
doSave() {
  this.dgShowPt = false;
  if (this.action == "add") {

    this.ps.insertData("patient", this.myPt).then(v=>{

      
    });

  } else {
    let where = { id: this.myPt.hn};

    this.ps.updateData("patient", where, this.myPt).then((x) => {

    });
  }
}
doAddNew() {
  this.action = "add";
  this.myPt = {};
  
  this.dgShowPt = true;
}

  ngOnInit(): void {
  }

}

