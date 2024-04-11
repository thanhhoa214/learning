import { Injectable } from '@angular/core';
import { LoginInput, UserLoginMethod } from '@loa-shared/models/graphql.model';
import { Actions, ofActionDispatched, ofActionSuccessful, Store } from '@ngxs/store';
import { Logout } from '../../store';
import { LoginFbService } from './login-fb.service';
import { LoginZaloService } from './login-zalo.service';
import {
  LoginFailed,
  LoginSuccessful,
  Login,
  LoginState,
  LoginWithFacebook,
  LoginWithZalo,
  LoginStateModel
} from '../store';
import { Plugins } from '@capacitor/core';
import { Observable, merge } from 'rxjs';
const { Device } = Plugins;

@Injectable({ providedIn: 'root' })
export class LoginService {
  userNode$: Observable<LoginStateModel['userNode']>;

  private _preLoginUrl: string;

  constructor(
    private _store: Store,
    private _actions: Actions,
    private _loginWithZalo: LoginZaloService,
    private _loginFbService: LoginFbService
  ) {
    this.userNode$ = this._store.select(LoginState.getUserNode);
  }

  getPreLoginUrl(): string {
    return this._preLoginUrl;
  }

  getUserNode$() {
    return this._store.select(LoginState.getUserNode);
  }

  login(loginInput: LoginInput, isBusiness: boolean) {
    this._store.dispatch(new Login({ loginInput, isBusiness }));
  }

  async loginWithFacebook() {
    const { accessToken } = await this._loginFbService.loginWithFacebook();
    this._store.dispatch(
      new LoginWithFacebook({
        accessToken: accessToken.token,
        facebookId: accessToken.userId
      })
    );
  }

  async loginWithZalo() {
    const { success, oauthCode } = await this._loginWithZalo.login();
    if (success) {
      this._store.dispatch(new LoginWithZalo({ oAuthCode: oauthCode }));
    }
  }

  async logout() {
    const userNode = this.snapshot?.userNode;
    if ((await Device.getInfo()).platform !== 'web') {
      try {
        switch (userNode.loginMethod) {
          case UserLoginMethod.Facebook:
            await this._loginFbService.logout();
            break;
          // case UserLoginMethod.Zalo:
          //   await this._loginWithZalo.logout();
          //   break;
        }
      } catch (error) {
        console.log(error);
      }
    }

    this._store.dispatch(new Logout());
  }

  onLogin() {
    return merge(
      this._actions.pipe(ofActionDispatched(Login)),
      this._actions.pipe(ofActionDispatched(LoginWithFacebook)),
      this._actions.pipe(ofActionDispatched(LoginWithZalo))
    );
  }

  onLoginFailed() {
    return this._actions.pipe(ofActionSuccessful(LoginFailed));
  }

  onLoginSuccessful() {
    return this._actions.pipe(ofActionSuccessful(LoginSuccessful));
  }

  onLogout() {
    return this._actions.pipe(ofActionSuccessful(Logout));
  }

  setPreLoginUrl(preLoginUrl: string) {
    this._preLoginUrl = preLoginUrl;
  }

  get snapshot() {
    return this._store.selectSnapshot<LoginStateModel>(LoginState);
  }
}
