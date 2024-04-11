import { ChangePasswordInput } from '@loa-shared/models/graphql.model';

const enum Actions {
  CHANGE_OLD_PASSWORD = '[Auth] Change Old Password',
  CHANGE_OLD_PASSWORD_SUCCESSFUL = '[Auth] Change Old Password Successful',
  CHANGE_OLD_PASSWORD_FAILED = '[Auth] Change Old Password Failed',
}

export class ChangeOldPassword {
  static readonly type = Actions.CHANGE_OLD_PASSWORD;
  constructor(public readonly payload: ChangePasswordInput) {}
}

export class ChangeOldPasswordSuccessful {
  static readonly type = Actions.CHANGE_OLD_PASSWORD_SUCCESSFUL;
}
export class ChangeOldPasswordFailed {
  static readonly type = Actions.CHANGE_OLD_PASSWORD_FAILED;
}
