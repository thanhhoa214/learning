import { Injectable } from "@angular/core";
import {
  MutationConstructionReviewCreateArgs,
  MutationConstructionReviewDeleteArgs,
  MutationConstructionReviewUpdateArgs,
  QueryConstructionReviewArgs,
  QueryConstructionReviewsArgs,
} from "@loa-shared/models/graphql.model";
import { CreateReviewConstructorMutation } from "./graphql/mutations";
import { DeleteReviewConstructorMutation } from "./graphql/mutations/delete-review-constructor.mutation";
import { UpdateReviewConstructorMutation } from "./graphql/mutations/update-rreview-constructor.mutation";
import {
  GetAllReviewConstructor,
  GetByIdReviewConstructionQuery,
} from "./graphql/queries";

@Injectable({
  providedIn: "root",
})
export class ReviewConstructorService {
  constructor(
    private _getAllReview: GetAllReviewConstructor,
    private _deleteReview: DeleteReviewConstructorMutation,
    private _getReviewByID: GetByIdReviewConstructionQuery,
    private _updateReview: UpdateReviewConstructorMutation,
    private _createReview: CreateReviewConstructorMutation
  ) {}

  createReviewConstructor(args: MutationConstructionReviewCreateArgs) {
    return this._createReview.mutate(args);
  }

  getAllReview(args?: QueryConstructionReviewsArgs) {
    return this._getAllReview.watch(args).valueChanges;
  }

  deleteReview(args: MutationConstructionReviewDeleteArgs) {
    return this._deleteReview.mutate(args);
  }

  getReviewByID(args?: QueryConstructionReviewArgs) {
    return this._getReviewByID.watch(args).valueChanges;
  }

  updateReviewConstructor(args: MutationConstructionReviewUpdateArgs) {
    return this._updateReview.mutate(args);
  }
}
