import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryTopicArgs,
} from '@loa-shared/models/graphql.model';

const loadMoreReplyInterior = gql`
  query LoadMoreReplyInterior(
    $id: String!,
    $before: String,
    $after: String,
    $first: Int,
    $last: Int,
    $level: Int,
    $orderBy: String,
  ) {
    __typename
    topic(id: $id) {
      comments(
        before: $before, 
        after: $after, 
        first: $first, 
        last: $last,
        level: $level,
        orderBy: $orderBy
      ) {
        edges {
          node {
            content
            created
            id
            level
            user {
              avatar
              id
              firstName
              email
              lastName
              phone
              userType
            }
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
  }
`;
@Injectable({ providedIn: 'root' })
export class LoadMoreReplyInterior extends Query<
  ParentQuery,
  QueryTopicArgs
> {
  document = loadMoreReplyInterior;
}