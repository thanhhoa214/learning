import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthStateModel, initialState } from './auth-state.model';
import { Logout } from './auth.actions';
import { LoginState } from '../../auth/login/store';

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialState,
  children: [LoginState],
})
@Injectable()
export class AuthState {
  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    localStorage.clear();
    setState(initialState);
  }
}
