import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { ConstructionDetailState } from '../detail/store';
import { ConstructionListingState } from '../listing/store';
import { PortfolioDetailState } from '../portfolio-detail/store';

@State<Record<string, never>>({
  name: 'construction',
  defaults: {},
  children: [
    ConstructionListingState,
    ConstructionDetailState,
    PortfolioDetailState,
  ],
})
@Injectable()
export class ConstructionState {}
