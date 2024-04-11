import { Injectable } from '@angular/core';
import { ChangePasswordInput } from '@loa-shared/models/graphql.model';

import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';

import {
  ChangeOldPassword,
  ChangeOldPasswordFailed,
  ChangeOldPasswordSuccessful,
} from './store';

@Injectable()
export class ChangeOldPasswordService {
  constructor(private _store: Store, private _actions: Actions) {}

  changeOldPassword(input: ChangePasswordInput) {
    this._store.dispatch(new ChangeOldPassword(input));
  }

  onChangeOldPassword() {
    return this._actions.pipe(ofActionDispatched(ChangeOldPassword));
  }

  onChangeOldPasswordSuccessful() {
    return this._actions.pipe(ofActionSuccessful(ChangeOldPasswordSuccessful));
  }

  onChangeOldPasswordFailed() {
    return this._actions.pipe(ofActionSuccessful(ChangeOldPasswordFailed));
  }
}
