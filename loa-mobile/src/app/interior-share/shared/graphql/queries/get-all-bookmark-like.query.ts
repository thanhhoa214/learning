import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryTopicsArgs,
} from '@loa-shared/models/graphql.model';

const getAllBookmarkLikeInterior = gql`
  query AllBookmarkLikeInterior(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $orderBy: String
    $userId: String
    $searchBy: String
    $level: Int
  ) {
    topics(
      before: $before
      after: $after
      first: $first
      last: $last
      level: $level
      userId: $userId
      searchBy: $searchBy
      orderBy: $orderBy
    ) {
      edges {
        node {
          followed
          liked
          numberOfFollows
          numberOfLikes
          id
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class GetAllBookmarkLikInterior extends Query<
  ParentQuery,
  QueryTopicsArgs
> {
  document = getAllBookmarkLikeInterior;
}
