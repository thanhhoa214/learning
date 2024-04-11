import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationArticleCommentCreateArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class CommentLifeStyleMutation extends ApolloMutation<
  Mutation,
  MutationArticleCommentCreateArgs
> {
  document = gql`
    mutation CommentLifeStyleMutation($input: ArticleCommentCreateInput!){
      articleCommentCreate(input: $input) {
        errors {
          code
          field
          message
        }
        status
        article {
          content
          created
          id
          level
          title
          thumbnail
          user {
            avatar
            created
            email
            firstName
            id
            lastName
          }
          comments {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            totalCount
            edges {
              node {
                content
                created
                id
                title
                thumbnail
                user {
                  avatar
                  created
                  email
                  firstName
                  id
                  lastName
                }
              }
            }
          }
        }
      }
    }
  `;
}
