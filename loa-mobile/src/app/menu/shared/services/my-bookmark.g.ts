import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllMyBookmarkMenuQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  designId?: Types.Maybe<Types.Scalars['String']>;
  userId?: Types.Maybe<Types.Scalars['String']>;
  searchBy?: Types.Maybe<Types.Scalars['String']>;
  orderBy?: Types.Maybe<Types.Scalars['String']>;
}>;

export type AllMyBookmarkMenuQuery = {
  designsBookmarks?: Types.Maybe<
    { __typename?: 'DesignBookmarksNodeConnection' } & Pick<
      Types.DesignBookmarksNodeConnection,
      'totalCount'
    > & {
        edges: Array<
          Types.Maybe<
            { __typename?: 'DesignBookmarksNodeEdge' } & Pick<
              Types.DesignBookmarksNodeEdge,
              'cursor'
            > & {
                node?: Types.Maybe<
                  { __typename?: 'DesignBookmarksNode' } & Pick<
                    Types.DesignBookmarksNode,
                    'created' | 'id'
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
                        | 'thumbnail'
                      > & {
                          wholeHouse?: Types.Maybe<
                            {
                              __typename?: 'DesignWholeHouseNodeConnection';
                            } & {
                              edges: Array<
                                Types.Maybe<
                                  {
                                    __typename?: 'DesignWholeHouseNodeEdge';
                                  } & {
                                    node?: Types.Maybe<
                                      {
                                        __typename?: 'DesignWholeHouseNode';
                                      } & {
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
                      user: { __typename?: 'UserNode' } & Pick<
                        Types.UserNode,
                        'firstName' | 'lastName'
                      > & {
                          bookmarks: {
                            __typename?: 'DesignBookmarksNodeConnection';
                          } & Pick<
                            Types.DesignBookmarksNodeConnection,
                            'totalCount'
                          > & {
                              edges: Array<
                                Types.Maybe<
                                  {
                                    __typename?: 'DesignBookmarksNodeEdge';
                                  } & Pick<
                                    Types.DesignBookmarksNodeEdge,
                                    'cursor'
                                  > & {
                                      node?: Types.Maybe<
                                        {
                                          __typename?: 'DesignBookmarksNode';
                                        } & Pick<
                                          Types.DesignBookmarksNode,
                                          'created' | 'id'
                                        >
                                      >;
                                    }
                                >
                              >;
                              pageInfo: { __typename?: 'PageInfo' } & Pick<
                                Types.PageInfo,
                                | 'endCursor'
                                | 'hasNextPage'
                                | 'hasPreviousPage'
                                | 'startCursor'
                              >;
                            };
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

export const AllMyBookmarkMenuDocument = gql`
  query AllMyBookmarkMenu(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $designId: String
    $userId: String
    $searchBy: String
    $orderBy: String
  ) {
    designsBookmarks(
      before: $before
      after: $after
      first: $first
      last: $last
      designId: $designId
      userId: $userId
      searchBy: $searchBy
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          created
          id
          design {
            id
            projectName
            typeOfHouse
            designType
            price
            area
            style
            thumbnail
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
          user {
            firstName
            lastName
            bookmarks {
              totalCount
              edges {
                cursor
                node {
                  created
                  id
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
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
export class AllMyBookmarkMenuGQL extends Apollo.Query<
  AllMyBookmarkMenuQuery,
  AllMyBookmarkMenuQueryVariables
> {
  document = AllMyBookmarkMenuDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
