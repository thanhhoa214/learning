import {
  GetAllMyRequestDesignsQueryVariables,
  GetAllMyRequestDesignsQuery,
} from '../../shared/services';

const enum Actions {
  LOAD_MY_REQUEST_DESIGN = '[MyRequestDesign] Load My Request Design',
  LOAD_MY_REQUEST_DESIGN_SUCCESSFUL = '[MyRequestDesign] Load My Request Design Successful',
}

export class LoadMyRequestDesign {
  static readonly type = Actions.LOAD_MY_REQUEST_DESIGN;
  constructor(public readonly payload?: GetAllMyRequestDesignsQueryVariables) {}
}

export class LoadMyRequestDesignSuccessful {
  static readonly type = Actions.LOAD_MY_REQUEST_DESIGN_SUCCESSFUL;
  constructor(public readonly payload?: GetAllMyRequestDesignsQuery) {}
}
