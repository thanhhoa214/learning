import { Injectable } from "@angular/core";
import { Mutation as ApolloMutation } from "apollo-angular";
import gql from "graphql-tag";
import {
  Mutation,
  MutationConstructionReviewUpdateArgs,
} from "@loa-shared/models/graphql.model";

@Injectable({ providedIn: "root" })
export class UpdateReviewConstructorMutation extends ApolloMutation<
  Mutation,
  MutationConstructionReviewUpdateArgs
> {
  document = gql`
    mutation UpdateReviewConstructorMutation(
      $input: ConstructionReviewUpdateInput!
    ) {
      constructionReviewUpdate(input: $input) {
        errors {
          code
          field
          message
        }
        status
      }
    }
  `;
}
