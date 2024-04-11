import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import {
  Query as ParentQuery,
  QueryConstructionReviewArgs,
} from "@loa-shared/models/graphql.model";

const getReviewConstructionId = gql`
  query GetReviewId($id: String!) {
    __typename
    constructionReview(id: $id) {
      areaSize
      constructionCostFrom
      constructionCostTo
      constructionLocation
      constructionPeriod
      district
      city
      construction {
        id
        user {
          avatar
        }
        companyName
      }
      designStyle
      id
      images {
        id
        image
      }
      phoneNumber
      rating
      review
      reviewer {
        avatar
        id
      }
    }
  }
`;
@Injectable({ providedIn: "root" })
export class GetByIdReviewConstructionQuery extends Query<
  ParentQuery,
  QueryConstructionReviewArgs
> {
  document = getReviewConstructionId;
}
