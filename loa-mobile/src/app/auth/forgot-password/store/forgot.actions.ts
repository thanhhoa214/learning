import {
  ForgotPasswordInput,
  ErrorType,
} from '@loa-shared/models/graphql.model';

const enum Actions {
  GET_CODE = '[FP] Get Code Password',
  GET_CODE_SUCCESSFUL = '[FP] Get Code Successful',
  GET_CODE_FAILED = '[FP] Get Code Failed',
}

export class GetCode {
  static readonly type = Actions.GET_CODE;
  constructor(public readonly payload: ForgotPasswordInput) {}
}

export class GetCodeSuccessful {
  static readonly type = Actions.GET_CODE_SUCCESSFUL;
  constructor(public readonly payload: { email: string }) {}
}

export class GetCodeFailed {
  static readonly type = Actions.GET_CODE_FAILED;
  constructor(public readonly payload: { errors: ErrorType[] }) {}
}
