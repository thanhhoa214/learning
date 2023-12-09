import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { RxState } from '@rx-angular/state';
import { RoleReadDto, AccountManagerDetailReadDto } from '@shared/api';
import { LoginState } from '@shared/auth/login/data-access';
import {
  LoadCarById,
  CarState,
  UpdateCar,
  LoadApprovedCars
} from '@shared/features/car/data-access';
import {
  hasValue,
  ShowNotification,
  Empty,
  CanShowUnsavedDialog,
  getPageIndex
} from '@shared/util';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiNotification } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { LoadManagers, ManagerState } from '@shared/features/manager/data-access';
import {
  distinctUntilChanged,
  filter,
  map,
  skip,
  withLatestFrom,
  shareReplay
} from 'rxjs/operators';
import { MAXIMUM_IMAGE_SIZE } from '@admin/train-model/train-by-images/data-access';
import { TuiMarkerIconMode } from '@taiga-ui/kit';
import { LoadStaffs, StaffState } from '@shared/features/staff/data-access';

@Component({
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UpdatePage implements CanShowUnsavedDialog {
  readonly MAXIMUM_IMAGE_SIZE = MAXIMUM_IMAGE_SIZE;
  readonly MARKER_LINK = TuiMarkerIconMode.Link as const;
  willShowUnsavedDialog = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    managedBy: [null],
    assignedTo: [null],
    imageFile: [null],
    configFile: [null]
  });

  car$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  roles$ = this.store.select(LoginState.roles).pipe(hasValue());
  managers$ = this.store.select(ManagerState.managers).pipe(
    hasValue(),
    map((managers) => managers.result || [])
  );
  staffs$ = this.store.select(StaffState.staffs).pipe(
    hasValue(),
    map((staffs) => staffs.result || [])
  );
  readonly isAdmin$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Admin'),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  readonly isManager$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Manager'),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /* Actions */
  clickUpdate$ = new Subject<void>();
  clickDiscard$ = new Subject<void>();
  clickChangeAvatar$ = new Subject<Event | null>();

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.declareUpdateSideEffects();
  }

  @tuiPure
  stringifyRoles(roles: Array<RoleReadDto>): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(roles.map(({ id, name }) => [id, name] as [number, string]));
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  @tuiPure
  stringifyManagers(
    managers: Array<AccountManagerDetailReadDto>
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      managers.map(
        ({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`] as [number, string]
      )
    );
    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  private declareUpdateSideEffects() {
    this.state.hold(this.isAdmin$.pipe(filter((isAdmin) => isAdmin)), () => {
      this.store.dispatch(new LoadManagers({ isAvailable: true, limit: 50 }));
    });
    this.state.hold(this.isManager$.pipe(filter((isManager) => isManager)), () =>
      this.store.dispatch(new LoadStaffs({ limit: 50 }))
    );
    const id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    this.state.hold(id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(this.car$, ({ name, managedBy, assignTo, configUrl, image }) =>
      this.form.patchValue({
        managedBy: managedBy?.id,
        name,
        imageFile: image,
        assignedTo: assignTo?.id,
        configFile: configUrl
      })
    );

    this.clickUpdateEffects();
    this.clickDiscardEffects();
    this.updateErrorEffects();
    this.updateSuccessEffects();
    this.handleUnsavedChangedDialogEffects();
    this.clickChangeAvatarEffect();
  }

  private handleUnsavedChangedDialogEffects() {
    const formHasChanged$ = this.form.valueChanges.pipe(
      skip(1),
      map(() => this.willShowUnsavedDialog),
      distinctUntilChanged()
    );
    this.state.hold(formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }

  private updateSuccessEffects() {
    const whenUpdateSuccess$ = this.actions
      .pipe<UpdateCar>(ofActionSuccessful(UpdateCar))
      .pipe(withLatestFrom(this.car$, this.store.select(CarState.approvedCars)));
    this.state.hold(whenUpdateSuccess$, ([, car, cars]) => {
      this.willShowUnsavedDialog = false;
      this.store.dispatch([
        new ShowNotification({
          message: `${car.name ?? ''} has been updated successfully.`,
          options: { label: 'Update Car', status: TuiNotification.Success, hasIcon: true }
        })
      ]);
      if (!cars) return;
      const { previousPage, nextPage } = cars;
      let currentPage = 1;
      if (previousPage) currentPage = getPageIndex(previousPage) + 1;
      else if (nextPage) currentPage = getPageIndex(nextPage) - 1;
      this.store.dispatch(new LoadApprovedCars({ limit: 10, page: currentPage }));
      this.router.navigateByUrl('/car');
    });
  }

  private updateErrorEffects() {
    const errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
    const messagesWhenFailed$ = this.actions
      .pipe<UpdateCar>(ofActionErrored(UpdateCar))
      .pipe(withLatestFrom(errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Update Car', status: TuiNotification.Error }
        })
      );
    });
  }

  private clickUpdateEffects() {
    const whenUpdateValid$ = this.clickUpdate$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value),
      withLatestFrom(this.car$)
    );
    this.state.hold(whenUpdateValid$, ([form, carInStore]) => {
      const { managedBy, name, assignedTo, imageFile, configFile } = form;
      const { id } = carInStore;
      if (!id) return;
      this.store.dispatch(
        new UpdateCar({
          managedBy: { carManagedByUpdateDto: { carId: id, managerId: managedBy } },
          name: name ? { id, carUpdateDto: { name } } : undefined,
          assignedTo: assignedTo ? { id, staffId: assignedTo } : undefined,
          image: imageFile ? { id, imageFile } : undefined,
          config: configFile ? { id, configFile } : undefined
        })
      );
    });
  }
  private clickDiscardEffects() {
    this.state.hold(this.clickDiscard$, () => {
      this.willShowUnsavedDialog = false;
      const detailPageRoute = this.router.url.replace('update/', '');
      this.router.navigateByUrl(detailPageRoute);
    });
  }

  private clickChangeAvatarEffect() {
    this.state.hold(
      this.clickChangeAvatar$.pipe(
        filter((event) => !!(event?.target as HTMLInputElement)?.files?.length),
        map((event) => (event?.target as HTMLInputElement).files)
      ),
      (files) => this.form.patchValue({ imageFile: files && files[0] })
    );
  }
}
