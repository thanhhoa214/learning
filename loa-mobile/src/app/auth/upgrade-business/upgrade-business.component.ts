import { Component, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { FormHandlerComponent } from '../../auth/shared/form-handler.component';
import { LoginState } from '../login/store';
import { ProfileService } from '../profile/profile.service';
import {
  AdminUpgradeBusiness,
  AdminUpgradeBusinessFailed,
  AdminUpgradeBusinessSuccessful
} from './store/member.actions';
import { ViewWillLeave } from '@ionic/angular';
export enum BusinessType {
  COMPANY = 'COMPANY',
  INDIVIDUAL = 'INDIVIDUAL',
  FREELANCER = 'FREELANCER'
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
  registerationNumber: 8,
  companyTaxCode: 9
};

@Component({
  selector: 'app-upgrade-business',
  templateUrl: './upgrade-business.component.html',
  styleUrls: ['./upgrade-business.component.scss']
})
export class UpgradeBusinessComponent extends FormHandlerComponent
  implements ViewWillEnter, OnDestroy, ViewWillLeave {
  @ViewChildren(MatInput) inputElements: QueryList<MatInput>;

  confirmHide = true;
  public dataUser;
  formGroupUpgrade: FormGroup;
  hide = true;
  public subsink = new SubSink();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    private _titleService: Title,
    private _formBuilder: FormBuilder,
    private _actions: Actions,
    private _store: Store,
    private _profileService: ProfileService
  ) {
    super();
    this._activatedRoute.data.subscribe(({ formGroup }) => (this.formGroup = formGroup));
    this.formGroupUpgrade = this._formBuilder.group({
      businessType: ['COMPANY', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', []],
      phone: [''],
      companyName: [''],
      companyPhone: [''],
      registerationNumber: [''],
      companyTaxCode: ['']
    });
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
    this._registerFormChange();
    // this._registerRegister();
    this._registerRegisterSuccessful();
    this._registerRegisterFailed();
    this.dataUser = this._store.selectSnapshot(LoginState.getUserNode);
    this.setValueLoadData(this.dataUser);
    this._registerEditProfileFailed();
    this._registerEditProfileSuccessful();
  }

  ionViewWillLeave() {
    this.subsink.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  onSubmit() {
    if (this.formGroupUpgrade.valid) {
      if (this.formGroupUpgrade.controls.businessType.value == 'FREELANCER') {
        const { firstName, lastName, businessType, phone } = this.formGroupUpgrade.value;
        this.upgradeBusiness({
          firstName,
          lastName,
          businessType,
          phone
        });
      } else {
        const {
          firstName,
          lastName,
          password,
          confirmPassword,
          businessType,
          companyName,
          companyPhone,
          phone,
          registerationNumber,
          companyTaxCode
        } = this.formGroupUpgrade.value;
        this.upgradeBusiness({
          firstName,
          lastName,
          password,
          confirmPassword,
          businessType,
          companyName,
          companyPhone,
          phone,
          registerationNumber,
          taxCode: companyTaxCode
        });
      }
    }
  }

  private _registerEditProfileFailed() {
    this.subsink.sink = this._profileService.onEditProfileFailed().subscribe(() => {
      console.log('Fail');
    });
  }

  private _registerEditProfileSuccessful() {
    this.subsink.sink = this._profileService.onEditProfileSuccessful().subscribe(() => {
      console.log('success');
    });
  }

  private _registerFormChange() {
    this.formGroupUpgrade.get('businessType').valueChanges.subscribe((businessType) => {
      if (businessType === BusinessType.FREELANCER) {
        this.formGroupUpgrade.patchValue({
          companyName: '',
          companyPhone: '',
          registerationNumber: '',
          companyTaxCode: ''
        });
      }
    });
  }

  private _registerRegisterFailed(): void {
    // Update Customer Fail
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(AdminUpgradeBusinessFailed))
      .subscribe((translation) => {
        if (translation) {
          console.log(translation);
        }
      });
  }

  private _registerRegisterSuccessful(): void {
    // Update Customer Successfully
    this.subsink.sink = this._actions
      .pipe(ofActionSuccessful(AdminUpgradeBusinessSuccessful))
      .subscribe((translation) => {
        if (translation != undefined) {
          this.subsink.unsubscribe();
          const {
            firstName,
            lastName,
            phone,
            companyName,
            companyPhone,
            registerationNumber,
            companyTaxCode
          } = this.formGroupUpgrade.value;
          const isBusiness = translation.length > 0;
          if (this.formGroupUpgrade.controls.businessType.value == 'FREELANCER') {
            if (this.dataUser.loginMethod === 'SYSTEM') {
              this._profileService.editProfile(
                {
                  input: {
                    firstName,
                    lastName,
                    phone
                  },
                  businessInput: {}
                },
                isBusiness
              );
            }
          } else {
            if (this.dataUser.loginMethod === 'SYSTEM') {
              this._profileService.editProfile(
                {
                  input: {
                    firstName,
                    lastName,
                    phone
                  },
                  businessInput: {
                    companyName,
                    companyPhone,
                    registerationNumber,
                    taxCode: companyTaxCode
                  }
                },
                isBusiness
              );
            }
          }
          this._router.navigate(['/auth/register-business-success'], {
            queryParams: { fromLogin: true }
          });
        }
      });
  }

  private setValueLoadData(data) {
    this.formGroupUpgrade.patchValue({
      firstName: data?.firstName,
      lastName: data?.lastName,
      phone: data?.phone,
      email: data?.email,
      companyName: '',
      companyPhone: '',
      registerationNumber: '',
      companyTaxCode: ''
    });
  }

  private upgradeBusiness(params) {
    this._store.dispatch(new AdminUpgradeBusiness(params));
  }

  get businessTypes() {
    return [BusinessType.COMPANY, BusinessType.INDIVIDUAL, BusinessType.FREELANCER];
  }
}
