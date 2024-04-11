import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import {
  Query as ParentQuery,
  QueryConstructionReviewsArgs,
} from "@loa-shared/models/graphql.model";

const getAllReviewConstructor = gql`
  query AllReviewConstructor(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $construction: String
    $reviewer: String
  ) {
    constructionReviews(
      before: $before
      after: $after
      first: $first
      last: $last
      orderBy: "-id"
      construction: $construction
      reviewer: $reviewer
    ) {
      edges {
        node {
          areaSize
          id
          phoneNumber
          images {
            id
            image
          }
          rating
          review
          constructionCostFrom
          constructionCostTo
          constructionLocation
          designStyle
          constructionPeriod
          district
          city
          construction {
            companyName
            companyPhone
            user {
              avatar
            }
          }
          reviewer {
            avatar
            id
            firstName
            lastName
            phone
            constructor {
              companyName
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
@Injectable({ providedIn: "root" })
export class GetAllReviewConstructor extends Query<
  ParentQuery,
  QueryConstructionReviewsArgs
> {
  document = getAllReviewConstructor;
}
