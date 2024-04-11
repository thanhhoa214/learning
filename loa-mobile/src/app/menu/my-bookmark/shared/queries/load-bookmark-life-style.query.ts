import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryArticleFollowsArgs,
} from '@loa-shared/models/graphql.model';

const loadBookmarkLifeStyle = gql`
  query LoadBookmarkLifeStyle(
    $before: String,
    $after: String,
    $first: Int,
    $last: Int,
    $userId: String,
  ) {
    __typename
    articleFollows(
        orderBy: "-id",
        before: $before, 
        after: $after, 
        first: $first, 
        last: $last,
        userId: $userId,
    ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        edges {
          node {
            article {
              content
              id
              created
              title
              thumbnail
            }
            created
          }
        }
      }
  }
`;
@Injectable({ providedIn: 'root' })
export class LoadBookmarkLifeStyleQuery extends Query<
  ParentQuery,
  QueryArticleFollowsArgs
> {
  document = loadBookmarkLifeStyle;
}