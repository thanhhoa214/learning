import { Injectable } from '@angular/core';

import {
  ActionCompletion,
  Actions,
  ofActionCompleted,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';
import { merge } from 'rxjs';
import { UpdateProfileAndBusinessInfoMutationVariables } from '../shared/services/update-profile-and-business-info.mutation.g';
import { UpdateProfileWithFbAndZaloMutationVariables } from '../shared/services/update-profile-fb-zalo.mutation.g';
import {
  EditProfile,
  EditProfileByFBZalo,
  EditProfileFailed,
  EditProfileSuccessful,
  LoadProfile,
} from './store';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  onLoadProfileCompleted$: Observable<ActionCompletion>;
  constructor(private _store: Store, private _actions: Actions) {
    this.onLoadProfileCompleted$ = this._actions.pipe(
      ofActionCompleted(LoadProfile)
    );
  }

  loadProfile() {
    this._store.dispatch(new LoadProfile());
  }
  editProfile(
    profileInput: UpdateProfileAndBusinessInfoMutationVariables,
    isBusiness: boolean
  ) {
    this._store.dispatch(new EditProfile({ input: profileInput, isBusiness }));
  }
  editProfileByFBZalo(
    profileInput: UpdateProfileWithFbAndZaloMutationVariables
  ) {
    console.log('ProfileService-editProfileByFBZalo', profileInput);

    this._store.dispatch(new EditProfileByFBZalo(profileInput));
  }

  onEditProfile() {
    return merge(
      this._actions.pipe(ofActionDispatched(EditProfile)),
      this._actions.pipe(ofActionDispatched(EditProfileByFBZalo))
    );
  }

  onEditProfileSuccessful() {
    return this._actions.pipe(ofActionSuccessful(EditProfileSuccessful));
  }

  onEditProfileFailed() {
    return this._actions.pipe(ofActionSuccessful(EditProfileFailed));
  }
}
