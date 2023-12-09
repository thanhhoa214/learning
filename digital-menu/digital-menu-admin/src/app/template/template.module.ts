import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TemplateRoutingModule } from './template-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { ImageModalComponent } from './shared/components/image-modal/image-modal.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    ListingComponent,
    DetailComponent,
    ImageModalComponent,
    UpdateComponent,
  ],
  imports: [SharedModule, TemplateRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateModule {}
