import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';

const nzModules = [NzStatisticModule, NzCardModule];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: WelcomeComponent }]), nzModules],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule {}
