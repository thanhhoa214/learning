import { ErrorType, LoginInput } from '@loa-shared/models/graphql.model';
import {
  LoginWithFacebookMutation,
  LoginWithFacebookMutationVariables,
  LoginWithZaloMutation,
  LoginWithZaloMutationVariables,
} from '../../shared/services';
import { LoginUserNode } from './login-state.model';

const enum Actions {
  LOGIN = '[Auth] Login',
  LOGIN_FAILED = '[Auth] Login Failed',
  LOGIN_SUCCESSFUL = '[Auth] Login Successful',
  LOGIN_WITH_FACEBOOK = '[Auth] Login with Facebook',
  LOGIN_WITH_FACEBOOK_FAILED = '[Auth] Login with Facebook Failed',
  LOGIN_WITH_ZALO = '[Auth] Login with Zalo',
  LOGIN_WITH_ZALO_FAILED = '[Auth] Login with Zalo Failed',
  SET_USER_INFO = '[Auth] Set User Information',
}
export class Login {
  static readonly type = Actions.LOGIN;
  constructor(
    public readonly payload: { loginInput: LoginInput; isBusiness: boolean }
  ) {}
}
export class LoginSuccessful {
  static readonly type = Actions.LOGIN_SUCCESSFUL;
  constructor(
    public readonly payload: {
      userNode: LoginUserNode;
      token: string;
    }
  ) {}
}
export class LoginFailed {
  static readonly type = Actions.LOGIN_FAILED;
  constructor(public readonly payload: { errors: ErrorType[] }) {}
}

export class SetUserNode {
  static readonly type = Actions.SET_USER_INFO;
  constructor(
    public readonly payload: {
      userNode: LoginUserNode;
    }
  ) {}
}

export class LoginWithFacebook {
  static readonly type = Actions.LOGIN_WITH_FACEBOOK;
  constructor(
    public readonly payload: LoginWithFacebookMutationVariables['input']
  ) {}
}
export class LoginWithFacebookFailed {
  static readonly type = Actions.LOGIN_WITH_FACEBOOK_FAILED;
  constructor(
    public readonly payload: {
      errors: LoginWithFacebookMutation['authLoginWithFacebook']['errors'];
    }
  ) {}
}

export class LoginWithZalo {
  static readonly type = Actions.LOGIN_WITH_ZALO;
  constructor(
    public readonly payload: LoginWithZaloMutationVariables['input']
  ) {}
}
export class LoginWithZaloFailed {
  static readonly type = Actions.LOGIN_WITH_ZALO_FAILED;
  constructor(
    public readonly payload: {
      errors: LoginWithZaloMutation['authLoginWithZalo']['errors'];
    }
  ) {}
}
