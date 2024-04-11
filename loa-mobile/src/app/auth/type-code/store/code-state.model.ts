import { ErrorType } from '@loa-shared/models/graphql.model';

export interface CodeStateModel {
  success: boolean;
  token: string;
  errors?: ErrorType[];
}
export const initialState: CodeStateModel = {
  success: false,
  token: '',
};
