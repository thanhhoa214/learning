import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  initialState,
  RegisterBusinessStateModel,
} from './register-business-state.model';
import {
  RegisterBusiness,
  RegisterBusinessFailed,
  RegisterBusinessSuccessful,
} from './register-business.actions';
import {
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';
import { RegisterBusinessGQL } from '@loa-mobile/auth/shared/services';

@State<RegisterBusinessStateModel>({
  name: 'registerBusiness',
  defaults: initialState,
})
@Injectable()
export class RegisterBusinessState {
  @Selector()
  static getError({
    errors,
  }: RegisterBusinessStateModel): CustomizeMutationErrorType[] {
    return errors;
  }

  @Selector()
  static getLoginInput({
    autologinInfo,
  }: RegisterBusinessStateModel): LoginInput {
    return autologinInfo;
  }

  constructor(private _apiService: RegisterBusinessGQL) {}

  @Action(RegisterBusiness, { cancelUncompleted: true })
  register(
    context: StateContext<RegisterBusinessStateModel>,
    { payload }: RegisterBusiness
  ) {
    return this._apiService.mutate(payload).pipe(
      tap(({ data }) => {
        const { status, errors } = data.authRegisterBusiness;

        if (!status)
          return context.dispatch(new RegisterBusinessFailed({ errors }));
        return context.dispatch(
          new RegisterBusinessSuccessful({
            email: payload.input.email,
            password: payload.input.password,
          })
        );
      })
    );
  }

  @Action(RegisterBusinessFailed)
  registerFailed(
    { patchState }: StateContext<RegisterBusinessStateModel>,
    { payload }: RegisterBusinessFailed
  ): void {
    patchState(payload);
  }

  @Action(RegisterBusinessSuccessful)
  registerSuccessful(
    { patchState }: StateContext<RegisterBusinessStateModel>,
    { payload }: RegisterBusinessSuccessful
  ): void {
    patchState({ autologinInfo: payload });
  }
}
