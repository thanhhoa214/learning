import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DesignPartnerFormComponent } from '@loa-mobile/design/shared/components/atoms/design-partner-form/design-partner-form.component';
import { Capacitor, PluginListenerHandle, Plugins } from '@capacitor/core';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BranchDeepLinksWeb, BranchShortUrlParams } from 'capacitor-branch-deep-links';
import { getAdminPageUrl } from '@loa-mobile/auth/register-business-success/register-business-success.component';
import { Router } from '@angular/router';
const { BranchDeepLinks, Browser } = Plugins;

@Component({
  selector: 'home-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerComponent implements OnInit, OnDestroy {
  userTypes$: Observable<string[]>;

  private _pluginListenerHandler: PluginListenerHandle;

  constructor(
    private _dialog: MatDialog,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnDestroy() {
    this._pluginListenerHandler?.remove();
  }

  ngOnInit() {
    this.userTypes$ = this._loginService.userNode$.pipe(map((userNode) => userNode?.userType));
  }

  async openAdminSite() {
    if (Capacitor.isNative) {
      const params: BranchShortUrlParams = {
        analytics: null,
        properties: {
          custom_string: '/auth/register-business-success'
        }
      };
      const { url } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(params);
      const dataLogin = encodeURIComponent(localStorage.getItem('auth'));
      const registeredConstructionUrl = getAdminPageUrl(dataLogin, 'auth/login', url);
      await Browser.open({ url: registeredConstructionUrl });
      this._pluginListenerHandler = Browser.addListener('browserFinished', () => {
        this._router.navigateByUrl('/auth/register-business-success');
      });
    }
  }

  openDesignPartnerPopup() {
    this._dialog.open(DesignPartnerFormComponent);
  }
}
