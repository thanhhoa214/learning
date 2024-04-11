import { Injectable } from '@angular/core';
import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';
import { RegisterBusinessMutationVariables } from '../shared/services';
import {
  RegisterBusiness,
  RegisterBusinessFailed,
  RegisterBusinessState,
  RegisterBusinessSuccessful,
} from './store';

@Injectable()
export class RegisterBusinessService {
  constructor(private _store: Store, private _actions: Actions) {}

  getLoginInput() {
    return this._store.selectSnapshot(RegisterBusinessState.getLoginInput);
  }

  onRegisterFailed() {
    return this._actions.pipe(ofActionSuccessful(RegisterBusinessFailed));
  }
  onRegister() {
    return this._actions.pipe(ofActionDispatched(RegisterBusiness));
  }
  onRegisterSuccessful() {
    return this._actions.pipe(ofActionSuccessful(RegisterBusinessSuccessful));
  }

  register(input: RegisterBusinessMutationVariables['input']) {
    this._store.dispatch(new RegisterBusiness({ input }));
  }
}
