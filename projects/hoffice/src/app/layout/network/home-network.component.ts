import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-home-network',
  templateUrl: './home-network.component.html',
  styleUrls: ['./home-network.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeNetworkComponent implements OnInit {

  constructor() { }
  txt="that OK";

doStyle(){
//Characters
var nodes_data =  [
  {"name": "Lillian", "sex": "F"},
  {"name": "Gordon", "sex": "M"},
  {"name": "Sylvester", "sex": "M"},
  {"name": "Mary", "sex": "F"},
  {"name": "Helen", "sex": "F"},
  {"name": "Jamie", "sex": "M"},
  {"name": "Jessie", "sex": "F"},
  {"name": "Ashton", "sex": "M"},
  {"name": "Duncan", "sex": "M"},
  {"name": "Evette", "sex": "F"},
  {"name": "Mauer", "sex": "M"},
  {"name": "Fray", "sex": "F"},
  {"name": "Duke", "sex": "M"},
  {"name": "Baron", "sex": "M"},
  {"name": "Infante", "sex": "M"},
  {"name": "Percy", "sex": "M"},
  {"name": "Cynthia", "sex": "F"}
]

//Relationships
//type: A for Ally, E for Enemy
var links_data = [
  {"source": "Sylvester", "target": "Gordon", "type":"A" },
  {"source": "Sylvester", "target": "Lillian", "type":"A" },
  {"source": "Sylvester", "target": "Mary", "type":"A"},
  {"source": "Sylvester", "target": "Jamie", "type":"A"},
  {"source": "Sylvester", "target": "Jessie", "type":"A"},
  {"source": "Sylvester", "target": "Helen", "type":"A"},
  {"source": "Helen", "target": "Gordon", "type":"A"},
  {"source": "Mary", "target": "Lillian", "type":"A"},
  {"source": "Ashton", "target": "Mary", "type":"A"},
  {"source": "Duncan", "target": "Jamie", "type":"A"},
  {"source": "Gordon", "target": "Jessie", "type":"A"},
  {"source": "Sylvester", "target": "Fray", "type":"E"},
  {"source": "Fray", "target": "Mauer", "type":"A"},
  {"source": "Fray", "target": "Cynthia", "type":"A"},
  {"source": "Fray", "target": "Percy", "type":"A"},
  {"source": "Percy", "target": "Cynthia", "type":"A"},
  {"source": "Infante", "target": "Duke", "type":"A"},
  {"source": "Duke", "target": "Gordon", "type":"A"},
  {"source": "Duke", "target": "Sylvester", "type":"A"},
  {"source": "Baron", "target": "Duke", "type":"A"},
  {"source": "Baron", "target": "Sylvester", "type":"E"},
  {"source": "Evette", "target": "Sylvester", "type":"E"},
  {"source": "Cynthia", "target": "Sylvester", "type":"E"},
  {"source": "Cynthia", "target": "Jamie", "type":"E"},
  {"source": "Mauer", "target": "Jessie", "type":"E"}
];

}
  ngOnInit(): void {
    this.doStyle();
  }

}
