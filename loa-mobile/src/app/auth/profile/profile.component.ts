import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import {
  IonContent,
  LoadingController,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  getErrorMessage,
  getErrorMessageForgotPassword,
  getErrorMessageLogin,
} from '../../auth/shared/utils';
import { SubSinkable } from '../../shared/models';
import { NotificationService } from '../../shared/services/notification.service';
import { getDataURLFromFile } from '../../shared/utils';
import { LoginService } from '../login/services/login.service';
import { LoginUserNode } from '../login/store';
import { FieldType } from '../shared/models';
import { ProfileService } from './profile.service';
import { SwitchToBusinessComponent } from './switch-to-business/switch-to-business.component';
const { Keyboard } = Plugins;

const acceptedImageTypes = ['image/png', 'image/jpeg'];

const formControlNameMap = {
  firstName: 0,
  lastName: 1,
  email: 2,
  phone: 3,
  companyName: 4,
  companyPhone: 5,
  companyBusinessRegis: 6,
  companyTaxCode: 7,
};
@Component({
  selector: 'loa-mobile-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends SubSinkable
  implements ViewWillEnter, ViewWillLeave {
  @ViewChild('imageInput') imageInput: ElementRef<HTMLInputElement>;
  @ViewChild(IonContent) mainContainer: IonContent;
  @ViewChildren(MatInput) inputElements: QueryList<MatInput>;

  iconUrl: string | ArrayBuffer;
  icon: File;
  userInfo: LoginUserNode;
  formGroup: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _loadingController: LoadingController,
    private _translate: TranslateService,
    private _profileService: ProfileService,
    private _dialog: MatDialog
  ) {
    super();
    this.formGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      companyName: [''],
      companyPhone: [''],
      companyBusinessRegis: [''],
      companyTaxCode: [''],
    });
  }

  ionViewWillEnter(): void {
    this.formGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      companyName: [''],
      companyPhone: [''],
      companyBusinessRegis: [''],
      companyTaxCode: [''],
    });
    this._registerUserNodeData();
    this._profileService.loadProfile();
    this._registerEditProfile();
    this._registerEditProfileFailed();
    this._registerEditProfileSuccessful();
    if (Capacitor.isNative) {
      const scrollBottomCallback = () => {
        setTimeout(() => {
          this.mainContainer.scrollToBottom();
        }, 500);
      };
      Keyboard.addListener('keyboardWillShow', scrollBottomCallback);
      Keyboard.addListener('keyboardWillHide', scrollBottomCallback);
    }
  }

  ionViewWillLeave() {
    super.ionViewWillLeave();
    if (Capacitor.isNative) {
      Keyboard.removeAllListeners();
    }
  }

  goTo(link: string) {
    this._router.navigateByUrl('/' + link);
  }
  focusInputByFormControlName(
    event: KeyboardEvent,
    formControlName: string
  ): void {
    if (event.keyCode === 13) {
      const index = formControlNameMap[formControlName];
      const targetInput = this.inputElements.toArray()[index];
      if (targetInput) targetInput.focus();
      // else this.onSubmit();
    }
  }

  async imageInputChange({
    target,
  }: CustomEvent<HTMLInputElement>): Promise<void> {
    const { files } = target as HTMLInputElement;
    if (!files) {
      return;
    }

    const file = Array.from(files)[0];
    if (!acceptedImageTypes.includes(file.type)) {
      return;
    }

    this.icon = file;
    const imageDataURL = await getDataURLFromFile(file);
    this.iconUrl = imageDataURL;
  }
  openSwitchToBusinessDialog() {
    this._dialog.open(SwitchToBusinessComponent);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const {
        firstName,
        lastName,
        phone,
        email,
        companyName,
        companyPhone,
        companyBusinessRegis,
        companyTaxCode,
      } = this.formGroup.value;
      const business = this._loginService.snapshot?.userNode?.business;
      const isBusiness = business.length > 0;
      if (this.userInfo.loginMethod === 'SYSTEM') {
        this._profileService.editProfile(
          {
            input: {
              avatar: this.icon,
              firstName,
              lastName,
              phone,
            },
            businessInput: {
              companyName,
              companyPhone,
              registerationNumber: companyBusinessRegis,
              taxCode: companyTaxCode,
            },
          },
          isBusiness
        );
      } else {
        this._profileService.editProfileByFBZalo({
          input: {
            avatar: this.icon,
            firstName,
            lastName,
            phone,
            email: email?.toLowerCase(),
          },
        });
      }
    }
  }
  private _registerUserNodeData() {
    const { userNode } = this._loginService.snapshot;
    this.userInfo = userNode;
    const business = userNode.business;
    this.iconUrl = this.userInfo.avatar;

    this.formGroup.setValue({
      firstName: userNode.firstName,
      lastName: userNode.lastName,
      email: userNode.email,
      phone: userNode.phone,
      companyName: business?.length > 0 ? business[0].companyName : '',
      companyPhone: business?.length > 0 ? business[0].companyPhone : '',
      companyBusinessRegis:
        business?.length > 0 ? business[0].registerationNumber : '',
      companyTaxCode: business?.length > 0 ? business[0].taxCode : '',
    });
  }

  getErrorMessage(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessage(field, formField);
  }

  getErrorMessageLogin(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessageLogin(field, formField);
  }

  getErrorMessageForgotPassword(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessageForgotPassword(field, formField);
  }

  private _registerEditProfile() {
    this._subSink.sink = this._profileService.onEditProfile().subscribe(() => {
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

  private _registerEditProfileSuccessful() {
    this._subSink.sink = this._profileService
      .onEditProfileSuccessful()
      .subscribe(() => {
        this._loadingController.dismiss();
        this._translate.get('MESSAGE.OTHER.edit_profile').subscribe((data) => {
          this._notify.openSnackBar(data);
        });
      });
  }

  private _registerEditProfileFailed() {
    this._subSink.sink = this._profileService
      .onEditProfileFailed()
      .subscribe(() => {
        this._loadingController.dismiss();
        this._translate
          .get('MESSAGE.OTHER.edit_profile_failed')
          .subscribe((data) => {
            this._notify.openSnackBar(data, 'error');
          });
      });
  }
}
