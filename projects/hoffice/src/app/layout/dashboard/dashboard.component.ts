import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  images: any;

  constructor(private _http: HttpClient){}
  selectImage(e){
if(e.target.files.length > 0){
  const file=e.target.files[0];
  this.images=file;
}
  }
  onSubmit(){
const formData=new FormData();
console.log(this.images);
formData.append('agentid','333');
formData.append("file",this.images);
console.log(formData);

this._http.post<any>('http://127.0.0.1:3000/hoffice/profile',formData).subscribe(
  data=>{
    console.log(data);
  }
 
    );

  }
  ngOnInit(): void {
  }

}
