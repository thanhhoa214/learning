import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  ClearPortfolioDetail,
  LoadPortfolioDetail,
} from './portfolio-detail.actions';
import { tap } from 'rxjs/operators';
import { GetPortfolioGQL, GetPortfolioQuery } from '../services';
import { isEquals } from '@loa-shared/utils';

export class PortfolioDetailStateModel {
  portfolio?: GetPortfolioQuery['portfolio'];
}

const defaults = {};

@State<PortfolioDetailStateModel>({
  name: 'portfolioDetail',
  defaults,
})
@Injectable()
export class PortfolioDetailState {
  @Selector()
  static portfolio({ portfolio }: PortfolioDetailStateModel) {
    return portfolio;
  }
  @Selector()
  static portfolioId({ portfolio }: PortfolioDetailStateModel) {
    return portfolio.id;
  }

  constructor(private _portfolioQuery: GetPortfolioGQL) {}

  @Action(LoadPortfolioDetail)
  loadPortfolioDetail(
    { getState, patchState }: StateContext<PortfolioDetailStateModel>,
    { payload }: LoadPortfolioDetail
  ) {
    const state = getState();
    return this._portfolioQuery.fetch(payload).pipe(
      tap(({ data }) => {
        const { portfolio } = data;

        if (isEquals(portfolio, state.portfolio)) return;
        patchState({ portfolio });
      })
    );
  }

  @Action(ClearPortfolioDetail)
  clear({ patchState }: StateContext<PortfolioDetailStateModel>) {
    patchState({ portfolio: undefined });
  }
}
