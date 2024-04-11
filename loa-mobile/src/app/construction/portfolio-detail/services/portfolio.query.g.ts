import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetPortfolioQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetPortfolioQuery = {
  portfolio?: Types.Maybe<
    { __typename?: 'PortfolioNode' } & Pick<
      Types.PortfolioNode,
      | 'id'
      | 'area'
      | 'description'
      | 'location'
      | 'period'
      | 'projectName'
      | 'projectType'
      | 'style'
      | 'totalCostFrom'
      | 'totalCostTo'
    > & {
        images: Array<
          { __typename?: 'PortfolioImageNode' } & Pick<
            Types.PortfolioImageNode,
            'image'
          >
        >;
      }
  >;
};

export const GetPortfolioDocument = gql`
  query GetPortfolio($id: String!) {
    portfolio(id: $id) {
      id
      area
      description
      images {
        image
      }
      location
      period
      projectName
      projectType
      style
      totalCostFrom
      totalCostTo
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetPortfolioGQL extends Apollo.Query<
  GetPortfolioQuery,
  GetPortfolioQueryVariables
> {
  document = GetPortfolioDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
