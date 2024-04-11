import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryTopicArgs,
} from '@loa-shared/models/graphql.model';

const loadMoreCommentInterior = gql`
  query LoadMoreCommentInterior(
    $id: String!,
    $before: String,
    $after: String,
    $first: Int,
    $last: Int,
    $level: Int,
    $orderBy: String,
    $userId: String
  ) {
    __typename
    topic(id: $id) {
      comments(
        before: $before, 
        after: $after, 
        first: $first, 
        last: $last,
        level: $level,
        orderBy: $orderBy,
        userId: $userId, 
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
            comments (
                last: 4,
                level: 2,
            ){
              edges {
                node {
                  content
                  created
                  id
                  user {
                    email
                    avatar
                    id
                    firstName
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
export class LoadMoreCommentInterior extends Query<
  ParentQuery,
  QueryTopicArgs
> {
  document = loadMoreCommentInterior;
}