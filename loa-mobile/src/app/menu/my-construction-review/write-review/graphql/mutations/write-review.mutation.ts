import { Injectable } from "@angular/core";
import { Mutation as ApolloMutation } from "apollo-angular";
import gql from "graphql-tag";
import {
  Mutation,
  MutationConstructionReviewCreateArgs,
} from "@loa-shared/models/graphql.model";

@Injectable({
  providedIn: "root",
})
export class CreateReviewConstructorMutation extends ApolloMutation<
  Mutation,
  MutationConstructionReviewCreateArgs
> {
  document = gql`
    mutation CreateReviewConstructorMutation(
      $input: ConstructionReviewCreateInput!
    ) {
      constructionReviewCreate(input: $input) {
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
