import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyInteriorDesignPage } from "./my-interior-design/my-interior-design.page";
import { MyPurchasedDesignsPage } from "./my-purchased-designs/my-purchased-designs.page";
import { MySharedDesignsPage } from "./my-shared-designs/my-shared-designs.page";

const routes: Routes = [
  { path: "", component: MyInteriorDesignPage },
  { path: "purchased", component: MyPurchasedDesignsPage },
  { path: "shared", component: MySharedDesignsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyInteriorDesignRoutingModule {}
