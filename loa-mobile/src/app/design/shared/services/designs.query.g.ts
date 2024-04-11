import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAllDesignsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  projectName?: Types.Maybe<Types.Scalars['String']>;
  designType?: Types.Maybe<Types.Scalars['String']>;
  style?: Types.Maybe<Types.Scalars['String']>;
  typeOfHouse?: Types.Maybe<Types.Scalars['String']>;
  roomType?: Types.Maybe<Types.Scalars['String']>;
  priceTo?: Types.Maybe<Types.Scalars['String']>;
  priceFrom?: Types.Maybe<Types.Scalars['String']>;
  areaTo?: Types.Maybe<Types.Scalars['String']>;
  areaFrom?: Types.Maybe<Types.Scalars['String']>;
  estimateCostFrom?: Types.Maybe<Types.Scalars['String']>;
  estimateCostTo?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetAllDesignsQuery = {
  designs?: Types.Maybe<
    { __typename?: 'DesignNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'DesignNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'DesignNode' } & Pick<
                Types.DesignNode,
                | 'id'
                | 'projectName'
                | 'style'
                | 'typeOfHouse'
                | 'description'
                | 'area'
                | 'price'
                | 'designType'
                | 'liked'
                | 'bookmarked'
                | 'estimateCostFrom'
                | 'estimateCostTo'
                | 'registeredDesignNumber'
                | 'tower'
                | 'unitType'
                | 'reviewedOnDate'
                | 'thumbnail'
              > & {
                  room?: Types.Maybe<
                    { __typename?: 'DesignRoomNode' } & Pick<
                      Types.DesignRoomNode,
                      'roomType'
                    > & {
                        preview: Array<
                          { __typename?: 'DesignRoomImageNode' } & Pick<
                            Types.DesignRoomImageNode,
                            'image'
                          >
                        >;
                      }
                  >;
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
                }
            >;
          }
        >
      >;
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        Types.PageInfo,
        'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
      >;
    }
  >;
};

export const GetAllDesignsDocument = gql`
  query GetAllDesigns(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $projectName: String
    $designType: String
    $style: String
    $typeOfHouse: String
    $roomType: String
    $priceTo: String
    $priceFrom: String
    $areaTo: String
    $areaFrom: String
    $estimateCostFrom: String
    $estimateCostTo: String
  ) {
    designs(
      before: $before
      after: $after
      first: $first
      last: $last
      projectName: $projectName
      designType: $designType
      style: $style
      typeOfHouse: $typeOfHouse
      roomType: $roomType
      priceTo: $priceTo
      priceFrom: $priceFrom
      areaTo: $areaTo
      areaFrom: $areaFrom
      estimateCostFrom: $estimateCostFrom
      estimateCostTo: $estimateCostTo
      orderBy: "-id"
    ) {
      edges {
        node {
          id
          projectName
          style
          typeOfHouse
          description
          area
          price
          designType
          liked
          bookmarked
          estimateCostFrom
          estimateCostTo
          registeredDesignNumber
          tower
          unitType
          reviewedOnDate
          thumbnail
          room {
            roomType
            preview {
              image
            }
          }
          wholeHouse {
            edges {
              node {
                preview {
                  image
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllDesignsGQL extends Apollo.Query<
  GetAllDesignsQuery,
  GetAllDesignsQueryVariables
> {
  document = GetAllDesignsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
