import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationTopicUserLikeArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class LikeInteriorShareMutation extends ApolloMutation<
  Mutation,
  MutationTopicUserLikeArgs
> {
  document = gql`
    mutation LikeInteriorShareMutation($input: TopicUserLikesInput!){
        topicUserLike(input: $input) {
            errors {
              code
              field
              message
            }
            status
        }
    }
  `;
}
