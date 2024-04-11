import { NgModule } from "@angular/core";
import { WriteReviewComponent } from "./write-review.component";
import { RouterModule, Routes } from "@angular/router";
import { ListingComponent } from "./listing/listing.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  {
    path: "",
    component: ListingComponent,
  },
  {
    path: "create/:id",
    component: WriteReviewComponent,
  },
  {
    path: "update/:id",
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteReviewRoutingModule {}
