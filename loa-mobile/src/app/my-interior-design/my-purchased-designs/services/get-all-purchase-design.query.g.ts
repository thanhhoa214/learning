import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllPurchaseDesignQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  orderBy?: Types.Maybe<Types.Scalars['String']>;
}>;

export type AllPurchaseDesignQuery = {
  designsPurchased?: Types.Maybe<
    { __typename?: 'DesignNodeConnection' } & Pick<
      Types.DesignNodeConnection,
      'totalCount'
    > & {
        edges: Array<
          Types.Maybe<
            { __typename?: 'DesignNodeEdge' } & {
              node?: Types.Maybe<
                { __typename?: 'DesignNode' } & Pick<
                  Types.DesignNode,
                  | 'id'
                  | 'price'
                  | 'style'
                  | 'area'
                  | 'registeredDesignNumber'
                  | 'projectName'
                  | 'designType'
                  | 'thumbnail'
                  | 'typeOfHouse'
                  | 'tower'
                  | 'bought'
                > & {
                    room?: Types.Maybe<
                      { __typename?: 'DesignRoomNode' } & Pick<
                        Types.DesignRoomNode,
                        'roomType'
                      >
                    >;
                    orderDetails: {
                      __typename?: 'OrderDetailNodeConnection';
                    } & {
                      edges: Array<
                        Types.Maybe<
                          { __typename?: 'OrderDetailNodeEdge' } & {
                            node?: Types.Maybe<
                              { __typename?: 'OrderDetailNode' } & {
                                order: { __typename?: 'OrderNode' } & Pick<
                                  Types.OrderNode,
                                  'createdDate'
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
        pageInfo: { __typename?: 'PageInfo' } & Pick<
          Types.PageInfo,
          'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'
        >;
      }
  >;
};

export const AllPurchaseDesignDocument = gql`
  query AllPurchaseDesign(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $orderBy: String
  ) {
    designsPurchased(
      orderBy: $orderBy
      last: $last
      after: $after
      first: $first
      before: $before
    ) {
      edges {
        node {
          id
          price
          style
          area
          registeredDesignNumber
          projectName
          designType
          thumbnail
          typeOfHouse
          tower
          bought
          room {
            roomType
          }
          orderDetails {
            edges {
              node {
                order {
                  createdDate
                }
              }
            }
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
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AllPurchaseDesignGQL extends Apollo.Query<
  AllPurchaseDesignQuery,
  AllPurchaseDesignQueryVariables
> {
  document = AllPurchaseDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
