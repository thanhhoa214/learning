import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginState } from '../../../auth/login/store';

@Injectable({ providedIn: 'root' })
export class IsNotLoggedInGuard implements CanActivate {
  constructor(private router: Router, private _store: Store) {}

  async canActivate(): Promise<boolean> {
    const isNotLogined = !this._store.selectSnapshot(LoginState.getToken);
    if (!isNotLogined) {
      this.router.navigateByUrl('/');
    }
    return isNotLogined;
  }
}
