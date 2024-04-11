import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionRoutingModule } from './construction-routing.module';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '@loa-shared/shared.module';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';

@NgModule({
  declarations: [ListingComponent, DetailComponent, PortfolioDetailComponent],
  imports: [CommonModule, ConstructionRoutingModule, SharedModule],
})
export class ConstructionModule {}
