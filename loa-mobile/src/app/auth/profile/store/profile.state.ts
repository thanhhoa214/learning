import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import {
  EditProfile,
  EditProfileByFBZalo,
  EditProfileFailed,
  EditProfileSuccessful,
  LoadProfile,
} from './profile.actions';
import { SetUserNode } from '../../login/store';
import { Logout } from '@loa-mobile/auth/store';
import { UpdateProfileGQL } from '@loa-mobile/auth/shared/services/update-profile.mutation.g';
import { UpdateProfileAndBusinessInfoGQL } from '@loa-mobile/auth/shared/services/update-profile-and-business-info.mutation.g';
import { UpdateProfileWithFbAndZaloGQL } from '@loa-mobile/auth/shared/services/update-profile-fb-zalo.mutation.g';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { UserLoginMethod } from '@loa-shared/models/graphql.model';
@State<Record<string, never>>({
  name: 'authProfile',
  defaults: {},
})
@Injectable()
export class ProfileState {
  constructor(
    private _loginService: LoginService,
    private _authService: AuthService,
    private _updateProfile: UpdateProfileGQL,
    private _updateProfileFBZalo: UpdateProfileWithFbAndZaloGQL,
    private _updateProfileAndBusinessInfo: UpdateProfileAndBusinessInfoGQL
  ) {}

  @Action(LoadProfile, { cancelUncompleted: true })
  loadProfile({ dispatch }: StateContext<Record<string, never>>) {
    return this._authService.getProfile().pipe(
      tap(({ data }) => {
        if (data?.userProfile) {
          dispatch(new SetUserNode({ userNode: data.userProfile }));
        } else {
          dispatch(new Logout());
        }
      })
    );
  }

  @Action(EditProfileByFBZalo, { cancelUncompleted: true })
  editProfileByFBZalo(
    context: StateContext<Record<string, never>>,
    { payload }: EditProfileByFBZalo
  ) {
    return this._updateProfileFBZalo.mutate(payload).pipe(
      tap(({ data }) => {
        const { errors, user } = data.userChangeProfileFbZalo;
        if (errors?.length > 0) {
          return context.dispatch(new EditProfileFailed());
        }
        return context.dispatch(new EditProfileSuccessful(user as any));
      })
    );
  }

  @Action(EditProfile, { cancelUncompleted: true })
  editProfile(
    context: StateContext<Record<string, never>>,
    { payload }: EditProfile
  ) {
    const userNode = this._loginService.snapshot?.userNode;
    const handleCallback = ({ data }) => {
      const { errors, user } = data.userChangeProfile;
      if (errors?.length > 0) {
        return context.dispatch(new EditProfileFailed());
      }
      return context.dispatch(new EditProfileSuccessful(user));
    };
    if (payload.isBusiness) {
      return this._updateProfileAndBusinessInfo
        .mutate(payload.input)
        .pipe(tap(handleCallback));
    }
    if (
      userNode.loginMethod === UserLoginMethod.Zalo ||
      userNode.loginMethod === UserLoginMethod.Facebook
    ) {
      return this._updateProfileFBZalo
        .mutate({ input: payload.input.input })
        .pipe(tap(handleCallback));
    }
    return this._updateProfile
      .mutate({ input: payload.input.input })
      .pipe(tap(handleCallback));
  }

  @Action(EditProfileSuccessful)
  editProfileSuccessful(
    { dispatch }: StateContext<Record<string, never>>,
    { payload }: EditProfileSuccessful
  ): void {
    dispatch(new SetUserNode({ userNode: payload }));
  }
}
