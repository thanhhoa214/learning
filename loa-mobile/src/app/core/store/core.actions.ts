import { LanguageCode } from '@loa-shared/models';

const enum Actions {
  LOAD_LANGUAGE = '[Core] Load Language',
  UPDATE_SEARCH_QUERY = '[Core] Update Search Query',
  RESET_SEARCH_QUERY = '[Core] Reset Search Query',
  LOAD_URL_FAILED = '[Core] Load URL Failed',
}

export class LoadLanguage {
  static readonly type = Actions.LOAD_LANGUAGE;
  constructor(public readonly payload: { languageCode: LanguageCode }) {}
}

export class UpdateSearchQuery {
  static readonly type = Actions.UPDATE_SEARCH_QUERY;
  constructor(public readonly payload: { query: string }) {}
}

export class ResetSearchQuery {
  static readonly type = Actions.RESET_SEARCH_QUERY;
}

export class LoadUrlFailed {
  static readonly type = Actions.LOAD_URL_FAILED;
}
