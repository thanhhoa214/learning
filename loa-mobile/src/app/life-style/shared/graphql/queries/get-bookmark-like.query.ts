import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryArticleArgs,
} from '@loa-shared/models/graphql.model';

const getBookmarkLike = gql`
  query GetBookmarkLifeStyleLike($id: String!) {
    __typename
    article(id: $id) {
      followed
      liked
      numberOfLikes
      numberOfFollows
      id
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class GetBookmarkLikeQuery extends Query<ParentQuery, QueryArticleArgs> {
  document = getBookmarkLike;
}
