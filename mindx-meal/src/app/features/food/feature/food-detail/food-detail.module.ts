import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDetailComponent } from './food-detail.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RouterModule } from '@angular/router';

const nzModules = [NzTagModule];

@NgModule({
  declarations: [FoodDetailComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: FoodDetailComponent }]), nzModules]
})
export class FoodDetailModule {}
