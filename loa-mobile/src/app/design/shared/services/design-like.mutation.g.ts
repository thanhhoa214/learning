import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type LikeDesignMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type LikeDesignMutation = {
  designUserLike?: Types.Maybe<
    { __typename?: 'UserLikeDesign' } & Pick<Types.UserLikeDesign, 'status'>
  >;
};

export const LikeDesignDocument = gql`
  mutation LikeDesign($id: String!) {
    designUserLike(id: $id) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LikeDesignGQL extends Apollo.Mutation<
  LikeDesignMutation,
  LikeDesignMutationVariables
> {
  document = LikeDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
