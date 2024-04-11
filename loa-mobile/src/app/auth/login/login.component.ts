import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { LoadingController } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
@Component({
  selector: 'loa-mobile-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormHandlerComponent implements ViewWillEnter {
  backTo = '/home';
  isBusiness: boolean;
  isLoading: boolean;
  isShowPassword = true;
  token = null;
  user = null;

  constructor(
    public location: Location,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loadingController: LoadingController,
    private _loginService: LoginService,
    private _translate: TranslateService,
    private _titleService: Title
  ) {
    super();
    this._activatedRoute.data.subscribe(({ formGroup, isBusiness }) => {
      this.formGroup = formGroup;
      this.isBusiness = isBusiness ?? false;
    });
  }

  forgotPassword() {
    this._router.navigate(['auth/forgot-password']);
  }

  ionViewWillEnter(): void {
    this._translate.get('TITLES.login').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });
    this._activatedRoute.data.subscribe(({ formGroup }) => {
      this.formGroup = formGroup;
    });
    this._registerLogin();
    this._registerLoginSuccessful();
    this._registerLoginFailed();

    this.backTo = this._loginService.getPreLoginUrl() ?? '/home';
  }

  loginByFB() {
    this._loginService.loginWithFacebook();
  }

  loginByZalo() {
    this._loginService.loginWithZalo();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this._loginService.login({ email: email.toLowerCase(), password }, this.isBusiness);
    }
  }

  private _registerLogin() {
    this._subSink.sink = this._loginService.onLogin().subscribe(async () => {
      const message = await this._translate.get('CORE.please_wait').toPromise();
      const loader = await this._loadingController.create({
        message,
        duration: 9999999
      });
      loader.present();
    });
  }

  private _registerLoginFailed() {
    this._subSink.sink = this._loginService.onLoginFailed().subscribe(() => {
      this._loadingController.dismiss();
      const passwordFormControl = this.formGroup.get('password');
      passwordFormControl.setErrors({
        invalidAsync: true
      });
    });
  }

  private _registerLoginSuccessful() {
    this._subSink.sink = this._loginService.onLoginSuccessful().subscribe(() => {
      this._loadingController.dismiss();
      const destinationURL = this.isBusiness
        ? '/auth/register-business-success?fromLogin=true'
        : this.backTo;
      this._router.navigateByUrl(destinationURL);
    });
  }
}
