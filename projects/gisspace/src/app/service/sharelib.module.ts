import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { CardModule } from "primeng/card";
import { FieldsetModule } from "primeng/fieldset";
import { MyDatePickerModule } from "mydatepicker";
import { MessageService } from "primeng/api";
import { PanelModule } from "primeng/panel";
import { TabViewModule } from "primeng/tabview";
import { AccordionModule } from "primeng/accordion";
import { CheckboxModule } from "primeng/checkbox";
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ChartModule} from 'primeng/chart';
@NgModule({
  declarations: [],
  imports: [TabsModule ,ChartModule,
    CheckboxModule,
    AccordionModule,
    TabViewModule,
    PanelModule,
    CardModule,
    MyDatePickerModule,
    FieldsetModule,
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  exports: [TabsModule ,ChartModule,
    CheckboxModule,
    AccordionModule,
    TabViewModule,
    PanelModule,
    MyDatePickerModule,
    FieldsetModule,
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class SharelibModule {}
