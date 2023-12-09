import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListingComponent, CreateComponent],
  imports: [SharedModule, StoreRoutingModule],
})
export class StoreModule {}
