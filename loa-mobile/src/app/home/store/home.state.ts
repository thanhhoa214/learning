import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  LoadHomeData,
  LoadHomeDataFailed,
  LoadHomeDataSuccessfully,
  ResetBanner
} from './home.actions';
import { GetHomeDataGQL, GetHomeDataQuery } from '../shared/services';

export interface HomeStateModel {
  homeData?: GetHomeDataQuery;
}
export const initialState: HomeStateModel = {};

@State<HomeStateModel>({
  name: 'home',
  defaults: initialState
})
@Injectable()
export class HomeState {
  @Selector()
  static getHomeData({ homeData }: HomeStateModel): GetHomeDataQuery {
    return homeData;
  }

  constructor(private _getHomeData: GetHomeDataGQL) {}

  @Action(LoadHomeData, { cancelUncompleted: true })
  loadHomeData({ patchState, dispatch }: StateContext<HomeStateModel>) {
    return this._getHomeData.watch().valueChanges.pipe(
      tap(({ data }) => {
        if (!data) return dispatch(new LoadHomeDataFailed());
        patchState({ homeData: data });
        return dispatch(new LoadHomeDataSuccessfully());
      })
    );
  }

  @Action(ResetBanner)
  resetBanner({ patchState, getState }: StateContext<HomeStateModel>) {
    patchState({
      homeData: {
        ...getState(),
        banners: null
      }
    });
  }
}
