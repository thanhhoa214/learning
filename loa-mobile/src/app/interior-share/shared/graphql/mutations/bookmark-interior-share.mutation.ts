import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationTopicUserFollowArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkInteriorShareMutation extends ApolloMutation<
  Mutation,
  MutationTopicUserFollowArgs
> {
  document = gql`
    mutation BookmarkInteriorShareMutation($input: TopicUserFollowInput!){
        topicUserFollow(input: $input) {
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
