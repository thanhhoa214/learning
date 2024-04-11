import { ErrorType } from '@loa-shared/models/graphql.model';
import { LoginWithEmailMutation } from '../../shared/services';

export type LoginUserNode = LoginWithEmailMutation['authLogin']['user'];
export interface LoginStateModel {
  token?: string;
  facebook?: {
    accessToken: string;
    userId: string;
  };
  zalo?: {
    accessToken: string;
    userId: string;
  };
  userNode?: LoginUserNode;
  errors?: ErrorType[];
}
export const initialState: LoginStateModel = {};
