import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetConstructionQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetConstructionQuery = {
  construction?: Types.Maybe<
    { __typename?: 'UserNode' } & Pick<
      Types.UserNode,
      'id' | 'avatar' | 'email' | 'phone'
    > & {
        business: Array<
          { __typename?: 'BusinessNode' } & Pick<Types.BusinessNode, 'taxCode'>
        >;
        constructorCompany?: Types.Maybe<
          { __typename?: 'ConstructorNode' } & Pick<
            Types.ConstructorNode,
            | 'id'
            | 'companyPhone'
            | 'companyName'
            | 'experiences'
            | 'country'
            | 'city'
            | 'address'
            | 'website'
            | 'hotline'
            | 'introduction'
            | 'rating'
          > & {
              portfolio: { __typename?: 'PortfolioNodeConnection' } & {
                edges: Array<
                  Types.Maybe<
                    { __typename?: 'PortfolioNodeEdge' } & {
                      node?: Types.Maybe<
                        { __typename?: 'PortfolioNode' } & Pick<
                          Types.PortfolioNode,
                          'id' | 'projectName'
                        > & {
                            images: Array<
                              { __typename?: 'PortfolioImageNode' } & Pick<
                                Types.PortfolioImageNode,
                                'image'
                              >
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
  >;
  constructionReviews?: Types.Maybe<
    { __typename?: 'ConstructionReviewNodeConnection' } & Pick<
      Types.ConstructionReviewNodeConnection,
      'totalCount'
    >
  >;
};

export const GetConstructionDocument = gql`
  query GetConstruction($id: String!) {
    construction: constructor(id: $id) {
      id
      avatar
      email
      phone
      business {
        taxCode
      }
      constructorCompany: constructor {
        id
        companyPhone
        companyName
        experiences
        country
        city
        address
        website
        hotline
        introduction
        rating
        portfolio {
          edges {
            node {
              id
              projectName
              images {
                image
              }
            }
          }
        }
      }
    }
    constructionReviews(construction: $id) {
      totalCount
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetConstructionGQL extends Apollo.Query<
  GetConstructionQuery,
  GetConstructionQueryVariables
> {
  document = GetConstructionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
