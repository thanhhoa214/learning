import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { UniqueEmailValidator } from '../../shared/utils';
import { LoginService } from '../login/services/login.service';
import { RegisterBusinessService } from './register-business.service';

export enum BusinessType {
  COMPANY = 'company',
  INDIVIDUAL = 'individual',
  FREELANCER = 'freelancer'
}

const formControlNameMap = {
  firstName: 0,
  lastName: 1,
  email: 2,
  password: 3,
  confirmPassword: 4,
  phone: 5,
  companyName: 6,
  companyPhone: 7,
  companyBusinessRegis: 8,
  companyTaxCode: 9
};

@Component({
  selector: 'register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss']
})
export class RegisterBusinessComponent extends FormHandlerComponent implements ViewWillEnter {
  @ViewChildren(MatInput) inputElements: QueryList<MatInput>;

  confirmHide = true;
  hide = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _registerBusinessService: RegisterBusinessService,
    private _loadingController: LoadingController,
    private _translate: TranslateService,
    private _titleService: Title,
    private _loginService: LoginService
  ) {
    super();
    this._activatedRoute.data.subscribe(({ formGroup }) => (this.formGroup = formGroup));
  }

  focusInputByFormControlName(event: KeyboardEvent, formControlName: string): void {
    if (event.keyCode === 13) {
      const index = formControlNameMap[formControlName];
      const targetInput = this.inputElements.toArray()[index];
      if (targetInput) targetInput.focus();
      // else this.onSubmit();
    }
  }

  ionViewWillEnter(): void {
    this._translate.get('TITLES.register_business').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });
    this._activatedRoute.data.subscribe(({ formGroup }) => (this.formGroup = formGroup));
    this.formGroup.patchValue({ businessType: BusinessType.COMPANY });
    this._registerFormChange();
    this._registerRegister();
    this._registerRegisterSuccessful();
    this._registerRegisterFailed();
    this._registerLoginSuccessful();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        businessType,
        companyName,
        companyPhone,
        phone,
        companyBusinessRegis,
        companyTaxCode
      } = this.formGroup.value;
      this._registerBusinessService.register({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        confirmPassword,
        businessType: businessType.toUpperCase(),
        companyName: companyName ?? undefined,
        companyPhone: companyPhone ?? undefined,
        phone: phone ?? undefined,
        registerationNumber: companyBusinessRegis ?? undefined,
        taxCode: companyTaxCode ?? undefined
      });
    }
  }

  private _registerFormChange() {
    this.formGroup.get('businessType').valueChanges.subscribe((businessType) => {
      if (businessType === BusinessType.FREELANCER) {
        this.formGroup.patchValue({
          phone: '',
          companyName: '',
          companyPhone: '',
          companyBusinessRegis: '',
          companyTaxCode: ''
        });
      }
    });
  }

  private _registerLoginSuccessful() {
    this._subSink.sink = this._loginService.onLoginSuccessful().subscribe(() => {
      this._loadingController.dismiss();
      this._router.navigateByUrl('/auth/register-business-success', {
        queryParams: { fromRegister: true }
      });
    });
  }

  private _registerRegister() {
    this._subSink.sink = this._registerBusinessService.onRegister().subscribe(() => {
      this._translate
        .get('CORE.please_wait')
        .toPromise()
        .then((message) => this._loadingController.create({ message, duration: 2000 }))
        .then((spinner) => spinner.present());
    });
  }

  private _registerRegisterFailed(): void {
    this._subSink.sink = this._registerBusinessService.onRegisterFailed().subscribe(() => {
      this._loadingController.dismiss();
      this.formGroup.get('email').setErrors(UniqueEmailValidator(true));
    });
  }

  private _registerRegisterSuccessful(): void {
    this._subSink.sink = this._registerBusinessService.onRegisterSuccessful().subscribe(() => {
      this._loginService.login(this._registerBusinessService.getLoginInput(), true);
    });
  }

  get businessTypes() {
    return [BusinessType.COMPANY, BusinessType.INDIVIDUAL, BusinessType.FREELANCER];
  }
}
