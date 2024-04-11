import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllConstructionsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  email?: Types.Maybe<Types.Scalars['String']>;
  created?: Types.Maybe<Types.Scalars['DateTime']>;
  loginMethod?: Types.Maybe<Types.Scalars['String']>;
  name?: Types.Maybe<Types.Scalars['String']>;
  orderBy?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetAllConstructionsQuery = {
  constructions?: Types.Maybe<
    { __typename?: 'UserNodeConnection' } & Pick<
      Types.UserNodeConnection,
      'totalCount'
    > & {
        pageInfo: { __typename?: 'PageInfo' } & Pick<
          Types.PageInfo,
          'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
        >;
        edges: Array<
          Types.Maybe<
            { __typename?: 'UserNodeEdge' } & {
              node?: Types.Maybe<
                { __typename?: 'UserNode' } & Pick<
                  Types.UserNode,
                  'id' | 'email' | 'phone' | 'avatar'
                > & {
                    constructor?: Types.Maybe<
                      { __typename?: 'ConstructorNode' } & Pick<
                        Types.ConstructorNode,
                        | 'id'
                        | 'companyName'
                        | 'country'
                        | 'city'
                        | 'address'
                        | 'introduction'
                      >
                    >;
                  }
              >;
            }
          >
        >;
      }
  >;
};

export const GetAllConstructionsDocument = gql`
  query GetAllConstructions(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $email: String
    $created: DateTime
    $loginMethod: String
    $name: String
    $orderBy: String
  ) {
    constructions: constructors(
      before: $before
      after: $after
      first: $first
      last: $last
      email: $email
      created: $created
      loginMethod: $loginMethod
      companyName: $name
      orderBy: $orderBy
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          email
          phone
          avatar
          constructor {
            id
            companyName
            country
            city
            address
            introduction
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllConstructionsGQL extends Apollo.Query<
  GetAllConstructionsQuery,
  GetAllConstructionsQueryVariables
> {
  document = GetAllConstructionsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
