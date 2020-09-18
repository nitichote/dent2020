import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import { FieldInfo } from "src/app/class/wdDperson";
// tslint:disable-next-line: no-unused-expression
declare var $: any;
@Component({
  selector: "app-dperson-widget",
  templateUrl: "./dperson-widget.component.html",
  styleUrls: ["./dperson-widget.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DpersonWidgetComponent implements OnInit {
  constructor() {}
  @Input()
  fieldInfo: FieldInfo;
  @Input()
  showControl: string;
  @Output()
  fdViewFire: EventEmitter<any> = new EventEmitter();
  @Output()
  gridColFire: EventEmitter<any> = new EventEmitter();
  @Output()
  checkTextFire: EventEmitter<any> = new EventEmitter();
  @Output()
  checkNumberFire: EventEmitter<any> = new EventEmitter();
  aView = "x";
  aGrid = 4;
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  setGrid(f) {
    // this.gridcol = this.aGrid;
   
    const x = {
      component: f,
      newGridcol: this.gridcol,
    };

    this.gridColFire.emit(x);
  }

  setCheckText(f) {
    // this.gridcol = this.aGrid;
    console.log("setCheckTextFire=",this.checkText);
    const x = {
      component: f,
      newCheckText: this.checkText,
    };

    this.checkTextFire.emit(x);
  }
  setCheckNumber(f) {
    // this.gridcol = this.aGrid;
   
    const x = {
      component: f,
      newCheckNumber: this.checkNumber,
    };

    this.checkNumberFire.emit(x);
  }
  setType(f, e) {
    const x = {
      component: f,
      newTypeName: e.target.value,
    };
    this.fdViewFire.emit(x);
    //console.log(e.target.selectedIndex);
    this.boxColor = this.color[e.target.selectedIndex];
  }
  boxColor = "#FFFFFF";
  fdview = "TextBox";
  color = [
    "#f9edeb",
    "#eecac4",
    "#f4f8ed",
    "#dfe9c8",
    "#eaf3fa",
    "#c0daf1",
    "#e8f4fc",
    "#bbddf6",
    "#f3ebf9",
    "#dbc4ee",
  ];
  inputTypeCombo = [
    "TextBox",
    "Number",
    "ComboBox",
    "PrimeCombo",
    "PrimeRadio",
    "Checkbox",
    "PrimeCheckbox",
    "TextArea",
    "Password",
    "Email",
  ];
  gridcol = 0;
  checkText=false;
  checkNumber=false;
  ngOnInit(): void {}
}
