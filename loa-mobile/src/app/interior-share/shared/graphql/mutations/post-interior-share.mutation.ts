import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationTopicCreateArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class CreateTopicMutation extends ApolloMutation<
  Mutation,
  MutationTopicCreateArgs
> {
  document = gql`
    mutation CreateTopicMutation($input: TopicCreateInput!){
        topicCreate(input: $input) {
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
