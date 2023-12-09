import { NgModule } from '@angular/core';
import { ScreenRoutingModule } from './screen-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [DetailComponent, ListingComponent, CreateComponent],
  imports: [SharedModule, ScreenRoutingModule],
})
export class ScreenModule {}
