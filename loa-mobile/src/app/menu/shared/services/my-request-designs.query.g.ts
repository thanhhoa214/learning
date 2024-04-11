import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllMyRequestDesignsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  designId?: Types.Maybe<Types.Scalars['String']>;
  userId?: Types.Maybe<Types.Scalars['String']>;
  customer?: Types.Maybe<Types.Scalars['String']>;
  projectName?: Types.Maybe<Types.Scalars['String']>;
  searchBy?: Types.Maybe<Types.Scalars['String']>;
  email?: Types.Maybe<Types.Scalars['String']>;
  orderBy?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetAllMyRequestDesignsQuery = {
  designsInquiries?: Types.Maybe<
    { __typename?: 'DesignInquiryNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'DesignInquiryNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'DesignInquiryNode' } & Pick<
                Types.DesignInquiryNode,
                'id' | 'created' | 'email'
              > & {
                  design: { __typename?: 'DesignNode' } & Pick<
                    Types.DesignNode,
                    | 'id'
                    | 'projectName'
                    | 'typeOfHouse'
                    | 'designType'
                    | 'price'
                    | 'area'
                    | 'style'
                  > & {
                      wholeHouse?: Types.Maybe<
                        { __typename?: 'DesignWholeHouseNodeConnection' } & {
                          edges: Array<
                            Types.Maybe<
                              { __typename?: 'DesignWholeHouseNodeEdge' } & {
                                node?: Types.Maybe<
                                  { __typename?: 'DesignWholeHouseNode' } & {
                                    preview: Array<
                                      {
                                        __typename?: 'DesignWholeHouseImageNode';
                                      } & Pick<
                                        Types.DesignWholeHouseImageNode,
                                        'image'
                                      >
                                    >;
                                  }
                                >;
                              }
                            >
                          >;
                        }
                      >;
                      room?: Types.Maybe<
                        { __typename?: 'DesignRoomNode' } & {
                          preview: Array<
                            { __typename?: 'DesignRoomImageNode' } & Pick<
                              Types.DesignRoomImageNode,
                              'image'
                            >
                          >;
                        }
                      >;
                    };
                }
            >;
          }
        >
      >;
    }
  >;
};

export const GetAllMyRequestDesignsDocument = gql`
  query GetAllMyRequestDesigns(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $designId: String
    $userId: String
    $customer: String
    $projectName: String
    $searchBy: String
    $email: String
    $orderBy: String
  ) {
    designsInquiries(
      before: $before
      after: $after
      first: $first
      last: $last
      designId: $designId
      userId: $userId
      customer: $customer
      projectName: $projectName
      searchBy: $searchBy
      email: $email
      orderBy: $orderBy
    ) {
      edges {
        node {
          id
          created
          email
          design {
            id
            projectName
            typeOfHouse
            designType
            price
            area
            style
            wholeHouse {
              edges {
                node {
                  preview {
                    image
                  }
                }
              }
            }
            room {
              preview {
                image
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
export class GetAllMyRequestDesignsGQL extends Apollo.Query<
  GetAllMyRequestDesignsQuery,
  GetAllMyRequestDesignsQueryVariables
> {
  document = GetAllMyRequestDesignsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
