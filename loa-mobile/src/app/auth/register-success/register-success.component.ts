import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SubSinkable } from '@loa-shared/models';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../login/services/login.service';
import { RegisterService } from '../register/register.service';

@Component({
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
})
export class RegisterSuccessComponent extends SubSinkable {
  constructor(
    private _loginService: LoginService,
    private _registerService: RegisterService,
    private _loadingController: LoadingController,
    private _router: Router,
    private _translate: TranslateService,
    titleService: Title
  ) {
    super();
    this._translate.get('TITLES.designs').subscribe((title) => {
      titleService.setTitle(`${title} | Interior Design`);
    });
    this._registerLogin();
    this._registerLoginSuccessful();
  }

  login() {
    this._loginService.login(this._registerService.getLoginInput(), false);
  }

  private _registerLogin() {
    this._subSink.sink = this._loginService.onLogin().subscribe(async () => {
      const message = await this._translate.get('CORE.please_wait').toPromise();
      const loader = await this._loadingController.create({
        message,
        duration: 2000,
      });
      loader.present();
    });
  }

  private _registerLoginSuccessful() {
    this._subSink.sink = this._loginService
      .onLoginSuccessful()
      .subscribe(() => {
        this._loadingController.dismiss();
        this._router.navigateByUrl('/');
      });
  }
}
