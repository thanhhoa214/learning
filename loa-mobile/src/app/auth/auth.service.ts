import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  registerCustomer,
  forgotPassword,
  forgotPasswordVerify,
  resetPassword,
} from './shared/graphql/mutations';
import { getProfile } from './shared/graphql/queries';
import {
  MutationAuthRegisterCustomerArgs,
  Mutation,
  MutationAuthForgotPasswordArgs,
  MutationUserResetPasswordArgs,
  ForgotPasswordInput,
  ConfirmForgotPasswordInput,
  MutationAuthConfirmForgotPasswordArgs,
  ResetPasswordInput,
  RegisterCustomerInput,
  ChangePasswordInput,
  MutationUserChangePasswordArgs,
  UserNode,
  Query,
} from '@loa-shared/models/graphql.model';
import { changePassword } from './shared/graphql/mutations';
import {
  LoginWithEmailGQL,
  LoginWithEmailMutationVariables,
} from './shared/services';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _apollo: Apollo,
    private _loginMutation: LoginWithEmailGQL
  ) {}

  login(args: LoginWithEmailMutationVariables) {
    return this._loginMutation.mutate(args);
  }

  register(input: RegisterCustomerInput) {
    return this._apollo.mutate<Mutation, MutationAuthRegisterCustomerArgs>({
      mutation: registerCustomer,
      variables: { input },
    });
  }

  forgotPassword(input: ForgotPasswordInput) {
    return this._apollo.mutate<Mutation, MutationAuthForgotPasswordArgs>({
      mutation: forgotPassword,
      variables: { input },
    });
  }

  forgotPasswordVerify(input: ConfirmForgotPasswordInput) {
    return this._apollo.mutate<Mutation, MutationAuthConfirmForgotPasswordArgs>(
      {
        mutation: forgotPasswordVerify,
        variables: { input },
      }
    );
  }

  resetPassword(input: ResetPasswordInput) {
    return this._apollo.mutate<Mutation, MutationUserResetPasswordArgs>({
      mutation: resetPassword,
      variables: { input },
    });
  }
  changePassword(input: ChangePasswordInput) {
    return this._apollo.mutate<Mutation, MutationUserChangePasswordArgs>({
      mutation: changePassword,
      variables: { input },
    });
  }
  getProfile() {
    return this._apollo.query<Query, UserNode>({ query: getProfile });
  }
}
