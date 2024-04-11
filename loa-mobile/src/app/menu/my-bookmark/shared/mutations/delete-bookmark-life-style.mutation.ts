import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Mutation,
  MutationArticleUserFollowArgs,
} from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteBookmarkLifeStyleMutation extends ApolloMutation<
  Mutation,
  MutationArticleUserFollowArgs
> {
  document = gql`
    mutation DeleteBookmarkLifeStyleMutation($input: ArticleUserFollowInput!) {
      articleUserFollow(input: $input) {
        errors {
          field
          code
          message
        }
        status
      }
    }
  `;
}
