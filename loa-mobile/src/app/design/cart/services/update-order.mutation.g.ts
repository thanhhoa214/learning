import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignOrderUpdateMutationVariables = Types.Exact<{
  input: Types.DesignOrderUpdateInput;
}>;

export type DesignOrderUpdateMutation = {
  designOrderUpdate?: Types.Maybe<
    { __typename?: 'DesignOrderUpdatePayload' } & Pick<
      Types.DesignOrderUpdatePayload,
      'status'
    >
  >;
};

export const DesignOrderUpdateDocument = gql`
  mutation DesignOrderUpdate($input: DesignOrderUpdateInput!) {
    designOrderUpdate(input: $input) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignOrderUpdateGQL extends Apollo.Mutation<
  DesignOrderUpdateMutation,
  DesignOrderUpdateMutationVariables
> {
  document = DesignOrderUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
