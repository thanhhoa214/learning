import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RegisterBusinessMutationVariables = Types.Exact<{
  input: Types.RegisterBusinessInput;
}>;

export type RegisterBusinessMutation = {
  authRegisterBusiness?: Types.Maybe<
    { __typename?: 'RegisterBusinessPayload' } & Pick<
      Types.RegisterBusinessPayload,
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
      }
  >;
};

export const RegisterBusinessDocument = gql`
  mutation RegisterBusiness($input: RegisterBusinessInput!) {
    authRegisterBusiness(input: $input) {
      errors {
        code
        message
        field
      }
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RegisterBusinessGQL extends Apollo.Mutation<
  RegisterBusinessMutation,
  RegisterBusinessMutationVariables
> {
  document = RegisterBusinessDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
