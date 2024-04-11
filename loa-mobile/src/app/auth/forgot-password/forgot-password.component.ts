import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { ForgotPasswordService } from './forgot-password.service';
import { FindValidator } from '../../shared/utils';
import { LoadingController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'loa-mobile-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends FormHandlerComponent
  implements ViewWillEnter {
  constructor(
    private _router: Router,
    private _loadingController: LoadingController,
    private _formBuilder: FormBuilder,
    private _forgotPasswordService: ForgotPasswordService,
    private _translate: TranslateService
  ) {
    super();
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ionViewWillEnter(): void {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this._registerGetCode();
    this._registerGetCodeSuccessful();
    this._registerGetCodeFailed();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { email = '' } = this.formGroup.value;
      this._forgotPasswordService.getCode({ email: email.toLowerCase() });
    }
  }
  private _registerGetCode() {
    this._subSink.sink = this._forgotPasswordService
      .onGetCode()
      .subscribe(() => {
        this._translate
          .get('CORE.please_wait')
          .toPromise()
          .then((message: string) =>
            this._loadingController.create({
              message,
              duration: 100000000,
            })
          )
          .then((spinner) => spinner.present());
      });
  }

  private _registerGetCodeSuccessful() {
    this._subSink.sink = this._forgotPasswordService
      .onGetCodeSuccessful()
      .subscribe(() => {
        this._loadingController.dismiss();
        this._router.navigate(['auth/type-code'], {
          queryParams: { type: 'forgot' },
        });
      });
  }

  private _registerGetCodeFailed() {
    this._subSink.sink = this._forgotPasswordService
      .onGetCodeFailed()
      .subscribe(() => {
        this._loadingController.dismiss();
        this.formGroup.get('email').setErrors(FindValidator(false));
      });
  }
}
