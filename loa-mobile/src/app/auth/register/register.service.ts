import { Injectable } from '@angular/core';
import { RegisterCustomerInput } from '@loa-shared/models/graphql.model';
import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';
import {
  Register,
  RegisterFailed,
  RegisterState,
  RegisterSuccessful,
} from './store';

@Injectable()
export class RegisterService {
  constructor(private _store: Store, private _actions: Actions) {}

  getLoginInput() {
    return this._store.selectSnapshot(RegisterState.getLoginInput);
  }

  onRegisterFailed() {
    return this._actions.pipe(ofActionSuccessful(RegisterFailed));
  }
  onRegister() {
    return this._actions.pipe(ofActionDispatched(Register));
  }
  onRegisterSuccessful() {
    return this._actions.pipe(ofActionSuccessful(RegisterSuccessful));
  }

  register(input: RegisterCustomerInput) {
    this._store.dispatch(new Register(input));
  }
}
