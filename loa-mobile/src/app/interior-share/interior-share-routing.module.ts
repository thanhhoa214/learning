import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInteriorShareComponent } from './create-interior-share/create-interior-share.component';
import { DetailInteriorShareComponent } from './detail-interior-share/detail-interior-share.component';
import { InteriorShareComponent } from './listing/interior-share.component';
import { MyPostInteriorComponent } from './my-post-interior/my-post-interior.component';
import { UpdateInteriorShareComponent } from './update-interior-share/update-interior-share.component';
const routes: Routes = [
  {
    path: 'create',
    component: CreateInteriorShareComponent,
  },
  {
    path: 'my-post',
    component: MyPostInteriorComponent
  },
  {
    path: ':id/update',
    component: UpdateInteriorShareComponent,
  },
  {
    path: ':id',
    component: DetailInteriorShareComponent,
  },
  {
    path: '',
    component: InteriorShareComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteriorSharedRoutingModule {}
