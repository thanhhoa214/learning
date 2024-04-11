import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import {
  ChangeOldPassword,
  ChangeOldPasswordFailed,
  ChangeOldPasswordSuccessful,
} from './change-old-password.actions';

@State<Record<string, never>>({
  name: 'authChangeOldPassword',
  defaults: {},
})
@Injectable()
export class ChangeOldPasswordState {
  constructor(private _authService: AuthService) {}

  @Action(ChangeOldPassword, { cancelUncompleted: true })
  changePassword(
    { dispatch }: StateContext<Record<string, never>>,
    { payload }: ChangeOldPassword
  ) {
    return this._authService.changePassword(payload).pipe(
      tap(({ data }) => {
        const { errors } = data.userChangePassword;
        if (errors?.length > 0) {
          return dispatch(new ChangeOldPasswordFailed());
        }
        return dispatch(new ChangeOldPasswordSuccessful());
      })
    );
  }
}
