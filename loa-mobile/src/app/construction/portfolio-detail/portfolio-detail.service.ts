import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPortfolioQuery, GetPortfolioQueryVariables } from './services';
import {
  ClearPortfolioDetail,
  LoadPortfolioDetail,
  PortfolioDetailState,
} from './store';

@Injectable({ providedIn: 'root' })
export class PortfolioDetailService {
  constructor(private _store: Store, private _actions: Actions) {}
  loadPortfolioDetail(queryVariables?: GetPortfolioQueryVariables) {
    this._store.dispatch(new LoadPortfolioDetail(queryVariables));
  }
  clear(id: string) {
    const isMatched =
      this._store.selectSnapshot(PortfolioDetailState.portfolioId) === id;
    if (!isMatched) this._store.dispatch(new ClearPortfolioDetail());
  }
  getPortfolioDetail$(): Observable<GetPortfolioQuery['portfolio']> {
    return this._store.select(PortfolioDetailState.portfolio);
  }
  getPortfolioDetail(): GetPortfolioQuery['portfolio'] {
    return this._store.selectSnapshot(PortfolioDetailState.portfolio);
  }
  onLoadPortfolioDetail() {
    return this._actions.pipe(ofActionDispatched(LoadPortfolioDetail));
  }
}
