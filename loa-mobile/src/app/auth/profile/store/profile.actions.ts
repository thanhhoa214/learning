import { UpdateProfileAndBusinessInfoMutationVariables } from '@loa-mobile/auth/shared/services/update-profile-and-business-info.mutation.g';
import { UpdateProfileWithFbAndZaloMutationVariables } from '@loa-mobile/auth/shared/services/update-profile-fb-zalo.mutation.g';
import { UserNode } from '@loa-shared/models/graphql.model';

const enum Actions {
  LOAD_PROFILE = '[Profile] Load Profile',
  EDIT_PROFILE = '[Profile] Edit Profile',
  EDIT_PROFILE_BY_FB_ZALO = '[Profile] Edit Profile by FB Zalo',
  EDIT_PROFILE_SUCCESSFUL = '[Profile] Edit Profile Successful',
  EDIT_PROFILE_FAILED = '[Profile] Edit Profile Failed',
  EDIT_BUSINESS_INFORMATION = '[Profile] Edit Business Information',
}

export class LoadProfile {
  static readonly type = Actions.LOAD_PROFILE;
  constructor(public readonly payload?: UserNode) {}
}

export class EditProfile {
  static readonly type = Actions.EDIT_PROFILE;
  constructor(
    public readonly payload: {
      input: UpdateProfileAndBusinessInfoMutationVariables;
      isBusiness: boolean;
    }
  ) {}
}

export class EditProfileByFBZalo {
  static readonly type = Actions.EDIT_PROFILE_BY_FB_ZALO;
  constructor(
    public readonly payload: UpdateProfileWithFbAndZaloMutationVariables
  ) {}
}

export class EditProfileSuccessful {
  static readonly type = Actions.EDIT_PROFILE_SUCCESSFUL;
  constructor(public readonly payload: UserNode) {}
}

export class EditProfileFailed {
  static readonly type = Actions.EDIT_PROFILE_FAILED;
}
