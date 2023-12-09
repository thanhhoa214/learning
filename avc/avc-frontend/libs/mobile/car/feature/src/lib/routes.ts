import { Routes } from '@angular/router';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./listing.module').then((m) => m.ListingModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./detail.module').then((m) => m.DetailModule),
    data: { fullPage: true }
  },
  {
    path: 'issue/:id',
    loadChildren: () => import('@mobile/issue/feature').then((m) => m.DetailModule),
    data: { fullPage: true }
  }
];
