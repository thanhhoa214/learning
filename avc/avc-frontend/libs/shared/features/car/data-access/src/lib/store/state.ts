import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import {
  LoadApprovedCars,
  LoadUnapprovedCars,
  LoadCarById,
  UpdateCar,
  ToggleActivation,
  ToggleApprove,
  LoadDefaultConfig,
  UpdateDefaultConfig
} from './actions';
import { CarsService } from '@shared/api';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { LoginState } from '@shared/auth/login/data-access';
import { ClearDefaultConfig } from './actions';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class CarState {
  @Selector()
  static approvedCars({ approvedListing }: StateModel) {
    return approvedListing;
  }
  @Selector()
  static unapprovedCars({ unapprovedListing }: StateModel) {
    return unapprovedListing;
  }
  @Selector()
  static selectedCar({ detail }: StateModel) {
    return detail;
  }
  @Selector()
  static defaultConfig({ defaultConfig }: StateModel) {
    return defaultConfig;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private carsService: CarsService, private store: Store) {}

  @Action(LoadApprovedCars, { cancelUncompleted: true })
  loadApprovedCars({ patchState }: StateContext<StateModel>, { params }: LoadApprovedCars) {
    const isAdmin = this.store.selectSnapshot(LoginState.account)?.role === 'Admin';
    const isAvailable = isAdmin ? params.isAvailable : true;
    return this.carsService
      .apiCarsGet({ ...params, isApproved: true, isAvailable })
      .pipe(tap((listing) => patchState({ approvedListing: listing })));
  }

  @Action(LoadUnapprovedCars, { cancelUncompleted: true }) loadUnapprovedCars(
    { patchState }: StateContext<StateModel>,
    { params }: LoadUnapprovedCars
  ) {
    const isAdmin = this.store.selectSnapshot(LoginState.account)?.role === 'Admin';
    if (!isAdmin) return;
    return this.carsService
      .apiCarsGet({ ...params, isApproved: null as never })
      .pipe(tap((listing) => patchState({ unapprovedListing: listing })));
  }

  @Action(LoadCarById, { cancelUncompleted: true }) loadCarById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadCarById
  ) {
    return this.carsService.apiCarsIdGet(params).pipe(tap((detail) => patchState({ detail })));
  }

  @Action(UpdateCar, { cancelUncompleted: true })
  updateCarManagedBy({ patchState }: StateContext<StateModel>, { params }: UpdateCar) {
    const isAdmin = this.store.selectSnapshot(LoginState.account)?.role === 'Admin';
    const updates = [
      isAdmin && params.managedBy
        ? this.carsService.apiCarsManagedbyPut(params.managedBy)
        : undefined,
      params.assignedTo ? this.carsService.apiCarsIdAssignPut(params.assignedTo) : undefined,
      isAdmin && params.name ? this.carsService.apiCarsIdPut(params.name) : undefined,
      isAdmin && params.image && typeof params.image.imageFile !== 'string'
        ? this.carsService.apiCarsIdImagePut(params.image)
        : undefined,
      isAdmin && params.config
        ? this.carsService.apiCarsIdConfigurationPut(params.config)
        : undefined
    ];
    const forkJoin$ = forkJoin(updates.filter((item) => !!item));
    return forkJoin$.pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] UpdateCar failed with error: `, error);
        const errorMessage = 'Update car failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(ToggleActivation, { cancelUncompleted: true })
  toggleActivation({ patchState, getState }: StateContext<StateModel>) {
    const { detail } = getState();
    const currentValue = detail?.isAvailable;
    // Fake update immediately
    patchState({
      detail: {
        ...detail,
        isAvailable: !currentValue
      }
    });
    return this.carsService
      .apiCarsIdActivationPut({
        id: detail?.id || 0,
        carActivationDto: { isAvailable: !currentValue || false }
      })
      .pipe(
        catchError((error) => {
          // console.warn(`[${STATE_NAME}] ${ToggleActivation.name} failed with error: `, error);
          const errorMessage = `${
            currentValue ? 'Deactivate' : 'Activate'
          } failed. Sorry, please try again later.`;
          patchState({
            detail: {
              ...detail,
              isAvailable: currentValue
            },
            errorMessage
          });
          return throwError(errorMessage);
        })
      );
  }

  @Action(ToggleApprove, { cancelUncompleted: true })
  toggleApprove({ patchState }: StateContext<StateModel>, { params }: ToggleApprove) {
    return this.carsService.apiCarsIdApprovementPut(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] ${ToggleApprove.name} failed with error: `, error);
        const errorMessage = `Processing failed. Sorry, please try again later.`;
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(LoadDefaultConfig, { cancelUncompleted: true })
  LoadDefaultConfig({ patchState }: StateContext<StateModel>) {
    return this.carsService
      .apiCarsDefaultconfigGet()
      .pipe(tap((defaultConfig) => patchState({ defaultConfig })));
  }

  @Action(UpdateDefaultConfig, { cancelUncompleted: true })
  UpdateDefaultConfig({ patchState }: StateContext<StateModel>, { params }: UpdateDefaultConfig) {
    return this.carsService.apiCarsDefaultconfigPut(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] ${UpdateDefaultConfig.name} failed with error: `, error);
        const errorMessage = `Processing failed. Sorry, please try again later.`;
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(ClearDefaultConfig, { cancelUncompleted: true })
  ClearDefaultConfig({ patchState }: StateContext<StateModel>) {
    patchState({ defaultConfig: undefined });
  }
}
