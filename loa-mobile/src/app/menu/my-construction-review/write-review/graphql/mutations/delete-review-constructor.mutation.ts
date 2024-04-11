import { Injectable } from "@angular/core";
import { Mutation as ApolloMutation } from "apollo-angular";
import gql from "graphql-tag";
import {
  Mutation,
  MutationConstructionReviewDeleteArgs,
} from "@loa-shared/models/graphql.model";

@Injectable({
  providedIn: "root",
})
export class DeleteReviewConstructorMutation extends ApolloMutation<
  Mutation,
  MutationConstructionReviewDeleteArgs
> {
  document = gql`
    mutation DeleteReviewConstructorMutation(
      $input: ConstructionReviewDeleteInput!
    ) {
      constructionReviewDelete(input: $input) {
        errors {
          field
          code
          message
        }
        status
      }
    }
  `;
}
