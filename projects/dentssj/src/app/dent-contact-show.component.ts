
import { Component, OnInit } from '@angular/core';
import { DentssjService } from './service/dentssj_service';

@Component({
  selector: 'app-dent-contact-show',
  templateUrl: './dent-contact-show.component.html',
  styleUrls: ['./dent-contact-show.component.scss']
})
export class DentContactShowComponent implements OnInit {

  constructor(private ps: DentssjService) {}

  ngOnInit(): void {
  }

}
