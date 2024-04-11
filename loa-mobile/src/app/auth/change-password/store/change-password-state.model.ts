import { ErrorType } from '@loa-shared/models/graphql.model';

export interface ChangePasswordStateModel {
  success: boolean;
  newPassword: string;
  errors?: ErrorType[];
}
export const initialState: ChangePasswordStateModel = {
  success: false,
  newPassword: '',
};
