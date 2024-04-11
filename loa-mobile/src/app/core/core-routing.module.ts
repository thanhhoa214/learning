import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '@loa-mobile/auth/shared/guards/is-logged-in.guard';
import { ResetFilterGuard } from '@loa-mobile/design/shared/guards/filter.guard';
import { VnpayPage } from '@loa-mobile/vnpay/vnpay.page';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
    canActivate: [ResetFilterGuard],
  },
  {
    path: 'vnpay',
    component: VnpayPage,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [IsLoggedInGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
        data: { preload: true, loadAfterSeconds: 1 },
        canActivate: [ResetFilterGuard],
      },
      {
        path: 'life-style',
        loadChildren: () =>
          import('../life-style/life-style.module').then(
            (m) => m.LifeStyleModule
          ),
      },
      {
        path: 'interior-share',
        loadChildren: () =>
          import('../interior-share/interior-share.module').then(
            (m) => m.InteriorSharedModule
          ),
      },
      {
        path: 'design',
        loadChildren: () =>
          import('../design/design.module').then((m) => m.DesignModule),
        data: { preload: true, loadAfterSeconds: 3 },
      },
      {
        path: 'content-page',
        loadChildren: () =>
          import('../content-page/content-page.module').then(
            (m) => m.ContentPageModule
          ),
        canActivate: [ResetFilterGuard],
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('../menu/menu.module').then((m) => m.MenuModule),
        canActivate: [ResetFilterGuard],
      },
      {
        path: 'construction',
        loadChildren: () =>
          import('../construction/construction.module').then(
            (m) => m.ConstructionModule
          ),
        canActivate: [ResetFilterGuard],
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
