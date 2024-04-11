import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryArticleArgs,
} from '@loa-shared/models/graphql.model';

const loadMoreComment = gql`
  query LoadMoreComment(
    $id: String!,
    $before: String,
    $after: String,
    $first: Int,
    $last: Int,
    $level: Int,
    $orderBy: String
  ) {
    __typename
    article(id: $id) {
      comments(
        before: $before, 
        after: $after, 
        first: $first, 
        last: $last,
        level: $level,
        orderBy: $orderBy
      ) {
        edges {
          cursor
          node {
            content
            created
            id
            level
            title
            user {
              avatar
              id
              firstName
              email
              lastName
              phone
            }
            comments(
              last: 4,
              level: 2,
            ) {
              edges {
                cursor
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
export class LoadMoreCommentQuery extends Query<
  ParentQuery,
  QueryArticleArgs
> {
  document = loadMoreComment;
}