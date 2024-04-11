import { Location } from '@angular/common';
import { Component, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BranchInitEvent } from 'capacitor-branch-deep-links';
import { switchMapTo } from 'rxjs/operators';

import { CoreService } from './core/services/core.service';
import { NotificationService } from './shared/services/notification.service';

const { SplashScreen, Keyboard, BranchDeepLinks } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  date = new Date().getTime() - 1000000;

  constructor(
    private _platform: Platform,
    private _translate: TranslateService,
    private _router: Router,
    private _coreService: CoreService,
    private _notify: NotificationService,
    private _location: Location,
    private _ngZone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      if (Capacitor.isNative) {
        setTimeout(() => {
          SplashScreen.hide();
        }, 2000);
        this._lockOrientation();
        this._registerKeyboardEvents();
        this._registerBranchIoDeepLink();
      }

      this._registerLoadUrlFailed();
      this._registerBackButton();
      this._coreService.loadLanguage(this._coreService.languageCode);
    });
  }

  private _lockOrientation() {
    const width = this._platform.width();
    if (width > 768) {
      window.screen.orientation.lock('landscape');
    } else {
      window.screen.orientation.lock('portrait');
    }
  }

  private _registerBackButton(): void {
    this._platform.backButton.subscribeWithPriority(20, () => {
      console.log('backButton.subscribeWithPriority runs');
      this._ngZone.run(() => {
        if (this.routerOutlet?.canGoBack()) {
          this._location.back();
        } else {
          navigator['app'].exitApp();
        }
      });
    });
  }

  private _registerBranchIoDeepLink() {
    BranchDeepLinks.disableTracking();
    BranchDeepLinks.addListener('init', (event: BranchInitEvent) => {
      if (event.referringParams['+clicked_branch_link']) {
        const fullUrl = event.referringParams['~referring_link'] as string;
        const indexOfQuestion = fullUrl.indexOf('?');
        const slug = event.referringParams['custom_string'];
        const forwaredParams = indexOfQuestion > -1 ? fullUrl.substring(indexOfQuestion) : '';
        this._ngZone.run(() => {
          this._router.navigateByUrl(slug + forwaredParams).catch(() => {
            this._coreService.dispatchLoadUrlFailed();
          });
        });
      }
    });

    BranchDeepLinks.addListener('initError', (error: any) => {
      if (error) this._coreService.dispatchLoadUrlFailed();
    });
  }

  private _registerKeyboardEvents() {
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboardWillShow');
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboardWillShow');
    });
  }

  private _registerLoadUrlFailed() {
    this._coreService
      .onLoadUrlFailed()
      .pipe(switchMapTo(this._translate.get('HOME.url_does_not_match')))
      .subscribe((message: string) => {
        this._notify.openSnackBar(message, 'error');
        this._router.navigateByUrl('/');
      });
  }
}
