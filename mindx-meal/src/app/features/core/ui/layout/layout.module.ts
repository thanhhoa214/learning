import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';

const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzInputModule,
  NzButtonModule,
  NzToolTipModule,
  NzAvatarModule,
  NzDropDownModule,
  NzTabsModule
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, nzModules],
  exports: [LayoutComponent]
})
export class LayoutModule {}
