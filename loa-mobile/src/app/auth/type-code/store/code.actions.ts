import {
  ConfirmForgotPasswordInput,
  ErrorType,
} from '@loa-shared/models/graphql.model';

const enum Actions {
  FP_TYPE_CODE = '[FP] Type Code Forgot Password',
  FP_TYPE_CODE_SUCCESSFUL = '[FP] Type Code Successful',
  FP_TYPE_CODE_FAILED = '[FP] Type Code Failed',
}

export class TypeCodeFP {
  static readonly type = Actions.FP_TYPE_CODE;
  constructor(public readonly payload: ConfirmForgotPasswordInput) {}
}

export class TypeCodeFPSuccessful {
  static readonly type = Actions.FP_TYPE_CODE_SUCCESSFUL;
  constructor(public readonly payload: { token: string }) {}
}

export class TypeCodeFPFailed {
  static readonly type = Actions.FP_TYPE_CODE_FAILED;
  constructor(public readonly payload: { errors: ErrorType[] }) {}
}
