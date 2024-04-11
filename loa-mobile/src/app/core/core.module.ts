import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { VnpayPage } from '@loa-mobile/vnpay/vnpay.page';

@NgModule({
  declarations: [LayoutComponent, VnpayPage],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
})
export class CoreModule {}
