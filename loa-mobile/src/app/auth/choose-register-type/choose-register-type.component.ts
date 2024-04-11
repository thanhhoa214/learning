import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { switchMapTo } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { LoginService } from '../login/services/login.service';

@Component({
  templateUrl: './choose-register-type.component.html',
  styleUrls: ['./choose-register-type.component.scss'],
})
export class ChooseRegisterTypeComponent {
  private _subSink = new SubSink();

  constructor(
    public location: Location,
    private _loginService: LoginService,
    private _router: Router,
    private _loadingCtrl: LoadingController,
    private _notificationService: NotificationService,
    private _translate: TranslateService
  ) {
    this._registerLoginSuccessful();
    this._registerLoginFailed();
  }
  loginByFB() {
    this._translate
      .get('CORE.please_wait')
      .toPromise()
      .then((message: string) =>
        this._loadingCtrl.create({
          message,
          duration: 100000000,
        })
      )
      .then((spinner) => spinner.present());
    this._loginService.loginWithFacebook();
  }
  loginByZalo() {
    this._translate
      .get('CORE.please_wait')
      .toPromise()
      .then((message: string) =>
        this._loadingCtrl.create({
          message,
          duration: 100000000,
        })
      )
      .then((spinner) => spinner.present());
    this._loginService.loginWithZalo();
  }
  private _registerLoginSuccessful() {
    this._subSink.sink = this._loginService
      .onLoginSuccessful()
      .subscribe(() => {
        this._loadingCtrl.dismiss();
        this._router.navigateByUrl('/menu');
      });
  }

  private _registerLoginFailed() {
    this._subSink.sink = this._loginService
      .onLoginFailed()
      .pipe(switchMapTo(this._translate.get('AUTH.LOGIN.login_failed')))
      .subscribe((translation) => {
        this._loadingCtrl.dismiss();
        this._notificationService.openSnackBar(translation, 'error');
      });
  }
}
