import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationArticleUserLikeArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class LikeLifeStyleMutation extends ApolloMutation<
  Mutation,
  MutationArticleUserLikeArgs
> {
  document = gql`
    mutation LikeLifeStyleMutation($input: ArticleUserLikesInput!){
      articleUserLike(input: $input) {
        errors {
          code
          field
          message
        }
        status
        articleLike {
          article {
            followed
            id
            liked
            numberOfLikes
          }
        }
      }
    }
  `;
}
