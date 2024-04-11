import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WriteReviewComponent } from "./write-review.component";
import { SharedModule } from "@loa-shared/shared.module";
import { WriteReviewRoutingModule } from "./write-review-routing.module";
import { ListingComponent } from "./listing/listing.component";
import { UpdateComponent } from "./update/update.component";

@NgModule({
  declarations: [WriteReviewComponent, ListingComponent, UpdateComponent],
  imports: [CommonModule, SharedModule, WriteReviewRoutingModule],
})
export class WriteReviewModule {}
