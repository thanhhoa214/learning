import { Route } from '@angular/router';
import { LayoutComponent } from '../features/core/ui/layout/layout.component';
import { foodRoutes } from '../features/food/util/food.routes';

export const rootRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'food',
        children: foodRoutes
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'food'
      }
    ]
  }
];
