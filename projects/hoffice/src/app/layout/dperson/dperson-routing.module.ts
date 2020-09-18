import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePersonComponent } from "./home-person.component";
import { ImgUploadComponent } from "./img-upload.component";

const routes: Routes = [
  {
    path: "",
    component: HomePersonComponent,
  },
  {
    path: "upload",
    component: ImgUploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DpersonRoutingModule {}
