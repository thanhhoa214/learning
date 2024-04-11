import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { LoginState } from '../../../auth/login/store';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private _store: Store) {}

  async canActivate() {
    return this.isLogined();
  }

  async canActivateChild() {
    return this.isLogined();
  }

  isLogined() {
    const isLogined = !!this._store.selectSnapshot(LoginState.getToken);
    if (!isLogined) {
      this.router.navigateByUrl('/auth');
    }
    return isLogined;
  }
}
