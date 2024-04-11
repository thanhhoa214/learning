import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type LoginWithZaloMutationVariables = Types.Exact<{
  input: Types.ZaloLoginInput;
}>;

export type LoginWithZaloMutation = {
  authLoginWithZalo?: Types.Maybe<
    { __typename?: 'ZaloLoginPayload' } & Pick<
      Types.ZaloLoginPayload,
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
        zaloInformation?: Types.Maybe<
          { __typename?: 'ZaloNode' } & {
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

export const LoginWithZaloDocument = gql`
  mutation LoginWithZalo($input: ZaloLoginInput!) {
    authLoginWithZalo(input: $input) {
      status
      token
      errors {
        code
        field
      }
      zaloInformation {
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
export class LoginWithZaloGQL extends Apollo.Mutation<
  LoginWithZaloMutation,
  LoginWithZaloMutationVariables
> {
  document = LoginWithZaloDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
