import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryTopicsArgs,
} from '@loa-shared/models/graphql.model';

const getAllTopic = gql`
  query AllTopic(
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
          content
          created
          id
          level
          liked
          numberOfComments
          numberOfFollows
          numberOfLikes
          numberOfShares
          numberOfViews
          images {
            id
            image
          }
          user {
            avatar
            created
            email
            firstName
            id
            userType
          }
          comments(level: 1, last: 4) {
            edges {
              node {
                id
                level
                content
                created
                user {
                  avatar
                  id
                  firstName
                  lastName
                  userType
                }
                comments(last: 4, level: 2) {
                  edges {
                    node {
                      id
                      level
                      content
                      created
                      user {
                        avatar
                        id
                        firstName
                        lastName
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
`;
@Injectable({ providedIn: 'root' })
export class GetAllTopic extends Query<ParentQuery, QueryTopicsArgs> {
  document = getAllTopic;
}
