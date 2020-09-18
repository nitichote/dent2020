import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MessageService } from "primeng/api";
import { Dent2020Service } from "../service/dent2020_service";
import { FieldInfo } from "../class/wdDperson";
declare var $: any;
@Component({
  selector: "app-gen-model",
  templateUrl: "./gen-model.component.html",
  styleUrls: ["./gen-model.component.scss"],
})
export class GenModelComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,

    private ps: Dent2020Service,
    private messageService: MessageService
  ) {}

  fieldInfo: FieldInfo;
  fieldInfos: FieldInfo[] = [
    {
      name: "test",
      label: "lb",
      fdview: "TextBox",
      gridcol: 0,
      isCheckText:false,
      isCheckNumber:false,
    },
  ];
  footerPage=` <! –– วางด้านล่างของPage Html ––>
  <p-confirmDialog header="ลบข้อมูล" [style]="{width: '200px'}"></p-confirmDialog>

<p-toast position="center">ddddddd</p-toast>
  `;
  construct=`
  <! –– วางใน constructer ts ––>
  constructor(
    private confirmationService: ConfirmationService,
private ps: Dent2020Service,
    private messageService: MessageService
  ) {}
  `;
  htmCss=`
  <! –– sCss ไฟล์ ––>
  .mat-dialog-actions {
    display: flex;
    justify-content: flex-end;
    }`;
