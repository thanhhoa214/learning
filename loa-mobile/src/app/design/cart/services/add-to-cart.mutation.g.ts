import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignAddToCartMutationVariables = Types.Exact<{
  input: Types.DesignAddToCartInput;
}>;

export type DesignAddToCartMutation = {
  designAddToCart?: Types.Maybe<
    { __typename?: 'DesignAddToCartPayload' } & Pick<
      Types.DesignAddToCartPayload,
      'status'
    >
  >;
};

export const DesignAddToCartDocument = gql`
  mutation DesignAddToCart($input: DesignAddToCartInput!) {
    designAddToCart(input: $input) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignAddToCartGQL extends Apollo.Mutation<
  DesignAddToCartMutation,
  DesignAddToCartMutationVariables
> {
  document = DesignAddToCartDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
