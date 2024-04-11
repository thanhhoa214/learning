import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { DetailLifeStyleComponent } from './detail-life-style/detail-life-style.component';
import { LifeStyleRoutingModule } from './life-style-routing.module';
import { LifeStyleComponent } from './listing-life-style/life-style.component';
import { CommentComponent } from './shared/components/comment/comment.component';

@NgModule({
  declarations: [
    DetailLifeStyleComponent,
    LifeStyleComponent,
    CommentComponent,
  ],
  imports: [CommonModule, IonicModule, LifeStyleRoutingModule, SharedModule],
})
export class LifeStyleModule {}
