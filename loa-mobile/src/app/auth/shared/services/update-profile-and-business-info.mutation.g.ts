import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateProfileAndBusinessInfoMutationVariables = Types.Exact<{
  input: Types.UserChangeProfileInput;
  businessInput: Types.UserUpdateBusinessInfoInput;
}>;

export type UpdateProfileAndBusinessInfoMutation = {
  userUpdateBusinessInfo?: Types.Maybe<
    { __typename?: 'UserUpdateBusinessInfoPayload' } & Pick<
      Types.UserUpdateBusinessInfoPayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'message'
            >
          >
        >;
      }
  >;
  userChangeProfile?: Types.Maybe<
    { __typename?: 'UserChangeProfilePayload' } & Pick<
      Types.UserChangeProfilePayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'field' | 'message'
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

export const UpdateProfileAndBusinessInfoDocument = gql`
  mutation UpdateProfileAndBusinessInfo(
    $input: UserChangeProfileInput!
    $businessInput: UserUpdateBusinessInfoInput!
  ) {
    userUpdateBusinessInfo(input: $businessInput) {
      status
      errors {
        code
        message
      }
    }
    userChangeProfile(input: $input) {
      status
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
export class UpdateProfileAndBusinessInfoGQL extends Apollo.Mutation<
  UpdateProfileAndBusinessInfoMutation,
  UpdateProfileAndBusinessInfoMutationVariables
> {
  document = UpdateProfileAndBusinessInfoDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
