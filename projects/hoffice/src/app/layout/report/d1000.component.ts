import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d1000',
  templateUrl: './d1000.component.html',
  styleUrls: ['./d1000.component.scss']
})
export class D1000Component implements OnInit {

  constructor() { }
  showpage=1;
  getPage(p){
this.showpage=p;
  }

  ngOnInit(): void {
  }

}
