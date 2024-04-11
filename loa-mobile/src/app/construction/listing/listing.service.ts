import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Actions,
  ofActionCompleted,
  ofActionDispatched,
  Store,
} from '@ngxs/store';
import {
  LoadConstructionListing,
  ConstructionListingState,
  ConstructionListingStateModel,
  LoadConstructionListingNext,
} from './store';
import { GetAllConstructionsQueryVariables } from './services';

@Injectable({ providedIn: 'root' })
export class ConstructionListingService {
  constructions$: Observable<ConstructionListingStateModel['constructions']>;

  constructor(private _store: Store, private _actions: Actions) {
    this.constructions$ = this._store.select(
      ConstructionListingState.constructions
    );
  }
  get constructions(): ConstructionListingStateModel['constructions'] {
    return this._store.selectSnapshot(ConstructionListingState.constructions);
  }

  loadConstructions(queryVariables?: GetAllConstructionsQueryVariables) {
    this._store.dispatch(new LoadConstructionListing(queryVariables));
  }
  loadConstructionsMore(queryVariables?: GetAllConstructionsQueryVariables) {
    this._store.dispatch(new LoadConstructionListingNext(queryVariables));
  }
  onLoadConstructionListing() {
    return this._actions.pipe(ofActionDispatched(LoadConstructionListing));
  }
  onLoadConstructionsCompleted() {
    return this._actions.pipe(ofActionCompleted(LoadConstructionListing));
  }
  onLoadConstructionsMoreCompleted() {
    return this._actions.pipe(ofActionCompleted(LoadConstructionListingNext));
  }
}
