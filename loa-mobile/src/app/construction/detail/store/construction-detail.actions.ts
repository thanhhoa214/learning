import { GetConstructionQueryVariables } from '../services';

const enum Actions {
  LOAD_DESIGN_DETAIL = '[ConstructionDetail] Load Construction Detail',
  CLEAR = '[ConstructionDetail] Clear Construction Detail',
}

export class LoadConstructionDetail {
  static readonly type = Actions.LOAD_DESIGN_DETAIL;
  constructor(public payload: GetConstructionQueryVariables) {}
}

export class ClearConstructionDetail {
  static readonly type = Actions.CLEAR;
}
