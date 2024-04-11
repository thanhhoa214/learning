import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private _translate: TranslateService,
    private _toastController: ToastController,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  async openSnackBar(
    messageKey: string,
    type?: 'success' | 'error',
    loginRequest = false
  ) {
    const translation = await this._translate.get(messageKey).toPromise();
    const loginTranslation = await this._translate
      .get('MENU.login')
      .toPromise();
    const toast = await this._toastController.create({
      color: 'dark',
      animated: true,
      duration: 2500,
      message: translation,
      buttons: loginRequest && [
        {
          text: loginTranslation,
          role: 'cancel',
          icon: type == 'success' ? 'checkmark-done-circle-outline' : undefined,
          handler: () => {
            const preLoginUrl = this._router.url;
            this._loginService.setPreLoginUrl(preLoginUrl);
            this._router.navigateByUrl('/auth/login');
          },
        },
      ],
    });
    toast.present();
  }
}
