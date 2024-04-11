import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';
import {
  ShareInput,
  ZaloAuthCapacitorPlugin,
  ZaloAuthCapacitorPluginPlugin,
} from 'zalo-auth-capacitor-plugin';

@Injectable({ providedIn: 'root' })
export class LoginZaloService {
  private _zaloLogin: ZaloAuthCapacitorPluginPlugin;

  constructor() {
    this._setupZaloLogin();
  }
  async login() {
    return this._zaloLogin.login();
  }
  async getUserProfileFromZalo() {
    return this._zaloLogin.getUserProfile();
  }
  logout() {
    return this._zaloLogin.logout();
  }

  share(input: ShareInput) {
    return this._zaloLogin.share(input);
  }

  private async _setupZaloLogin() {
    if (isPlatform('desktop')) {
      this._zaloLogin = ZaloAuthCapacitorPlugin;
    } else {
      this._zaloLogin = Plugins.ZaloAuthCapacitorPlugin as ZaloAuthCapacitorPluginPlugin;
    }
  }
}
