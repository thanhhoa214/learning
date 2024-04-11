import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginStateModel, initialState } from './login-state.model';
import {
  Login,
  SetUserNode,
  LoginSuccessful,
  LoginFailed,
  LoginWithFacebook,
  LoginWithFacebookFailed,
  LoginWithZalo,
  LoginWithZaloFailed,
} from './login.actions';
import {
  LoginWithEmailGQL,
  LoginWithFacebookGQL,
  LoginWithZaloGQL,
} from '../../shared/services';

@State<LoginStateModel>({
  name: 'login',
  defaults: initialState,
})
@Injectable()
export class LoginState {
  @Selector()
  static getUserNode({ userNode }: LoginStateModel) {
    return userNode;
  }
  @Selector()
  static getToken({ token }: LoginStateModel) {
    return token;
  }

  constructor(
    private _loginWithEmailMutation: LoginWithEmailGQL,
    private _loginWithFacebookMutation: LoginWithFacebookGQL,
    private _loginWithZaloMutation: LoginWithZaloGQL
  ) {}

  @Action(Login, { cancelUncompleted: true })
  loginByEmail(context: StateContext<LoginStateModel>, { payload }: Login) {
    const { loginInput, isBusiness: isInBusinessLoginPage } = payload;
    return this._loginWithEmailMutation.mutate({ input: loginInput }).pipe(
      tap(({ data }) => {
        const { errors, token, user } = data.authLogin;
        const isBusinessAccount = user?.userType.includes('business');
        const isMatchAny = isInBusinessLoginPage === undefined;
        let isNotMatchBusiness = false;
        let isNotMatchNormal = false;

        if (!isMatchAny) {
          isNotMatchBusiness = isInBusinessLoginPage && !isBusinessAccount;
          isNotMatchNormal = !isInBusinessLoginPage && isBusinessAccount;
        }

        if (
          errors?.length > 0 ||
          user?.userType.includes('admin') ||
          isNotMatchBusiness ||
          isNotMatchNormal
        ) {
          return context.dispatch(new LoginFailed({ errors }));
        }
        return context.dispatch(
          new LoginSuccessful({
            token,
            userNode: user,
          })
        );
      })
    );
  }

  @Action(LoginSuccessful)
  loginSuccessful(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginSuccessful
  ): void {
    patchState(payload);
  }

  @Action(LoginFailed)
  loginFailed(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginFailed
  ): void {
    patchState(payload);
  }

  @Action(SetUserNode)
  setUserNode(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: SetUserNode
  ): void {
    patchState(payload);
  }

  @Action(LoginWithFacebook, { cancelUncompleted: true })
  loginWithFB(
    context: StateContext<LoginStateModel>,
    { payload }: LoginWithFacebook
  ) {
    return this._loginWithFacebookMutation.mutate({ input: payload }).pipe(
      tap(({ data }) => {
        const {
          errors,
          token,
          facebookInformation,
        } = data.authLoginWithFacebook;
        if (
          errors?.length > 0 ||
          facebookInformation?.user?.userType.includes('admin')
        ) {
          return context.dispatch(
            new LoginWithFacebookFailed({ errors: errors })
          );
        }
        return context.dispatch(
          new LoginSuccessful({
            token,
            userNode: facebookInformation.user,
          })
        );
      })
    );
  }
  @Action(LoginWithFacebookFailed)
  loginWithFacebookFailed(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginWithFacebookFailed
  ): void {
    patchState({
      errors: payload.errors as any,
    });
  }

  @Action(LoginWithZalo, { cancelUncompleted: true })
  loginWithZalo(
    context: StateContext<LoginStateModel>,
    { payload }: LoginWithZalo
  ) {
    return this._loginWithZaloMutation.mutate({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, token, zaloInformation } = data.authLoginWithZalo;
        if (
          errors?.length > 0 ||
          zaloInformation?.user?.userType.includes('admin')
        ) {
          return context.dispatch(new LoginWithZaloFailed({ errors: errors }));
        }
        return context.dispatch(
          new LoginSuccessful({
            token,
            userNode: zaloInformation.user,
          })
        );
      })
    );
  }
  @Action(LoginWithZaloFailed)
  loginWithZaloFailed(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginWithZaloFailed
  ): void {
    patchState({
      errors: payload.errors as any,
    });
  }
}
