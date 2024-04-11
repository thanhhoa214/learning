import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { DesignPartnerFormComponent } from '@loa-mobile/design/shared/components/atoms/design-partner-form/design-partner-form.component';
import { SubSinkable } from '@loa-shared/models';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../login/services/login.service';
import { ProfileService } from '../profile/profile.service';
import { BranchDeepLinksWeb, BranchShortUrlParams } from 'capacitor-branch-deep-links';
import { Capacitor, PluginListenerHandle, Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from '@loa-shared/services/notification.service';

const { BranchDeepLinks, App, Clipboard } = Plugins;
export const getAdminPageUrl = (auth: string, route: string, redirectUrl: string) =>
  `${environment.API_URL}/admin/${route}?auth=${auth}&fromMobile=true&redirectUrl=${redirectUrl}`;

@Component({
  templateUrl: './register-business-success.component.html',
  styleUrls: ['./register-business-success.component.scss']
})
export class RegisterBusinessSuccessComponent extends SubSinkable implements ViewWillEnter {
  adminUrl = environment.API_URL;
  dataLogin: string;
  fromRegister = false;
  isConstructionCompany = false;
  registeredConstructionUrl: string;
  uploadPortfolioConstructionUrl: string;

  private appStateChangedHandler: PluginListenerHandle;

  constructor(
    private _loginService: LoginService,
    private _profileService: ProfileService,
    private _dialog: MatDialog,
    private _loadingCtrl: LoadingController,
    private _router: Router,
    private _translate: TranslateService,
    private _activatedRoute: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    private _notificationService: NotificationService,
    titleService: Title
  ) {
    super();
    this._translate.get('TITLES.register_business_success').subscribe((title) => {
      titleService.setTitle(`${title} | Interior Design`);
    });
  }

  async copyLink() {
    await Clipboard.write({ url: this.adminUrl });
    const message = await this._translate.get('HOME.DESIGN_PARTNER_FORM.url_copied').toPromise();
    this._notificationService.openSnackBar(message, 'success');
  }

  ionViewWillEnter(): void {
    this.appStateChangedHandler = App.addListener('appStateChange', () => {
      this._profileService.loadProfile();
      setTimeout(() => {
        this.fromRegister = true;
        this._cdRef.detectChanges();
      }, 1000);
    });
    this._translate
      .get('CORE.please_wait')
      .toPromise()
      .then((message: string) =>
        this._loadingCtrl.create({
          message,
          duration: 10000
        })
      )
      .then((spinner) => spinner.present());
    this._registerLoadProfileSuccessful();
    this._registerLoginSuccessful();
    this._setRegisteredConstructionUrl();
    this._setUploadPortfolioConstructionUrl();
    this._profileService.loadProfile();
  }

  ionViewWillLeave() {
    super.ionViewWillLeave();
    this.appStateChangedHandler.remove();
  }

  openDesignPartnerPopup() {
    this._dialog.open(DesignPartnerFormComponent);
  }

  private _registerLoadProfileSuccessful() {
    this._subSink.sink = this._profileService.onLoadProfileCompleted$.subscribe(() => {
      this._loadingCtrl.dismiss();
      this.dataLogin = encodeURIComponent(localStorage.getItem('auth'));
      this.isConstructionCompany = this._loginService.snapshot?.userNode.userType.includes(
        'constructor'
      );
      this.fromRegister = !!this._activatedRoute.snapshot.queryParamMap.get('fromRegister');
    });
  }

  private _registerLoginSuccessful() {
    this._subSink.sink = this._loginService.onLoginSuccessful().subscribe(() => {
      this._loadingCtrl.dismiss();
      this._router.navigateByUrl('/');
    });
  }

  private async _setRegisteredConstructionUrl() {
    if (Capacitor.isNative) {
      const params: BranchShortUrlParams = {
        analytics: null,
        properties: {
          custom_string: '/auth/register-business-success'
        }
      };
      const { url } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(params);
      const dataLogin = encodeURIComponent(localStorage.getItem('auth'));
      this.registeredConstructionUrl = getAdminPageUrl(dataLogin, 'auth/login', url);
    }
  }

  private async _setUploadPortfolioConstructionUrl() {
    if (Capacitor.isNative) {
      const { id } = this._loginService.snapshot.userNode;

      const params: BranchShortUrlParams = {
        analytics: null,
        properties: {
          custom_string: `/construction/${id}`
        }
      };
      const { url } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(params);

      const dataLogin = encodeURIComponent(localStorage.getItem('auth'));

      this.uploadPortfolioConstructionUrl = getAdminPageUrl(
        dataLogin,
        'create-portfolio-first',
        url
      );
    }
  }
}
