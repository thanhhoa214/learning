import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ForgotStateModel, initialState } from './forgot-state.model';
import { AuthService } from '../../../auth/auth.service';
import { GetCode, GetCodeFailed } from './forgot.actions';
import { GetCodeSuccessful } from './forgot.actions';

@State<ForgotStateModel>({
  name: 'forgot',
  defaults: initialState,
})
@Injectable()
export class ForgotState {
  @Selector()
  static getEmail({ email }: ForgotStateModel): string {
    return email;
  }

  constructor(private _apiService: AuthService) {}

  @Action(GetCode, { cancelUncompleted: true })
  getCode(context: StateContext<ForgotStateModel>, { payload }: GetCode) {
    return this._apiService.forgotPassword(payload).pipe(
      tap(({ data }) => {
        const { errors } = data.authForgotPassword;

        if (errors) return context.dispatch(new GetCodeFailed({ errors }));
        return context.dispatch(
          new GetCodeSuccessful({ email: payload.email })
        );
      })
    );
  }

  @Action(GetCodeSuccessful)
  getCodeSuccessful(
    { patchState }: StateContext<ForgotStateModel>,
    { payload }: GetCodeSuccessful
  ): void {
    patchState({
      success: true,
      email: payload.email,
    });
  }

  @Action(GetCodeFailed)
  getCodeFailed(
    { patchState }: StateContext<ForgotStateModel>,
    { payload }: GetCodeFailed
  ): void {
    patchState({
      success: false,
      errors: payload.errors,
    });
  }
}
