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

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [],
  imports: [
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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class SharelibModule {}
