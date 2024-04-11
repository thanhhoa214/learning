import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { NotificationService } from '../../shared/services/notification.service';
import { MatchValidator } from '../../shared/utils';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { TypeCodeService } from '../type-code/type-code.service';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'loa-mobile-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends FormHandlerComponent
  implements ViewWillEnter {
  token: string;
  email: string;

  constructor(
    public location: Location,
    private _router: Router,
    private _loadingCtrl: LoadingController,
    private _forgotPasswordService: ForgotPasswordService,
    private _typeCodeService: TypeCodeService,
    private _changePasswordService: ChangePasswordService,
    private _notify: NotificationService,
    private _formBuilder: FormBuilder,
    private _translate: TranslateService
  ) {
    super();
    this.token = this._typeCodeService.getChangePasswordToken();
    this.email = this._forgotPasswordService.getEmail();
    this.formGroup = this._formBuilder.group({
      email: [{ value: '', disabled: true }],
      code: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MatchValidator('password'),
        ],
      ],
    });
  }

  ionViewWillEnter(): void {
    this.formGroup = this._formBuilder.group({
      email: [{ value: '', disabled: true }],
      code: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MatchValidator('password'),
        ],
      ],
    });
    this.formGroup.patchValue({ code: this.token, email: this.email });
    this._registerChangePassword();
    this._registerChangePasswordFailed();
    this._registerChangePasswordSuccessful();
  }

  back() {
    this._router.navigate(['auth/login']);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { code, password, confirmPassword } = this.formGroup.value;
      this._changePasswordService.changePassword({
        code,
        password,
        confirmPassword,
      });
    }
  }

  private _registerChangePassword() {
    this._subSink.sink = this._changePasswordService
      .onChangePassword()
      .subscribe(() => {
        this._translate
          .get('CORE.please_wait')
          .toPromise()
          .then((message: string) =>
            this._loadingCtrl.create({
              message,
              duration: 10000,
            })
          )
          .then((spinner) => spinner.present());
      });
  }

  private _registerChangePasswordSuccessful() {
    this._subSink.sink = this._changePasswordService
      .onChangePasswordSuccessful()
      .subscribe(() => {
        this._loadingCtrl.dismiss();
        this._notify.openSnackBar(
          'AUTH.CHANGE_PASSWORD.change_password_success',
          'success'
        );
        this._router.navigate(['/']);
      });
  }

  private _registerChangePasswordFailed() {
    this._subSink.sink = this._changePasswordService
      .onChangePasswordFailed()
      .subscribe(() => {
        this._loadingCtrl.dismiss();
        this._notify.openSnackBar(
          'AUTH.CHANGE_PASSWORD.change_password_failed',
          'error'
        );
      });
  }
}
