import {
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';

export interface RegisterStateModel {
  success: boolean;
  errors?: CustomizeMutationErrorType[];
  autologinInfo?: LoginInput;
}
export const initialState: RegisterStateModel = {
  success: false,
};
