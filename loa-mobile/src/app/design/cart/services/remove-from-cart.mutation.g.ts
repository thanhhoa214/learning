import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignRemoveFromCartMutationVariables = Types.Exact<{
  input: Types.DesignRemoveFromCartInput;
}>;

export type DesignRemoveFromCartMutation = {
  designRemoveFromCart?: Types.Maybe<
    { __typename?: 'DesignRemoveFromCartPayload' } & Pick<
      Types.DesignRemoveFromCartPayload,
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

export const DesignRemoveFromCartDocument = gql`
  mutation DesignRemoveFromCart($input: DesignRemoveFromCartInput!) {
    designRemoveFromCart(input: $input) {
      status
      errors {
        code
        message
        field
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignRemoveFromCartGQL extends Apollo.Mutation<
  DesignRemoveFromCartMutation,
  DesignRemoveFromCartMutationVariables
> {
  document = DesignRemoveFromCartDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
