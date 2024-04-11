import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    Query as ParentQuery,
    QueryTopicArgs,
} from '@loa-shared/models/graphql.model';

const getBookmarkLike = gql`
  query GetBookmarkLike(
    $id: String!
  ) {
    __typename
    topic(id: $id) {
        followed
        liked
        id
        numberOfFollows
        numberOfLikes
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class GetBookmarkLikeQueryInterior extends Query<
  ParentQuery,
  QueryTopicArgs
> {
  document = getBookmarkLike;
}