import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructionManagementComponent } from './construction-management/construction-management.component';
import { MenuComponent } from './menu.component';
import { MyBookmarkComponent } from './my-bookmark/my-bookmark.component';
import { MyConstructionReviewComponent } from './my-construction-review/my-construction-review.component';
import { MyReviewComponent } from './my-construction-review/my-review/my-review.component';
import { MyPurchaseDesignComponent } from './my-purchase-design/my-purchase-design.component';
import { MyRequestDesignComponent } from './my-request-design/my-request-design.component';
import { SupportContactComponent } from './support-contact/support-contact.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'my-bookmark',
    component: MyBookmarkComponent,
  },
  {
    path: 'my-purchase-design',
    component: MyPurchaseDesignComponent,
  },
  {
    path: 'my-request-design',
    component: MyRequestDesignComponent,
  },
  {
    path: 'my-interior-design',
    loadChildren: () =>
      import('../my-interior-design/my-interior-design.module').then(
        (m) => m.MyInteriorDesignModule
      ),
  },

  {
    path: 'my-construction-review',
    component: MyConstructionReviewComponent,
    children: [
      {
        path: '',
        redirectTo: '/menu/my-construction-review/write-review',
        pathMatch: 'full',
      },
      {
        path: 'write-review',
        loadChildren: () =>
          import(
            './my-construction-review/write-review/write-review.module'
          ).then((m) => m.WriteReviewModule),
      },
      {
        path: 'review',
        component: MyReviewComponent,
      },
    ],
  },
  {
    path: 'support-contact',
    component: SupportContactComponent,
  },
  {
    path: 'construction-management',
    component: ConstructionManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
