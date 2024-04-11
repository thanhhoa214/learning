import { ErrorType } from '@loa-shared/models/graphql.model';

export interface ForgotStateModel {
  success: boolean;
  email: string;
  errors?: ErrorType[];
}
export const initialState: ForgotStateModel = {
  success: false,
  email: '',
};
