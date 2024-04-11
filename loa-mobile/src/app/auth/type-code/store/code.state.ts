import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CodeStateModel, initialState } from './code-state.model';
import { AuthService } from '../../../auth/auth.service';
import {
  TypeCodeFP,
  TypeCodeFPFailed,
  TypeCodeFPSuccessful,
} from './code.actions';

@State<CodeStateModel>({
  name: 'code',
  defaults: initialState,
})
@Injectable()
export class CodeState {
  @Selector()
  static getChangePasswordToken({ token }: CodeStateModel): string {
    return token;
  }

  constructor(private _apiService: AuthService) {}

  @Action(TypeCodeFP, { cancelUncompleted: true })
  typeCodeFP(context: StateContext<CodeStateModel>, { payload }: TypeCodeFP) {
    return this._apiService.forgotPasswordVerify(payload).pipe(
      tap(({ data }) => {
        const { errors } = data.authConfirmForgotPassword;
        if (errors) return context.dispatch(new TypeCodeFPFailed({ errors }));
        return context.dispatch(
          new TypeCodeFPSuccessful({ token: payload.code })
        );
      })
    );
  }

  @Action(TypeCodeFPSuccessful)
  typeCodeFPSuccessful(
    { patchState }: StateContext<CodeStateModel>,
    { payload }: TypeCodeFPSuccessful
  ): void {
    patchState({
      success: true,
      token: payload.token,
    });
  }

  @Action(TypeCodeFPFailed)
  typeCodeFPFailed(
    { patchState }: StateContext<CodeStateModel>,
    { payload }: TypeCodeFPFailed
  ): void {
    patchState({
      success: false,
      errors: payload.errors,
    });
  }
}
