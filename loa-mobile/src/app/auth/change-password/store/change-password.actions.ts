import {
  ResetPasswordInput,
  ErrorType,
} from '@loa-shared/models/graphql.model';

const enum Actions {
  CHANGE_PASSWORD = '[PW] Change Password',
  CHANGE_PASSWORD_SUCCESSFUL = '[PW] Change Password Successful',
  CHANGE_PASSWORD_FAILED = '[PW] Change Password Failed',
}

export class ChangePassword {
  static readonly type = Actions.CHANGE_PASSWORD;
  constructor(public readonly payload: ResetPasswordInput) {}
}
export class ChangePasswordSuccessful {
  static readonly type = Actions.CHANGE_PASSWORD_SUCCESSFUL;
  constructor(public readonly payload: { newPassword: string }) {}
}
export class ChangePasswordFailed {
  static readonly type = Actions.CHANGE_PASSWORD_FAILED;
  constructor(public readonly payload: { errors: ErrorType[] }) {}
}
