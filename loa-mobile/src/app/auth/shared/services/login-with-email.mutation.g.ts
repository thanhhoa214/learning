import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type LoginWithEmailMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginWithEmailMutation = {
  authLogin?: Types.Maybe<
    { __typename?: 'LoginPayload' } & Pick<
      Types.LoginPayload,
      'status' | 'token'
    > & {
        errors?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: 'ErrorType' } & Pick<
                Types.ErrorType,
                'code' | 'field' | 'message'
              >
            >
          >
        >;
        user?: Types.Maybe<
          { __typename?: 'UserNode' } & Pick<
            Types.UserNode,
            | 'id'
            | 'lastName'
            | 'firstName'
            | 'userType'
            | 'email'
            | 'phone'
            | 'avatar'
            | 'created'
            | 'loginMethod'
          > & {
              business: Array<
                { __typename?: 'BusinessNode' } & Pick<
                  Types.BusinessNode,
                  | 'businessType'
                  | 'companyName'
                  | 'companyPhone'
                  | 'registerationNumber'
                  | 'taxCode'
                >
              >;
            }
        >;
      }
  >;
};

export const LoginWithEmailDocument = gql`
  mutation LoginWithEmail($input: LoginInput!) {
    authLogin(input: $input) {
      status
      token
      errors {
        code
        field
        message
      }
      user {
        id
        lastName
        firstName
        userType
        email
        phone
        avatar
        created
        loginMethod
        business {
          businessType
          companyName
          companyPhone
          registerationNumber
          taxCode
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LoginWithEmailGQL extends Apollo.Mutation<
  LoginWithEmailMutation,
  LoginWithEmailMutationVariables
> {
  document = LoginWithEmailDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
