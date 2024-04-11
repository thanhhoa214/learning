import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginState } from '../../login/store';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class IsBusiness implements CanActivate {
  constructor(private router: Router, private _store: Store) {}

  async canActivate() {
    const userNode = this._store.selectSnapshot(LoginState.getUserNode);
    const isBusiness = userNode?.userType.includes('business');
    if (!isBusiness) {
      this.router.navigateByUrl('/');
    }
    return isBusiness;
  }
}
