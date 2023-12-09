import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from './auth/shared/guards/is-logged-in.guard';
import { IsNotLoggedInGuard } from './auth/shared/guards/is-not-logged-in.guard';
import { NotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [IsNotLoggedInGuard],
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplateModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: 'screens',
    loadChildren: () =>
      import('./screen/screen.module').then((m) => m.ScreenModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: 'displays',
    loadChildren: () =>
      import('./display/display.module').then((m) => m.DisplayModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    canActivateChild: [IsLoggedInGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
    canActivateChild: [IsLoggedInGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'templates', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
