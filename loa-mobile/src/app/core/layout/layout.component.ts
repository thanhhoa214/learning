import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { Logout } from '@loa-mobile/auth/store';
import { SubSinkable } from '@loa-shared/models';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { BottomBarVisibilityService } from '@loa-shared/services/bottom-bar-visibility.service';
@Component({
  selector: 'loa-mobile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends SubSinkable implements ViewWillEnter {
  guest = true;
  navLinks: any[];

  constructor(
    public bottomBarVisibility: BottomBarVisibilityService,
    private _actions: Actions,
    private _loginService: LoginService
  ) {
    super();
    this.navLinks = [
      {
        label: 'CORE.home',
        link: 'home',
        icon: 'loa-home',
      },
      {
        label: 'CORE.design',
        link: 'design',
        icon: 'loa-design',
      },
      {
        label: 'CORE.constructor',
        link: 'construction',
        icon: 'loa-constructor',
      },
      {
        label: 'CORE.my_page',
        link: 'menu',
        icon: 'loa-my-page',
      },
    ];
  }

  ionViewWillEnter(): void {
    this._subSink.sink = this._actions
      .pipe(ofActionSuccessful(Logout))
      .subscribe(() => {
        this.guest = !!this._loginService.snapshot?.userNode;
      });

    this.guest = !!this._loginService.snapshot?.userNode;
  }
}
