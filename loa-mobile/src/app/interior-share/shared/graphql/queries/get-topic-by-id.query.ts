import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import {
  Query as ParentQuery,
  QueryTopicArgs,
} from "@loa-shared/models/graphql.model";

const getTopic = gql`
  query GetTopic(
    $id: String!
    $before: String
    $after: String
    $first: Int
    $last: Int
    $level: Int
    $orderBy: String
    $beforeChild: String
    $afterChild: String
    $firstChild: Int
    $lastChild: Int
    $levelChild: Int
    $orderByChild: String
  ) {
    __typename
    topic(id: $id) {
      content
      created
      id
      numberOfComments
      numberOfFollows
      numberOfLikes
      numberOfShares
      numberOfViews
      liked
      followed
      images {
        id
        image
      }
      user {
        avatar
        id
        firstName
        lastName
        userType
      }
      comments(
        before: $before
        after: $after
        first: $first
        last: $last
        level: $level
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
            comments(
              before: $beforeChild
              after: $afterChild
              first: $firstChild
              last: $lastChild
              level: $levelChild
              orderBy: $orderByChild
            ) {
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
@Injectable({ providedIn: "root" })
export class GetByIdTopicQuery extends Query<ParentQuery, QueryTopicArgs> {
  document = getTopic;
}
