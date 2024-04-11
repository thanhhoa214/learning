import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryArticlesArgs,
} from '@loa-shared/models/graphql.model';

const getAllArticle = gql`
  query AllArticle(
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
        before: $before, 
        after: $after, 
        first: $first, 
        last: $last, 
        level: $level, 
        userId: $userId, 
        searchBy: $searchBy, 
        orderBy: $orderBy
    ){
        edges {
          node {
            content
            created
            id
            level
            liked
            followed
            numberOfComments
            numberOfFollows
            numberOfLikes
            numberOfShares
            numberOfViews
            title
            thumbnail
            visibilityDate
            visible
            user {
              avatar
              created
              email
              firstName
              id
              phone
              lastName
            }
            comments {
              edges {
                node {
                  id
                  level
                  title
                  content
                  created
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
export class GetAllArticle extends Query<
ParentQuery,
QueryArticlesArgs
> {
  document = getAllArticle;
}