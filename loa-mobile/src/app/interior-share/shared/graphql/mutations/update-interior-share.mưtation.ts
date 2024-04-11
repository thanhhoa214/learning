import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Mutation, MutationTopicUpdateArgs,  } from '@loa-shared/models/graphql.model';

@Injectable({ providedIn: 'root' })
export class AdminUpdateTopicMutation extends ApolloMutation<
  Mutation,
  MutationTopicUpdateArgs
> {
  document = gql`
    mutation AdminUpdateTopicMutation($input: TopicUpdateInput!){
        topicUpdate(input: $input) {
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