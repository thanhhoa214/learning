import { Injectable } from '@angular/core';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';
import {Mutation, MutationDesignUserBookmarksArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkDesignMyBookmarkMutation extends ApolloMutation<
  Mutation,
  MutationDesignUserBookmarksArgs
> {
  document = gql`
    mutation BookmarkDesignMyBookmarkMutation($id: String!){
        designUserBookmarks(id: $id) {
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
