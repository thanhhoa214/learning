import { GetPortfolioQueryVariables } from '../services';

const enum Actions {
  LOAD_PORTFOLIO_DETAIL = '[PortfolioDetail] Load Portfolio Detail',
  CLEAR = '[PortfolioDetail] Clear Portfolio Detail',
}

export class LoadPortfolioDetail {
  static readonly type = Actions.LOAD_PORTFOLIO_DETAIL;
  constructor(public payload: GetPortfolioQueryVariables) {}
}

export class ClearPortfolioDetail {
  static readonly type = Actions.CLEAR;
}
