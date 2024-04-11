import { NgModule } from "@angular/core";

import { MyInteriorDesignRoutingModule } from "./my-interior-design-routing.module";
import { MyInteriorDesignPage } from "./my-interior-design/my-interior-design.page";
import { SharedModule } from "@loa-shared/shared.module";
import { MyPurchasedDesignsPage } from "./my-purchased-designs/my-purchased-designs.page";
import { MySharedDesignsPage } from "./my-shared-designs/my-shared-designs.page";
import { CommonModule } from "@angular/common";
import { OpenByFilesAppComponent } from "./my-purchased-designs/open-by-files-app/open-by-files-app.component";

@NgModule({
  declarations: [
    MyInteriorDesignPage,
    MyPurchasedDesignsPage,
    MySharedDesignsPage,
    OpenByFilesAppComponent,
    OpenByFilesAppComponent,
  ],
  imports: [CommonModule, SharedModule, MyInteriorDesignRoutingModule],
})
export class MyInteriorDesignModule {}
