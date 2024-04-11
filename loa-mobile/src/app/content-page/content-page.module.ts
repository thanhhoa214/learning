import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPageRoutingModule } from './content-page-routing.module';
import { ContentPageComponent } from './content-page.component';
import { SharedModule } from '@loa-mobile/shared/shared.module';

@NgModule({
  declarations: [ContentPageComponent],
  imports: [CommonModule, ContentPageRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentPageModule {}
