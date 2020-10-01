import { Component, OnInit } from "@angular/core";
import { FieldInfo } from "src/app/class/wdDperson";
import * as d3 from "d3";
@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  constructor() {}
  active = 1;
  fieldInfo: FieldInfo;
  fieldInfos: FieldInfo[] = [
    {
      name: "test",
      label: "lb",
      fdview: "TextBox",
      gridcol: 3,
      isCheckNumber:false,
      isCheckText:false
    },
  ];

  onFdView(e, i) {
    console.log(e);
  }
  onGridCol(e) {
    console.log(e);
  }
  clicked(event) {
    d3.select(event.target)
      .append("circle")
      .attr("cx", event.x)
      .attr("cy", event.y)
      .attr("r", () => {
        return this.radius;
      })
      .attr("fill", "red");
  }
  radius: number = 10;
  getD3() {
    console.log("ffss");
    let myData2 = ["A", "B", "C", "D", "E"];
    let u = d3.select("#content").selectAll("div").data(myData2);
    u.enter().append("div");
    u.text(function (d) {
      return d;
    });
  }
  grid2show = 3;
  ngAfterViewInit() {
    d3.selectAll("p").style("color", "green");
    // tslint:disable-next-line:align
    console.log("ffff");

    console.log(d3.select("p").html());
  }
  myData = [10, 20, 30, 40, 50];
  ngOnInit(): void {
    console.log("rrr");

    // d3.select("p").style("color", "blue");
  }
}
