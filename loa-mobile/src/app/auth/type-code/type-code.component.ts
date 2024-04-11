import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { ConfirmForgotPasswordInput } from '@loa-shared/models/graphql.model';
import { Store } from '@ngxs/store';
import { ForgotState } from '../forgot-password/store';
import { NotificationService } from '../../shared/services/notification.service';
import { TypeCodeService } from './type-code.service';
import { LoadingController } from '@ionic/angular';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'loa-mobile-type-code',
  templateUrl: './type-code.component.html',
  styleUrls: ['./type-code.component.scss']
})
export class TypeCodeComponent extends FormHandlerComponent implements ViewWillEnter {
  email: string;
  isLoading = true;
  sendable = true;
  type: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store,
    private _loadingController: LoadingController,
    private _forgotPassService: ForgotPasswordService,
    private _typeCodeService: TypeCodeService,
    private _notify: NotificationService,
    private _formBuilder: FormBuilder,
    private _translate: TranslateService
  ) {
    super();
    this._activatedRoute.queryParams.subscribe((e) => {
      this.type = e.type;
    });
    this.formGroup = this._formBuilder.group({
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern('[0-9]+')
        ]
      ]
    });
    this.email = this._store.selectSnapshot(ForgotState.getEmail);
    if (!this.email) {
      this._router.navigate(['..', 'forgot']);
    }
  }

  ionViewWillEnter(): void {
    this.formGroup = this._formBuilder.group({
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern('[0-9]+')
        ]
      ]
    });
    this._registerTypeCode();
    this._registerTypeCodeFailed();
    this._registerTypeCodeSuccessful();

    this._subSink.sink = this._forgotPassService.onGetCodeSuccessful().subscribe(() => {
      this._notify.openSnackBar('AUTH.FORGOT_PASSWORD.send_reset_code_success', 'success');
    });

    this._subSink.sink = this._forgotPassService.onGetCodeFailed().subscribe(() => {
      this._notify.openSnackBar('AUTH.FORGOT_PASSWORD.send_reset_code_failed', 'error');
    });

    this._subSink.sink = this._forgotPassService.onGetCode().subscribe(() => {
      this.sendable = false;
      setTimeout(() => {
        this.sendable = true;
      }, 30000);
    });
  }

  onOtpChange(otp: string) {
    if (otp.length === 6) {
      this.isLoading = false;
      if (this.formGroup.value.code !== otp) {
        this.formGroup.setValue({ code: otp });
        this.onSubmit();
      }
    } else {
      if (otp.length === 5) {
        this.formGroup.get('code').setErrors(null);
      }
      this.isLoading = true;
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { code = '' } = this.formGroup.value;
      this._typeCodeService.typeCodeFP({ code });
    }
  }

  resend() {
    if (this.type === 'forgot') {
      const email = this._forgotPassService.getEmail();
      this._forgotPassService.getCode({ email });
    }
  }

  private _registerTypeCode() {
    this._subSink.sink = this._typeCodeService.onTypeCodeFP().subscribe(() => {
      this._translate
        .get('CORE.please_wait')
        .toPromise()
        .then((message: string) =>
          this._loadingController.create({
            message,
            duration: 100000000
          })
        )
        .then((spinner) => spinner.present());
    });
  }

  private _registerTypeCodeFailed() {
    this._subSink.sink = this._typeCodeService.onTypeCodeFPFailed().subscribe(() => {
      this._loadingController.dismiss();
      this.isLoading = false;
      this.formGroup.get('code').setErrors({ invalid: true });
    });
  }

  private _registerTypeCodeSuccessful() {
    this._subSink.sink = this._typeCodeService.onTypeCodeFPSuccessful().subscribe(() => {
      this._loadingController.dismiss();
      const input: ConfirmForgotPasswordInput = {
        code: this.formGroup.get('code').value
      };
      this._router.navigate(['auth/change-password'], {
        queryParams: { token: input.code }
      });
    });
  }

  get config() {
    return {
      length: 6,
      allowNumbersOnly: true,
      inputStyles: { width: '2rem', height: '2rem' }
    };
  }
}
