import { Injectable } from '@angular/core';
import { ForgotPasswordInput } from '@loa-shared/models/graphql.model';

import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';

import {
  GetCodeFailed,
  GetCodeSuccessful,
  GetCode,
  ForgotState,
} from './store';

@Injectable()
export class ForgotPasswordService {
  constructor(private _store: Store, private _actions: Actions) {}

  getCode(input: ForgotPasswordInput) {
    this._store.dispatch(new GetCode(input));
  }

  getEmail(): string {
    return this._store.selectSnapshot(ForgotState.getEmail);
  }

  onGetCode() {
    return this._actions.pipe(ofActionDispatched(GetCode));
  }

  onGetCodeSuccessful() {
    return this._actions.pipe(ofActionSuccessful(GetCodeSuccessful));
  }

  onGetCodeFailed() {
    return this._actions.pipe(ofActionSuccessful(GetCodeFailed));
  }
}
