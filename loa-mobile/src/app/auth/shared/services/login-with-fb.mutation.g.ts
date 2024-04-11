import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type LoginWithFacebookMutationVariables = Types.Exact<{
  input: Types.FacebookLoginInput;
}>;

export type LoginWithFacebookMutation = {
  authLoginWithFacebook?: Types.Maybe<
    { __typename?: 'FacebookLoginPayload' } & Pick<
      Types.FacebookLoginPayload,
      'status' | 'token'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'field'
            >
          >
        >;
        facebookInformation?: Types.Maybe<
          { __typename?: 'FacebookNode' } & {
            user: { __typename?: 'UserNode' } & Pick<
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
              };
          }
        >;
      }
  >;
};

export const LoginWithFacebookDocument = gql`
  mutation LoginWithFacebook($input: FacebookLoginInput!) {
    authLoginWithFacebook(input: $input) {
      status
      token
      errors {
        code
        field
      }
      facebookInformation {
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
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LoginWithFacebookGQL extends Apollo.Mutation<
  LoginWithFacebookMutation,
  LoginWithFacebookMutationVariables
> {
  document = LoginWithFacebookDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
