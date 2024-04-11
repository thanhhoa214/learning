import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MyBookmarkComponent } from './my-bookmark/my-bookmark.component';
import { MyQuestionAnswerComponent } from './my-question-answer/my-question-answer.component';
import { MyPurchaseDesignComponent } from './my-purchase-design/my-purchase-design.component';
import { SupportContactComponent } from './support-contact/support-contact.component';
import { MyRequestDesignComponent } from './my-request-design/my-request-design.component';
import { HomeModule } from '@loa-mobile/home/home.module';
import { MyConstructionReviewComponent } from './my-construction-review/my-construction-review.component';
import { MyReviewComponent } from './my-construction-review/my-review/my-review.component';
import { ConstructionManagementComponent } from './construction-management/construction-management.component';
@NgModule({
  declarations: [
    MenuComponent,
    MyBookmarkComponent,
    MyQuestionAnswerComponent,
    MyPurchaseDesignComponent,
    SupportContactComponent,
    MyRequestDesignComponent,
    MyConstructionReviewComponent,
    MyReviewComponent,
    ConstructionManagementComponent,
  ],
  imports: [CommonModule, MenuRoutingModule, SharedModule, HomeModule],
})
export class MenuModule {}
