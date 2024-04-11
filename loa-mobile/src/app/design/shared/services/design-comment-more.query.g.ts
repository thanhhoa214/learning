import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignCommentMoreQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  before?: Types.Maybe<Types.Scalars['String']>;
}>;

export type DesignCommentMoreQuery = {
  design?: Types.Maybe<
    { __typename?: 'DesignNode' } & {
      questionAnswer: {
        __typename?: 'DesignQuestionAndAnswerNodeConnection';
      } & Pick<Types.DesignQuestionAndAnswerNodeConnection, 'totalCount'> & {
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
                        'id' | 'lastName' | 'firstName' | 'created' | 'avatar'
                      >;
                      answer: {
                        __typename?: 'DesignQuestionAndAnswerNodeConnection';
                      } & Pick<
                        Types.DesignQuestionAndAnswerNodeConnection,
                        'totalCount'
                      > & {
                          pageInfo: { __typename?: 'PageInfo' } & Pick<
                            Types.PageInfo,
                            | 'endCursor'
                            | 'startCursor'
                            | 'hasNextPage'
                            | 'hasPreviousPage'
                          >;
                          edges: Array<
                            Types.Maybe<
                              {
                                __typename?: 'DesignQuestionAndAnswerNodeEdge';
                              } & {
                                node?: Types.Maybe<
                                  {
                                    __typename?: 'DesignQuestionAndAnswerNode';
                                  } & Pick<
                                    Types.DesignQuestionAndAnswerNode,
                                    'id' | 'comment' | 'created'
                                  > & {
                                      user: { __typename?: 'UserNode' } & Pick<
                                        Types.UserNode,
                                        | 'id'
                                        | 'avatar'
                                        | 'firstName'
                                        | 'lastName'
                                      >;
                                    }
                                >;
                              }
                            >
                          >;
                        };
                    }
                >;
              }
            >
          >;
        };
    }
  >;
};

export const DesignCommentMoreDocument = gql`
  query DesignCommentMore($id: String!, $before: String) {
    design(id: $id) {
      questionAnswer(level: 0, last: 4, before: $before) {
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
              lastName
              firstName
              created
              avatar
            }
            answer(first: 3) {
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
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignCommentMoreGQL extends Apollo.Query<
  DesignCommentMoreQuery,
  DesignCommentMoreQueryVariables
> {
  document = DesignCommentMoreDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
