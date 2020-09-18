import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-school-login',
  templateUrl: './school-login.component.html',
  styleUrls: ['./school-login.component.scss']
})
export class SchoolLoginComponent implements OnInit {

  constructor() { }
pincode="";
isLog=false;
schpin = localStorage.getItem('schoolPincode'); 
amp=["3601","3602","3603","3604","3605","3606","3607","3608","3609",
"3610","3611","3612","3613","3615","3616","3614"
];
doLogin(){
  if(this.amp.includes(this.pincode)){
    
     localStorage.setItem("schoolPincode",this.pincode);
     this.isLog=true;
  }
 
 
} 
doLogOut(){
  localStorage.removeItem('schoolPincode');
  this.isLog=false;
  }
  ngOnInit(): void {
    let x="";
    if(localStorage.getItem('schoolPincode')!=null){
this.isLog=true;
this.pincode = localStorage.getItem('schoolPincode');
    } 
    
  }

}
