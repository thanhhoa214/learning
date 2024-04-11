import { Injectable } from '@angular/core';
import { Actions, ofActionCompleted, ofActionDispatched, Select, Store } from '@ngxs/store';
import { HomeState, HomeStateModel } from './store';
import {
  LoadHomeData,
  LoadHomeDataFailed,
  LoadHomeDataSuccessfully,
  ResetBanner
} from './store/home.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  @Select(HomeState.getHomeData) homeData$: Observable<HomeStateModel['homeData']>;

  constructor(private _store: Store, private _actions: Actions) {}

  get snapshot() {
    return this._store.selectSnapshot<HomeStateModel>(HomeState);
  }
  loadHomeData() {
    this._store.dispatch(new LoadHomeData());
  }
  resetBanner() {
    this._store.dispatch(new ResetBanner());
  }
  onLoadHomeData() {
    return this._actions.pipe(ofActionDispatched(LoadHomeData));
  }
  onLoadHomeDataFailed() {
    return this._actions.pipe(ofActionCompleted(LoadHomeDataFailed));
  }
  onLoadHomeDataSuccess() {
    return this._actions.pipe(ofActionCompleted(LoadHomeDataSuccessfully));
  }
}
