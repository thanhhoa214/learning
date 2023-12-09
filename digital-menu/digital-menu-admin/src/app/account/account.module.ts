import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListingComponent, DetailComponent, CreateComponent],
  imports: [AccountRoutingModule, SharedModule],
})
export class AccountModule {}
