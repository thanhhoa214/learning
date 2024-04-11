const enum Actions {
  LOAD_HOME_DATA = '[Home] Load Home Data',
  LOAD_HOME_DATA_FAILED = '[Home] Load Home Data Failed',
  LOAD_HOME_DATA_SUCCESSFUL = '[Home] Load Home Data Successfully',
  RESET_BANNER = '[Home] Reset Banner'
}

export class LoadHomeData {
  static readonly type = Actions.LOAD_HOME_DATA;
}

export class LoadHomeDataFailed {
  static readonly type = Actions.LOAD_HOME_DATA_FAILED;
}

export class LoadHomeDataSuccessfully {
  static readonly type = Actions.LOAD_HOME_DATA_SUCCESSFUL;
}

export class ResetBanner {
  static readonly type = Actions.RESET_BANNER;
}
