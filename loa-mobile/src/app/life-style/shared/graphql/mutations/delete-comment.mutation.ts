import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationArticleDeleteArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteCommentMutation extends ApolloMutation<
  Mutation,
  MutationArticleDeleteArgs
> {
  document = gql`
    mutation DeleteCommentMutation($input: ArticleDeleteInput!){
        articleDelete(input: $input) {
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
