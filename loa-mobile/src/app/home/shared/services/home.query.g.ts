import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetHomeDataQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetHomeDataQuery = {
  banners?: Types.Maybe<
    { __typename?: 'BannerNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'BannerNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'BannerNode' } & Pick<Types.BannerNode, 'file'> & {
                  linkTo: Array<
                    { __typename?: 'BannerLinkContentPageNode' } & {
                      contentPage: { __typename?: 'ContentPageNode' } & Pick<
                        Types.ContentPageNode,
                        'id'
                      >;
                    }
                  >;
                }
            >;
          }
        >
      >;
    }
  >;
  designs?: Types.Maybe<
    { __typename?: 'DesignNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'DesignNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'DesignNode' } & Pick<
                Types.DesignNode,
                | 'thumbnail'
                | 'id'
                | 'projectName'
                | 'area'
                | 'style'
                | 'tower'
                | 'unitType'
                | 'designType'
                | 'typeOfHouse'
                | 'registeredDesignNumber'
              > & {
                  room?: Types.Maybe<
                    { __typename?: 'DesignRoomNode' } & Pick<
                      Types.DesignRoomNode,
                      'roomType'
                    >
                  >;
                }
            >;
          }
        >
      >;
    }
  >;
  topicsWithoutImage?: Types.Maybe<
    { __typename?: 'TopicNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'TopicNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'TopicNode' } & Pick<
                Types.TopicNode,
                'id' | 'content'
              >
            >;
          }
        >
      >;
    }
  >;
  topicsWithImage?: Types.Maybe<
    { __typename?: 'TopicNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'TopicNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'TopicNode' } & Pick<
                Types.TopicNode,
                'id' | 'content'
              > & {
                  images: Array<
                    { __typename?: 'TopicImageNode' } & Pick<
                      Types.TopicImageNode,
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
  articles?: Types.Maybe<
    { __typename?: 'ArticleNodeConnection' } & {
      edges: Array<
        Types.Maybe<
          { __typename?: 'ArticleNodeEdge' } & {
            node?: Types.Maybe<
              { __typename?: 'ArticleNode' } & Pick<
                Types.ArticleNode,
                'id' | 'title' | 'thumbnail'
              >
            >;
          }
        >
      >;
    }
  >;
};

export const GetHomeDataDocument = gql`
  query GetHomeData {
    banners(first: 15, orderBy: "sort_order") {
      edges {
        node {
          file
          linkTo {
            contentPage {
              id
            }
          }
        }
      }
    }
    designs(first: 3, orderBy: "-id") {
      edges {
        node {
          thumbnail
          id
          projectName
          area
          style
          tower
          unitType
          designType
          typeOfHouse
          registeredDesignNumber
          room {
            roomType
          }
        }
      }
    }
    topicsWithoutImage: topics(
      first: 3
      orderBy: "-id"
      level: 0
      hasContent: true
    ) {
      edges {
        node {
          id
          content
        }
      }
    }
    topicsWithImage: topics(
      hasImages: true
      first: 8
      orderBy: "-number_of_views"
      level: 0
    ) {
      edges {
        node {
          id
          content
          images {
            image
          }
        }
      }
    }
    articles(first: 8, orderBy: "-id", level: 0) {
      edges {
        node {
          id
          title
          thumbnail
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetHomeDataGQL extends Apollo.Query<
  GetHomeDataQuery,
  GetHomeDataQueryVariables
> {
  document = GetHomeDataDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
