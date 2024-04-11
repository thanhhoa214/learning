import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { initialState, RegisterStateModel } from './register-state.model';
import { AuthService } from '../../../auth/auth.service';
import {
  Register,
  RegisterFailed,
  RegisterSuccessful,
} from './register.actions';
import {
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';

@State<RegisterStateModel>({
  name: 'register',
  defaults: initialState,
})
@Injectable()
export class RegisterState {
  @Selector()
  static getError({
    errors,
  }: RegisterStateModel): CustomizeMutationErrorType[] {
    return errors;
  }

  @Selector()
  static getLoginInput({ autologinInfo }: RegisterStateModel): LoginInput {
    return autologinInfo;
  }

  constructor(private _apiService: AuthService) {}

  @Action(Register, { cancelUncompleted: true })
  register(context: StateContext<RegisterStateModel>, { payload }: Register) {
    return this._apiService.register(payload).pipe(
      tap(({ data }) => {
        const { status, errors } = data.authRegisterCustomer;

        if (!status) return context.dispatch(new RegisterFailed({ errors }));
        return context.dispatch(
          new RegisterSuccessful({
            email: payload.email,
            password: payload.password,
          })
        );
      })
    );
  }

  @Action(RegisterFailed)
  registerFailed(
    { patchState }: StateContext<RegisterStateModel>,
    { payload }: RegisterFailed
  ): void {
    patchState({
      success: false,
      ...payload,
    });
  }

  @Action(RegisterSuccessful)
  registerSuccessful(
    { patchState }: StateContext<RegisterStateModel>,
    { payload }: RegisterSuccessful
  ): void {
    patchState({
      success: true,
      autologinInfo: payload,
    });
  }
}
