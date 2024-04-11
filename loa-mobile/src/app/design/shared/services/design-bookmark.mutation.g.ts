import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type BookmarkDesignMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type BookmarkDesignMutation = {
  designUserBookmarks?: Types.Maybe<
    { __typename?: 'UserBookmarksDesign' } & Pick<
      Types.UserBookmarksDesign,
      'status'
    >
  >;
};

export const BookmarkDesignDocument = gql`
  mutation BookmarkDesign($id: String!) {
    designUserBookmarks(id: $id) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BookmarkDesignGQL extends Apollo.Mutation<
  BookmarkDesignMutation,
  BookmarkDesignMutationVariables
> {
  document = BookmarkDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
