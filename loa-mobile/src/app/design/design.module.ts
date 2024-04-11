import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { DesignRoutingModule } from "./design-routing.module";
import { DetailPage } from "./detail/detail.page";
import { FilterComponent } from "./filter/filter.component";
import { ListingPage } from "./listing/listing.page";
import { CommentItemComponent } from "./shared/components/atoms/comment-item/comment-item.component";
import { FilterConstructionPriceComponent } from "./shared/components/atoms/construction-filter-price/filter-construction-price.component";
import { DesignPartnerFormComponent } from "./shared/components/atoms/design-partner-form/design-partner-form.component";
import { FilterAreaComponent } from "./shared/components/atoms/filter-area/filter-area.component";
import { FilterDesignTypeComponent } from "./shared/components/atoms/filter-design-type/filter-design-type.component";
import { FilterHouseTypeComponent } from "./shared/components/atoms/filter-house-type/filter-house-type.component";
import { FilterPriceComponent } from "./shared/components/atoms/filter-price/filter-price.component";
import { FilterStyleComponent } from "./shared/components/atoms/filter-style/filter-style.component";
import { CommentComponent } from "./shared/components/comment/comment.component";
import { InforBottomSheetComponent } from "./shared/components/infor-bottom-sheet/infor-bottom-sheet.component";
import { RequestDesignSuccessComponent } from "./shared/components/request-design-success/request-design-success.component";
import { RequestDesignComponent } from "./shared/components/request-design/request-design.component";
import { AddToCartSuccessComponent } from "./shared/components/add-to-cart-success/add-to-cart-success.component";
import { CartPage } from "./cart/cart.page";

@NgModule({
  declarations: [
    ListingPage,
    InforBottomSheetComponent,
    FilterPriceComponent,
    FilterConstructionPriceComponent,
    FilterDesignTypeComponent,
    FilterHouseTypeComponent,
    FilterStyleComponent,
    FilterAreaComponent,
    DetailPage,
    FilterComponent,
    CommentComponent,
    CommentItemComponent,
    RequestDesignComponent,
    RequestDesignSuccessComponent,
    DesignPartnerFormComponent,
    AddToCartSuccessComponent,
    CartPage,
  ],
  imports: [CommonModule, IonicModule, DesignRoutingModule, SharedModule],
})
export class DesignModule {}
