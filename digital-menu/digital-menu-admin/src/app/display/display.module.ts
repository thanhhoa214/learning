import { NgModule } from '@angular/core';
import { DisplayRoutingModule } from './display-routing.module';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListingComponent, CreateComponent],
  imports: [SharedModule, DisplayRoutingModule],
})
export class DisplayModule {}
