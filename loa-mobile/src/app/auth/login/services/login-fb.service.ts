import { Injectable } from '@angular/core';
import {
  FacebookLogin,
  FacebookLoginPlugin,
} from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';

registerWebPlugin(FacebookLogin);
@Injectable({ providedIn: 'root' })
export class LoginFbService {
  private _fbLogin: FacebookLoginPlugin;

  constructor() {
    this._setupFbLogin();
  }
  async loginWithFacebook() {
    const FACEBOOK_PERMISSIONS = ['email'];
    return this._fbLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
  }
  logout() {
    return this._fbLogin.logout();
  }

  private async _setupFbLogin() {
    if (isPlatform('desktop')) {
      this._fbLogin = FacebookLogin;
    } else {
      this._fbLogin = Plugins.FacebookLogin;
    }
  }
}
