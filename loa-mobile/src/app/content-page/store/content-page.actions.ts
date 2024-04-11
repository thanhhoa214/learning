import { GetContentPageQueryVariables } from '../services';

const enum Actions {
  LOAD_CONTENT_PAGE = '[ContentPage] Load Content Page Detail',
  CLEAR = '[ContentPage] Clear Content Page Detail',
}

export class LoadContentPage {
  static readonly type = Actions.LOAD_CONTENT_PAGE;
  constructor(public payload: GetContentPageQueryVariables) {}
}

export class ClearContentPage {
  static readonly type = Actions.CLEAR;
}
