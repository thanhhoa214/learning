import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormHandlerComponent } from '../shared/form-handler.component';
import { NotificationService } from '../../shared/services/notification.service';
import {
  MatchValidator,
  NotMatchValidator,
  ValidValidator,
} from '../../shared/utils';
import { ChangeOldPasswordService } from './change-old-password.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'loa-mobile-change-old-password',
  templateUrl: './change-old-password.component.html',
  styleUrls: ['./change-old-password.component.scss'],
})
export class ChangeOldPasswordComponent extends FormHandlerComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _notify: NotificationService,
    private _loadingCtrl: LoadingController,
    private _changeOldPasswordService: ChangeOldPasswordService,
    private _translate: TranslateService
  ) {
    super();
    this.formGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          NotMatchValidator('password'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MatchValidator('newPassword'),
        ],
      ],
    });

    this._registerChangeOldPassword();
    this._registerChangeOldPasswordFailed();
    this._registerChangeOldPasswordSuccessful();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { password, newPassword, confirmPassword } = this.formGroup.value;
      this._changeOldPasswordService.changeOldPassword({
        password,
        newPassword,
        confirmPassword,
      });
    }
  }

  goTo(link: string) {
    this._router.navigateByUrl('/' + link);
  }
  private _registerChangeOldPassword() {
    this._subSink.sink = this._changeOldPasswordService
      .onChangeOldPassword()
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

  private _registerChangeOldPasswordSuccessful() {
    this._subSink.sink = this._changeOldPasswordService
      .onChangeOldPasswordSuccessful()
      .subscribe(() => {
        this._loadingCtrl.dismiss();
        this._router.navigateByUrl('/menu');
        this._notify.openSnackBar('MESSAGE.OTHER.change_password', 'success');
      });
  }

  private _registerChangeOldPasswordFailed() {
    this._subSink.sink = this._changeOldPasswordService
      .onChangeOldPasswordFailed()
      .subscribe(() => {
        this._loadingCtrl.dismiss();
        this.formGroup.get('password').setErrors(ValidValidator);
      });
  }
}
