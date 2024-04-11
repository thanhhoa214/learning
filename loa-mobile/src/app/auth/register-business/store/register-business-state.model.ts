import {
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';

export interface RegisterBusinessStateModel {
  errors?: CustomizeMutationErrorType[];
  autologinInfo?: LoginInput;
}
export const initialState: RegisterBusinessStateModel = {};
