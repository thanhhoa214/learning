import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailLifeStyleComponent } from './detail-life-style/detail-life-style.component';
import { LifeStyleComponent } from './listing-life-style/life-style.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetailLifeStyleComponent,
  },
  {
    path: '',
    component: LifeStyleComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeStyleRoutingModule {}
