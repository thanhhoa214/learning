import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  initialState,
  ChangePasswordStateModel,
} from './change-password-state.model';
import { AuthService } from '../../../auth/auth.service';
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccessful,
} from './change-password.actions';
import { Login } from '../../login/store';
import { ForgotState } from '../../forgot-password/store';
@State<ChangePasswordStateModel>({
  name: 'authChangePassword',
  defaults: initialState,
})
@Injectable()
export class ChangePasswordState {
  @Selector()
  static getNewPassword({ newPassword }: ChangePasswordStateModel): string {
    return newPassword;
  }

  constructor(private _apiService: AuthService, private _store: Store) {}

  @Action(ChangePassword, { cancelUncompleted: true })
  changePassword(
    context: StateContext<ChangePasswordStateModel>,
    { payload }: ChangePassword
  ) {
    return this._apiService.resetPassword(payload).pipe(
      tap(({ data }) => {
        const { errors } = data.userResetPassword;

        if (errors)
          return context.dispatch(new ChangePasswordFailed({ errors }));

        return context.dispatch(
          new ChangePasswordSuccessful({ newPassword: payload.password })
        );
      })
    );
  }

  @Action(ChangePasswordSuccessful)
  changePasswordSuccessful(
    { patchState, dispatch }: StateContext<ChangePasswordStateModel>,
    { payload }: ChangePasswordSuccessful
  ) {
    patchState({
      success: true,
      newPassword: payload.newPassword,
    });
    const email = this._store.selectSnapshot(ForgotState.getEmail);
    return dispatch(
      new Login({
        loginInput: {
          email,
          password: payload.newPassword,
        },
        isBusiness: undefined,
      })
    );
  }

  @Action(ChangePasswordFailed)
  changePasswordFailed(
    { patchState }: StateContext<ChangePasswordStateModel>,
    { payload }: ChangePasswordFailed
  ): void {
    patchState({
      success: false,
      errors: payload.errors,
    });
  }
}
