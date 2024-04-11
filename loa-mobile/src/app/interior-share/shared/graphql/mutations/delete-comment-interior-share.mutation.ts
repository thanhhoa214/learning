import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationTopicDeleteArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteCommentInteriorMutation extends ApolloMutation<
  Mutation,
  MutationTopicDeleteArgs
> {
  document = gql`
    mutation DeleteCommentInteriorMutation($input: TopicDeleteInput!){
        topicDelete(input: $input) {
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
