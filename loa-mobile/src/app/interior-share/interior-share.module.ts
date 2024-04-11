import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { CreateInteriorShareComponent } from './create-interior-share/create-interior-share.component';
import { DetailInteriorShareComponent } from './detail-interior-share/detail-interior-share.component';
import { InteriorSharedRoutingModule } from './interior-share-routing.module';
import { InteriorShareComponent } from './listing/interior-share.component';
import { MyPostInteriorComponent } from './my-post-interior/my-post-interior.component';
import { CommentInteriorListingComponent } from './shared/components/comment-interior-listing/comment-interior-listing.component';
import { CommentInteriorMyPostComponent } from './shared/components/comment-interior-my-post/comment-interior-my-post.component';
import { CommentComponent } from './shared/components/comment-interior/comment-interior.component';
import { NavInteriorComponent } from './shared/components/nav-interior/nav-interior.component';
import { UpdateInteriorShareComponent } from './update-interior-share/update-interior-share.component';

@NgModule({
  declarations: [
    DetailInteriorShareComponent,
    InteriorShareComponent,
    CreateInteriorShareComponent,
    UpdateInteriorShareComponent,
    NavInteriorComponent,
    MyPostInteriorComponent,
    CommentComponent,
    CommentInteriorListingComponent,
    CommentInteriorMyPostComponent
  ],
  imports: [CommonModule, IonicModule, InteriorSharedRoutingModule, SharedModule]
})
export class InteriorSharedModule {}
