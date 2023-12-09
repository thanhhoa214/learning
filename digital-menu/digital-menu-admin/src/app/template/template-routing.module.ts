import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'pick', component: ListingComponent, data: { type: 'pick' } },
  { path: 'create', component: DetailComponent },
  { path: ':id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
