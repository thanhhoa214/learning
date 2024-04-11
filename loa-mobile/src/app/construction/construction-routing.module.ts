import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';

const routes: Routes = [
  {
    path: ':constructionId/portfolio/:id',
    component: PortfolioDetailComponent,
  },
  {
    path: ':id',
    component: DetailComponent,
  },
  { path: '', pathMatch: 'full', component: ListingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstructionRoutingModule {}
