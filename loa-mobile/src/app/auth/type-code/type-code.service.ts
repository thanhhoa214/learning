import { Injectable } from '@angular/core';
import { ConfirmForgotPasswordInput } from '@loa-shared/models/graphql.model';

import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';

import {
  TypeCodeFPFailed,
  TypeCodeFPSuccessful,
  TypeCodeFP,
  CodeState,
} from './store';

@Injectable()
export class TypeCodeService {
  constructor(private _store: Store, private _actions: Actions) {}

  typeCodeFP(input: ConfirmForgotPasswordInput) {
    this._store.dispatch(new TypeCodeFP(input));
  }

  onTypeCodeFP() {
    return this._actions.pipe(ofActionDispatched(TypeCodeFP));
  }

  onTypeCodeFPSuccessful() {
    return this._actions.pipe(ofActionSuccessful(TypeCodeFPSuccessful));
  }

  onTypeCodeFPFailed() {
    return this._actions.pipe(ofActionSuccessful(TypeCodeFPFailed));
  }

  getChangePasswordToken(): string {
    return this._store.selectSnapshot(CodeState.getChangePasswordToken);
  }
}
