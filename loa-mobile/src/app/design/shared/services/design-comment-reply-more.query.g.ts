import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignCommentReplyMoreQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  before?: Types.Maybe<Types.Scalars['String']>;
}>;

export type DesignCommentReplyMoreQuery = {
  designQA?: Types.Maybe<
    { __typename?: 'DesignQuestionAndAnswerNode' } & {
      answer: { __typename?: 'DesignQuestionAndAnswerNodeConnection' } & Pick<
        Types.DesignQuestionAndAnswerNodeConnection,
        'totalCount'
      > & {
          pageInfo: { __typename?: 'PageInfo' } & Pick<
            Types.PageInfo,
            'endCursor' | 'startCursor' | 'hasNextPage' | 'hasPreviousPage'
          >;
          edges: Array<
            Types.Maybe<
              { __typename?: 'DesignQuestionAndAnswerNodeEdge' } & {
                node?: Types.Maybe<
                  { __typename?: 'DesignQuestionAndAnswerNode' } & Pick<
                    Types.DesignQuestionAndAnswerNode,
                    'id' | 'comment' | 'created'
                  > & {
                      user: { __typename?: 'UserNode' } & Pick<
                        Types.UserNode,
                        'id' | 'avatar' | 'firstName' | 'lastName'
                      >;
                    }
                >;
              }
            >
          >;
        };
    }
  >;
};

export const DesignCommentReplyMoreDocument = gql`
  query DesignCommentReplyMore($id: String!, $before: String) {
    designQA(id: $id) {
      answer(before: $before) {
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            comment
            created
            user {
              id
              avatar
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignCommentReplyMoreGQL extends Apollo.Query<
  DesignCommentReplyMoreQuery,
  DesignCommentReplyMoreQueryVariables
> {
  document = DesignCommentReplyMoreDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