htmBegin=`
<div class=" container">
<div class="card">
    <div class="card-body">
    `;
  htmButton=`
  </div>
  <div class="card-footer">
       
  <div class="mat-dialog-actions"> 
      <button (click)="doSave()" mat-raised-button color="primary">Save</button>
   <button (click)="doCancel()" mat-raised-button color="accent">Cancel</button>
   </div>
</div>
</div>`;
usedRow=1;
errorText="";
  activetabno = 1;
  targetRowGroups = [];
  targetRows = [];
  prefixtbl = "p.";
  grid1show = false;
  grid2show = true;
  takeCodeRows = [];
  fdTest = "xyz";
  gmodel: any = [];
  dtb = "";
  tbl = "";
  interface = "uu";
  takecode = "";
  fds: any = [];
  fds2: any = [];
  fd = {};
  rows = [
    { name: "row1", col: 4 },
    { name: "row2", col: 4 },
    { name: "row3", col: 4 },
  ];

  students: any = [];
  ind = 0;
  show(x: number) {
    console.log(x);
  }
  onFdView(e, i) {
    
    const x = e.component;
    const t = e.newTypeName;

    const name = x.name;
    // console.log("target", i, this.targetRows[i + 1]);
    const result = this.targetRows[i + 1].find((f) => {
      //  console.log("f=", f.name, "name=", name);
      return f.name === name;
    });

    result.fdview = t;
  }
  onGridCol(e, i) {
    
    
    const x = e.component;
    const t = e.newGridcol;

    const name = x.name;
    // console.log("target", i, this.targetRows[i + 1]);
    const result = this.targetRows[i + 1].find((f) => {
      //  console.log("f=", f.name, "name=", name);
      return f.name === name;
    });

    result.gridcol = t;
  }
  onSetText(e, i) {
   
    const x = e.component;
    const t = e.newCheckText;
    
    const name = x.name;
    // console.log("target", i, this.targetRows[i + 1]);
    const result = this.targetRows[i + 1].find((f) => {
      //  console.log("f=", f.name, "name=", name);
      return f.name === name;
    });

    result.isCheckText = t;
  }
  onSetNumber(e, i) {
    const x = e.component;
    const t = e.newCheckNumber;

    const name = x.name;
    // console.log("target", i, this.targetRows[i + 1]);
    const result = this.targetRows[i + 1].find((f) => {
      //  console.log("f=", f.name, "name=", name);
      return f.name === name;
    });

    result.isCheckNumber = t;
  }
  doActiveTab() {
    this.activetabno = 3;
    //$("#xx").html("ffffff");
    // $("#myTab li:last-child a").tab("show");
  }
  doGencode(i) {
    this.takecode = "";

    if (i > 0) {
      this.genCode(i);
    } else {
      for (let k = 1; k < this.numrows; k++) {
        this.takecode = "";
        this.genCode(k);
        this.takeCodeRows[k - 1] = this.takecode;
      }
    }
  }
 afterErrText=`
if(! ispass){
this.messageService.add({ severity: 'error', summary: ms, detail: 'โปรดป้อนข้อมูลเพิ่ม' });
}else{
this.doSave();
}`; 
  doErrorText(x){
    let tblname = this.tbl[0].toUpperCase() + this.tbl.slice(1);
    if(x.isCheckText ){
this.errorText+=`
if (this.my${tblname}.${x.name}==null || this.my${tblname}.${x.name} == "") {
  ispass = false;
  ms=ms+"ข้อมูล ${x.label} ไม่ถูกต้อง,";
}
`;
    }
    if(x.isCheckNumber){
      this.errorText+=` 
      if(this.my${tblname}.${x.name}){
       let yr=Number(this.my${tblname}.${x.name});
       
       if(isNaN(yr) ){
         ispass = false;
         ms=ms+"ข้อมูล${x.label}ไม่ถูกต้อง,";
       }
      }
     
      `;
    } 
  }
  genCode(i) {
    for (let x of this.targetRows[i]) {

      
      if (x.name != "Tag") {
        this.doErrorText(x);
        let inputType = "text";
        switch (x.fdview) {
          case "TextBox": {
            inputType = "text";
            this.takecode += this.getTp_Text(x, inputType);
            break;
          }
          case "Number": {
            inputType = "number";
            this.takecode += this.getTp_Number(x, inputType);
            break;
          }
          case "Password": {
            inputType = "password";
            this.takecode += this.getTp_Password(x, inputType);
            break;
          }
          case "Email": {
            inputType = "email";
            this.takecode += this.getTp_Email(x, inputType);
            break;
          }
          case "ComboBox": {
            this.takecode += this.getTp_ComboBox(x);
            break;
          }
          case "PrimeCombo": {
            this.takecode += this.getTp_PrimeCombo(x);
            break;
          }
          case "PrimeCheckbox": {
            this.takecode += this.getTp_PrimeCheckBox(x);
            break;
          }
          case "Radio": {
            this.takecode += this.getTp_PrimeRadio(x);
            break;
          }
          case "TextArea": {
            this.takecode += this.getTp_TextArea(x);
            break;
          }
        }
      }
    }
    this.takecode = `
        <! –– แถวที่${i} ––>
    <div class="row">${this.takecode}</div>
    
    `;
    // this.takecode = this.takecode.split("<").join("<?");
    // console.log(this.takecode);
  }

  doGenModel() {
    this.ps.getModel(this.dtb, this.tbl).then((d) => {
      this.gmodel = d["message"];
      let ln = this.gmodel.length;
      this.numrows = Math.ceil(ln / 4);
      console.log("rows=", this.numrows);

      this.genRows();
      // console.log(this.gmodel);
      const c = this.tbl.charAt(0).toUpperCase() + this.tbl.slice(1);
      this.interface = `export interface ${c} {<br>`;
      let r = "";
      this.gmodel.forEach((x) => {
        const f = { name: x.COLUMN_NAME, label: x.COLUMN_COMMENT };
        this.fds.push(f);
        this.fieldInfo = {
          name: String(x.COLUMN_NAME),
          label: String(x.COLUMN_COMMENT),
          fdview: "TextBox",
          gridcol: 0,
          isCheckNumber:false,
          isCheckText:false
        };
        this.fieldInfos.push(this.fieldInfo);
        const str = String(x.COLUMN_TYPE);
        const res =
          str.includes("char") || str.includes("date") || str.includes("time");
        if (res) {
          r += String(x.COLUMN_NAME) + "?:string;<br>";
        } else {
          r += String(x.COLUMN_NAME) + "?:number;<br>";
        }
      });
      this.fieldInfos.shift();
      this.interface = this.interface + r + "}";
    });
  }
  genModel() {
    this.gmodel = this.ps.getModel(this.dtb, this.tbl);
  }

  dropMe(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  numrows = 5;
  genRows() {
    for (let i = 0; i < this.numrows; i++) {
      this.targetRows[i] = [
        {
          name: "Tag",
          label: "",
          fdview: "TextBox",
          gridcol: 0,
          checkText:false,
          checkNumber:false
        },
      ];
    }
    for (let i = 1; i < this.numrows; i++) {
      this.targetRowGroups.push(this.targetRows[i]);
    }
  }
  ngOnInit(): void {}
  getTp_Text(x, inputType) {
    const prefix = this.prefixtbl;
    this.ind++;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
    <div class="form-group">
  <label for="${x.name}">${x.label}</label>
  <input type="text" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}" class="form-control" placeholder="" aria-describedby="helpId">
  </div>
   </div>`;
  }
  getTp_Number(x, inputType) {
    const prefix = this.prefixtbl;
    this.ind++;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
    <div class="form-group">
  <label for="${x.name}">${x.label}</label>
  <input type="number" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}" class="form-control" placeholder="" aria-describedby="helpId">
  </div>
   </div>`;
  }
  getTp_Password(x, inputType) {
    const prefix = this.prefixtbl;
    this.ind++;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
    <div class="form-group">
  <label for="${x.name}">${x.label}</label>
  <input type="password" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}" class="form-control" placeholder="" aria-describedby="helpId">
  </div>
   </div>`;
  }
  getTp_Email(x, inputType) {
    const prefix = this.prefixtbl;
    this.ind++;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
    <div class="form-group">
  <label for="${x.name}">${x.label}</label>
  <input type="email" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}" class="form-control" placeholder="" aria-describedby="helpId">
  </div>
   </div>`;
  }
  getTp_ComboBox(x) {
    const prefix = this.prefixtbl;
    const optionArr = x.name + "Options";

    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
   <div class="form-group">
  <label for="${x.name}">${x.label}</label>
  <select class="form-control" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}">
    <option *ngFor="let c of ${optionArr}" [value]="c.name">{{c.label}}</option>
  </select>
