import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { CoreService } from '@loa-mobile/core/services/core.service';
import { SubSinkable } from '@loa-shared/models';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../auth/login/services/login.service';
import { ProfileService } from '../auth/profile/profile.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'loa-mobile-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends SubSinkable implements ViewWillEnter {
  languageSelect: FormControl;

  user: LoginUserNode;

  menu = [
    {
      name: 'profile',
      icon: '/assets/images/Icon-MyProfile.png',
      link: 'auth/profile',
    },
    {
      name: 'change_password',
      icon: '/assets/images/Icon-Password.png',
      link: 'auth/change-old-password',
    },
  ];

  profile = [
    {
      name: 'bookmark',
      icon: '/assets/images/Icon-Bookmark.png',
      link: 'menu/my-bookmark',
    },
    // {
    //   name: 'question_answer',
    //   icon: 'chatbubbles-outline',
    //   link: 'menu/my-question-answer',
    // },
    // {
    //   name: 'purchase_design',
    //   icon: '/assets/images/Icon-Bookmark.png',
    //   link: 'menu/my-purchase-design',
    // },
    // {
    //   name: 'request_design',
    //   icon: '/assets/images/Icon-Bookmark.png',
    //   link: 'menu/my-request-design',
    // },
    {
      name: 'interior_design',
      icon: '/assets/images/Icon-InteriorDesign.png',
      link: 'menu/my-interior-design',
    },
    {
      name: 'construction_review',
      icon: '/assets/images/Icon-Review.png',
      link: 'menu/my-construction-review',
    },
  ];

  contact = [
    // {
    //   name: 'FAQ.title',
    //   icon: '/assets/images/Icon-Help.png',
    //   link: 'menu/frequently-asked-question',
    // },
    {
      name: 'SUPPORT_CONTACT.title',
      icon: '/assets/images/Icon-Help.png',
      link: 'menu/support-contact',
    },
  ];

  constructor(
    private _router: Router,
    private _notify: NotificationService,
    private _translate: TranslateService,
    private _loginService: LoginService,
    private _profileService: ProfileService,
    private _coreService: CoreService,
    private _titleService: Title,
    private _alertCtr: AlertController
  ) {
    super();
    this.languageSelect = new FormControl();
  }

  ionViewWillEnter(): void {
    this._translate.get('TITLES.my_page').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });
    const language = this._coreService.languageCode;
    this.languageSelect.setValue(language);
    this._profileService.loadProfile();

    this._subSink.sink = this.languageSelect.valueChanges.subscribe((value) => {
      this._coreService.loadLanguage(value);
    });

    this._subSink.sink = this._loginService.onLogout().subscribe(() => {
      this._router.navigateByUrl('/auth/choose-user-type');
    });
    this._subSink.sink = this._loginService.getUserNode$().subscribe((user) => {
      this.user = user;
    });
  }

  async logout() {
    const confirmationTranslation = await this._translate
      .get('CORE.LOGOUT_CONFIRMATION')
      .toPromise();

    const alert = await this._alertCtr.create({
      header: confirmationTranslation.logout,
      message: confirmationTranslation.message,
      buttons: [
        {
          text: confirmationTranslation.cancel,
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: confirmationTranslation.logout,
          handler: () => this._loginService.logout(),
        },
      ],
    });

    await alert.present();
  }

  login() {
    this._loginService.setPreLoginUrl('/menu');
    this._router.navigateByUrl('/auth/choose-user-type');
  }

  goTo(link: string) {
    if (this.user) {
      this._router.navigateByUrl('/' + link);
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }
}
