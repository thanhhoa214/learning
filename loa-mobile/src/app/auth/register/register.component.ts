import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { MatchValidator, UniqueEmailValidator } from '../../shared/utils';
import { RegisterService } from './register.service';

const formControlNameMap = {
  firstName: 0,
  lastName: 1,
  email: 2,
  password: 3,
  confirmPassword: 4,
};
@Component({
  selector: 'loa-mobile-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormHandlerComponent
  implements ViewWillEnter {
  @ViewChildren(MatInput) inputElements: QueryList<MatInput>;

  hide = true;
  confirmHide = true;

  constructor(
    private _router: Router,
    private _registerService: RegisterService,
    private _formBuilder: FormBuilder,
    private _loadingController: LoadingController,
    private _translate: TranslateService,
    private _titleService: Title
  ) {
    super();
    this.formGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    this._translate.get('TITLES.register').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });
    this.formGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    this._registerRegister();
    this._registerRegisterSuccessful();
    this._registerRegisterFailed();
  }

  focusInputByFormControlName(
    event: KeyboardEvent,
    formControlName: string
  ): void {
    if (event.keyCode === 13) {
      const index = formControlNameMap[formControlName];
      this.inputElements.toArray()[index].focus();
    }
  }

  goToLogin() {
    this._router.navigate(['auth/login']);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = this.formGroup.value;
      this._registerService.register({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        confirmPassword,
      });
    }
  }

  private _registerRegister() {
    this._subSink.sink = this._registerService.onRegister().subscribe(() => {
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

  private _registerRegisterSuccessful(): void {
    this._subSink.sink = this._registerService
      .onRegisterSuccessful()
      .subscribe(() => {
        this._loadingController.dismiss();
        this._router.navigate(['auth/register-success']);
      });
  }
  private _registerRegisterFailed(): void {
    this._subSink.sink = this._registerService
      .onRegisterFailed()
      .subscribe(() => {
        this._loadingController.dismiss();
        this.formGroup.get('email').setErrors(UniqueEmailValidator(true));
      });
  }
}
