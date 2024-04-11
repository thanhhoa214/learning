import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetContentPageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetContentPageQuery = {
  contentPage?: Types.Maybe<
    { __typename?: 'ContentPageNode' } & Pick<
      Types.ContentPageNode,
      'id' | 'description' | 'file' | 'name'
    >
  >;
};

export const GetContentPageDocument = gql`
  query GetContentPage($id: String!) {
    contentPage(id: $id) {
      id
      description
      file
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetContentPageGQL extends Apollo.Query<
  GetContentPageQuery,
  GetContentPageQueryVariables
> {
  document = GetContentPageDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
