import { LoginStateModel } from '../../auth/login/store';

export interface AuthStateModel {
  login?: LoginStateModel;
}
export const initialState: AuthStateModel = {};
