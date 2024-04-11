import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationTopicCommentCreateArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class CommentInteriorShareMutation extends ApolloMutation<
  Mutation,
  MutationTopicCommentCreateArgs
> {
  document = gql`
    mutation CommentInteriorShareMutation($input: TopicCommentCreateInput!){
        topicCommentCreate(input: $input) {
            errors {
              code
              field
              message
            }
            status
            topic {
                comments {
                    edges {
                    node {
                        content
                        created
                        id
                        user {
                        avatar
                        id
                        firstName
                        lastName
                        phone
                        }
                    }
                    }
                    pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    }
                    totalCount
                }
                content
                created
                id
                user {
                    avatar
                    id
                    firstName
                    lastName
                    phone
                    userType
                }
            }
        }
    }
  `;
}
