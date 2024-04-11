import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetDesignQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetDesignQuery = {
  design?: Types.Maybe<
    { __typename?: 'DesignNode' } & Pick<
      Types.DesignNode,
      | 'projectName'
      | 'id'
      | 'style'
      | 'description'
      | 'area'
      | 'price'
      | 'designType'
      | 'liked'
      | 'bookmarked'
      | 'numberOfLikes'
      | 'numberOfViews'
      | 'numberOfQuestions'
      | 'numberOfBookmarks'
      | 'typeOfHouse'
      | 'estimateCostFrom'
      | 'estimateCostTo'
      | 'registeredDesignNumber'
      | 'kitchens'
      | 'livingRooms'
      | 'bathrooms'
      | 'bedrooms'
      | 'others'
      | 'reviewedOnDate'
      | 'thumbnail'
      | 'tower'
      | 'unitType'
      | 'bought'
    > & {
        layout: Array<
          { __typename?: 'DesignLayoutNode' } & Pick<
            Types.DesignLayoutNode,
            'image'
          >
        >;
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
                                        user: {
                                          __typename?: 'UserNode';
                                        } & Pick<
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
        wholeHouse?: Types.Maybe<
          { __typename?: 'DesignWholeHouseNodeConnection' } & {
            edges: Array<
              Types.Maybe<
                { __typename?: 'DesignWholeHouseNodeEdge' } & {
                  node?: Types.Maybe<
                    { __typename?: 'DesignWholeHouseNode' } & Pick<
                      Types.DesignWholeHouseNode,
                      'id' | 'roomType'
                    > & {
                        preview: Array<
                          { __typename?: 'DesignWholeHouseImageNode' } & Pick<
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
          { __typename?: 'DesignRoomNode' } & Pick<
            Types.DesignRoomNode,
            | 'roomType'
            | 'suggestedAreaSize'
            | 'suggestedRoomSize'
            | 'planType'
            | 'size'
          > & {
              preview: Array<
                { __typename?: 'DesignRoomImageNode' } & Pick<
                  Types.DesignRoomImageNode,
                  'image'
                >
              >;
            }
        >;
      }
  >;
};

export const GetDesignDocument = gql`
  query GetDesign($id: String!) {
    design(id: $id) {
      projectName
      id
      style
      description
      area
      price
      designType
      liked
      bookmarked
      numberOfLikes
      numberOfViews
      numberOfQuestions
      numberOfBookmarks
      typeOfHouse
      estimateCostFrom
      estimateCostTo
      registeredDesignNumber
      kitchens
      livingRooms
      bathrooms
      bedrooms
      others
      reviewedOnDate
      thumbnail
      tower
      unitType
      bought
      layout {
        image
      }
      questionAnswer(level: 0, last: 4) {
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
            answer(last: 3) {
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
      wholeHouse {
        edges {
          node {
            id
            roomType
            preview {
              image
            }
          }
        }
      }
      room {
        roomType
        suggestedAreaSize
        suggestedRoomSize
        planType
        size
        preview {
          image
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetDesignGQL extends Apollo.Query<
  GetDesignQuery,
  GetDesignQueryVariables
> {
  document = GetDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
