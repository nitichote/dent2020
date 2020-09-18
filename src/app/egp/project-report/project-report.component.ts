import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductService } from "../../sharelib/psc_server";
import * as m from "../../egp/models";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { of } from "rxjs";

@Component({
  selector: "app-project-report",
  templateUrl: "./project-report.component.html",
  styleUrls: ["./project-report.component.scss"],
})
export class ProjectReportComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private ps: ProductService
  ) {}

  ngOnInit(): void {}
}
