import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationArticleUserFollowArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkLifeStyleMutation extends ApolloMutation<
  Mutation,
  MutationArticleUserFollowArgs
> {
  document = gql`
    mutation BookmarkLifeStyleMutation($input: ArticleUserFollowInput!){
        articleUserFollow(input: $input) {
            errors {
              code
              field
              message
            }
            status
            articleFollow {
              article {
                id
                followed
                liked
                numberOfLikes
              }
            }
        }
    }
  `;
}
