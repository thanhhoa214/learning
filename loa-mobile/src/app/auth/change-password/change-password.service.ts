import { Injectable } from '@angular/core';
import { ResetPasswordInput } from '@loa-shared/models/graphql.model';
import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccessful,
  ChangePasswordState,
} from './store';

@Injectable()
export class ChangePasswordService {
  constructor(private _store: Store, private _actions: Actions) {}

  changePassword(resetPasswordInput: ResetPasswordInput) {
    this._store.dispatch(new ChangePassword(resetPasswordInput));
  }

  onChangePassword() {
    return this._actions.pipe(ofActionDispatched(ChangePassword));
  }

  onChangePasswordSuccessful() {
    return this._actions.pipe(ofActionSuccessful(ChangePasswordSuccessful));
  }

  onChangePasswordFailed() {
    return this._actions.pipe(ofActionSuccessful(ChangePasswordFailed));
  }
  getNewPassword(): string {
    return this._store.selectSnapshot(ChangePasswordState.getNewPassword);
  }
}
