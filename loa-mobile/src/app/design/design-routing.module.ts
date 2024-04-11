import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartPage } from "./cart/cart.page";
import { DetailPage } from "./detail/detail.page";
import { FilterComponent } from "./filter/filter.component";
import { ListingPage } from "./listing/listing.page";

const routes: Routes = [
  {
    path: "listing",
    component: ListingPage,
  },
  {
    path: "filter",
    component: FilterComponent,
  },
  {
    path: "filters",
    redirectTo: "filter",
    pathMatch: "full",
  },
  {
    path: "cart",
    component: CartPage,
  },
  {
    path: ":id",
    component: DetailPage,
  },
  { path: "", pathMatch: "full", redirectTo: "listing" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignRoutingModule {}
