import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './shared/components/auth/auth.component';
import { InformationComponent } from './shared/components/information/information.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { HomeDesignComponent } from './shared/components/design/design.component';
import { InteriorShareComponent } from './shared/components/interior-share/interior-share.component';
import { LifeStyleComponent } from './shared/components/life-style/life-style.component';
import { PartnerComponent } from './shared/components/partner/partner.component';
import { CategoryComponent } from './shared/components/category/category.component';
@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent,
    InformationComponent,
    BannerComponent,
    HomeDesignComponent,
    InteriorShareComponent,
    LifeStyleComponent,
    PartnerComponent,
    CategoryComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [InformationComponent],
})
export class HomeModule {}