</div>
</div>
`;
  }
  getTp_PrimeCombo(x) {
    const prefix = this.prefixtbl;
    const optionArr = x.name + "Options";
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
   <div class="form-group">
  <label for="${x.name}">${x.label}</label>
   <p-dropdown [options]="${optionArr}"  [(ngModel)]="${prefix}${x.name}"></p-dropdown>
</div>
</div>
`;
  }
  getTp_PrimeCheckBox(x) {
    const prefix = this.prefixtbl;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
    <div class="ui-g" style="width:250px;margin-bottom:10px">
    <div class="ui-g-12"><p-checkbox name="${x.name}" value="${x.gridcol}" label="New York" [(ngModel)]="${prefix}${x.name}" inputId="ny"></p-checkbox></div>
    <div class="ui-g-12"><p-checkbox name="${x.name}" value="${x.gridcol}" label="San Francisco" [(ngModel)]="${prefix}${x.name}" inputId="sf"></p-checkbox></div>
    <div class="ui-g-12"><p-checkbox name="${x.name}" value="${x.gridcol}" label="Los Angeles" [(ngModel)]="${prefix}${x.name}" inputId="la"></p-checkbox></div>
</div>
</div>`;
  }
  getTp_PrimeRadio(x) {
    const prefix = this.prefixtbl;
    return `  <div class="col-${x.gridcol}"><p-radioButton name="${x.name}" value="val1" label="Option 2" [(ngModel)]="${prefix}${x.name}"></p-radioButton>
</div>`;
  }
  getTp_Checkbox(x) {
    const prefix = this.prefixtbl;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
<div class="form-check">
  <input class="form-check-input" name="${x.name}"  type="checkbox"  id="${x.name}" [(ngModel)]="${prefix}${x.name}">>
  <label class="form-check-label" for="${x.name}">
    Default checkbox
  </label>
</div>
</div>`;
  }
  getTp_TextArea(x) {
    const prefix = this.prefixtbl;
    this.ind++;
    let grcol = String(x.gridcol);
    if (x.gridcol == 0) {
      grcol = "sm";
    }
    return `
     <div class="col-${grcol}">
 <div class="form-group">
  <label for="${x.name}">${x.label}</label>
    <textarea class="form-control" name="${x.name}" id="${x.name}" [(ngModel)]="${prefix}${x.name}" rows="3"></textarea>
  </div>
   </div>`;
  }
}
