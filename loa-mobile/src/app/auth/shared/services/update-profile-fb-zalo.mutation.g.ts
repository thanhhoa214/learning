import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateProfileWithFbAndZaloMutationVariables = Types.Exact<{
  input: Types.UserChangeProfileFacebookZaloInput;
}>;

export type UpdateProfileWithFbAndZaloMutation = {
  userChangeProfileFbZalo?: Types.Maybe<
    { __typename?: 'UserChangeProfileFacebookZaloPayload' } & Pick<
      Types.UserChangeProfileFacebookZaloPayload,
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

export const UpdateProfileWithFbAndZaloDocument = gql`
  mutation UpdateProfileWithFBAndZalo(
    $input: UserChangeProfileFacebookZaloInput!
  ) {
    userChangeProfileFbZalo(input: $input) {
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
export class UpdateProfileWithFbAndZaloGQL extends Apollo.Mutation<
  UpdateProfileWithFbAndZaloMutation,
  UpdateProfileWithFbAndZaloMutationVariables
> {
  document = UpdateProfileWithFbAndZaloDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
