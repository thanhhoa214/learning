import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateProfileMutationVariables = Types.Exact<{
  input: Types.UserChangeProfileInput;
}>;

export type UpdateProfileMutation = {
  userChangeProfile?: Types.Maybe<
    { __typename?: 'UserChangeProfilePayload' } & Pick<
      Types.UserChangeProfilePayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'message' | 'field'
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

export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: UserChangeProfileInput!) {
    userChangeProfile(input: $input) {
      errors {
        code
        message
        field
      }
      status
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
export class UpdateProfileGQL extends Apollo.Mutation<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
> {
  document = UpdateProfileDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
