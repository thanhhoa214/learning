import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryArticlesArgs,
} from '@loa-shared/models/graphql.model';

const getAllBookmarkLike = gql`
  query AllBookmarkLikeArticle(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $orderBy: String
    $userId: String
    $searchBy: String
    $level: Int
  ) {
    articles(
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
          liked
          numberOfFollows
          numberOfLikes
          followed
          id
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class GetAllBookmarkLike extends Query<ParentQuery, QueryArticlesArgs> {
  document = getAllBookmarkLike;
}
