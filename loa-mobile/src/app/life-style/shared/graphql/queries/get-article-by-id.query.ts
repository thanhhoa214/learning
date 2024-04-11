import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryArticleArgs,
} from '@loa-shared/models/graphql.model';

const getArticle = gql`
  query GetArticle(
    $id: String!,
    $before: String,
    $after: String,
    $first: Int,
    $last: Int,
    $level: Int,
    $orderBy: String,
    $beforeChild: String,
    $afterChild: String,
    $firstChild: Int,
    $lastChild: Int,
    $levelChild: Int,
    $orderByChild: String
  ) {
    __typename
    article(id: $id) {
        content
        created
        id
        numberOfComments
        numberOfFollows
        numberOfLikes
        numberOfShares
        numberOfViews
        title
        visibilityDate
        visible
        thumbnail
        liked
        followed
        user {
          avatar
          firstName
          id
          lastName
        }
        category {
        description
        id
        name
        thumbnail
      }
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
              before: $beforeChild, 
              after: $afterChild, 
              first: $firstChild, 
              last: $lastChild,
              level: $levelChild,
              orderBy: $orderByChild
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
export class GetByIdArticleQuery extends Query<
  ParentQuery,
  QueryArticleArgs
> {
  document = getArticle;
}