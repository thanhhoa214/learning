import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryTopicFollowsArgs,
} from '@loa-shared/models/graphql.model';

const getAllMyBookmark = gql`
  query AllMyBookmark(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $orderBy: String
    $userId: String
    $hasImages: Boolean
  ) {
    topicFollows(
        hasImages: $hasImages, 
        userId: $userId, 
        last: $last, 
        first: $first, 
        after: $after, 
        before: $before, 
        orderBy: $orderBy
    ) {
        edges {
          node {
            created
            id
            topic {
              content
              images {
                id
                image
              }
              level
              id
            }
          }
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
        totalCount
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class GetAllMyBookmark extends Query<
ParentQuery,
QueryTopicFollowsArgs
> {
  document = getAllMyBookmark;
}