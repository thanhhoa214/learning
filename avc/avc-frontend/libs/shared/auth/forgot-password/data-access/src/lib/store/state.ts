import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { STATE_NAME, INITIAL_STATE, StateModel } from './state.model';
import { SendRecoveryLink } from './actions';
import { AuthenticationService } from '@shared/api';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@State<StateModel>({ name: STATE_NAME, defaults: INITIAL_STATE })
@Injectable()
export class ForgotPasswordState {
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }
  @Selector()
  static email({ email }: StateModel) {
    return email;
  }

  constructor(private authService: AuthenticationService) {}

  @Action(SendRecoveryLink)
  sendRecoveryLink({ patchState }: StateContext<StateModel>, { params }: SendRecoveryLink) {
    return this.authService.apiAuthenticationResetPost(params).pipe(
      tap(() => patchState({ email: params.email })),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] Forgot Password with error: `, error);
        const errorMessage = 'Send recovery link failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
