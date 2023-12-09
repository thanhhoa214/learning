import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { LoadManagers, LoadManagerById, CreateManager, UpdateManager } from './actions';
import { AccountsService } from '@shared/api';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToggleActivation } from '@shared/features/account/data-access';
import { throwError } from 'rxjs';
import { update } from '@rx-angular/state';
import { HttpErrorResponse } from '@angular/common/http';
@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class ManagerState {
  @Selector()
  static managers({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedManager({ detail }: StateModel) {
    return detail;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private accountsService: AccountsService) {}

  @Action(LoadManagers, { cancelUncompleted: true }) loadManagers(
    { patchState }: StateContext<StateModel>,
    { params }: LoadManagers
  ) {
    return this.accountsService
      .apiAccountsManagersGet(params)
      .pipe(tap((listing) => patchState({ listing })));
  }
  @Action(LoadManagerById, { cancelUncompleted: true }) loadManagerById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadManagerById
  ) {
    return this.accountsService
      .apiAccountsManagerIdGet(params)
      .pipe(tap((detail) => patchState({ detail })));
  }
  @Action(ToggleActivation)
  activate({ getState, patchState }: StateContext<StateModel>, { payload }: ToggleActivation) {
    const { id, currentValue } = payload;
    const setNewStateWith = (isAvailable: boolean) => {
      const { listing, detail } = getState();
      let newState = getState();
      if (listing?.result) {
        const willUpdateManager = listing.result.find((manager) => manager.id === id);
        const updatedManager = { ...willUpdateManager, isAvailable };
        if (willUpdateManager) {
          const newResult = update(listing.result, updatedManager, 'id');
          newState = { ...newState, listing: { ...listing, result: newResult } };
        }
      }
      if (detail) {
        const selectedId = detail?.id;
        if (selectedId === id) {
          newState = { ...newState, detail: { ...detail, isAvailable } };
        }
      }
      patchState(newState);
    };
    setNewStateWith(!currentValue);
    return this.accountsService
      .apiAccountsIdActivationPut({ id, accountActivationDto: { isAvailable: !currentValue } })
      .pipe(
        tap(() => setNewStateWith(!currentValue)),
        catchError((error) => {
          console.warn(
            `[${STATE_NAME}] ToggleActivation Error when currentValue = ${currentValue}, error = ${error}`
          );
          setNewStateWith(currentValue);
          const errorMessage = `${
            currentValue ? 'Deactivate' : 'Activate'
          } has been errorred. Sorry, please try again later.`;
          patchState({ errorMessage });
          return throwError(errorMessage);
        })
      );
  }

  @Action(CreateManager)
  createManager({ getState, patchState }: StateContext<StateModel>, { params }: CreateManager) {
    const { create } = getState();
    return this.accountsService.apiAccountsManagerPost(params).pipe(
      tap(() => patchState({ create })),
      catchError((error: HttpErrorResponse) => {
        // console.warn(`[${STATE_NAME}] CreateManager failed with error: `, error);
        let errorMessage = 'Create manager failed. Sorry, please try again later.';
        if (error.status === 409) {
          errorMessage = 'Email has already existed. Sorry, please enter another one.';
        }
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(UpdateManager)
  updateManager({ patchState }: StateContext<StateModel>, { params }: UpdateManager) {
    return this.accountsService.apiAccountsIdPatch(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] UpdateManager failed with error: `, error);
        const errorMessage = 'Update manager failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
