import {
  ConstructionReviewCreateInput,
  ConstructionReviewDeleteInput,
  ConstructionReviewUpdateInput,
  QueryConstructionReviewArgs,
} from "@loa-shared/models/graphql.model";

const enum ReviewActions {
  WRITE_REVIEW_CONSTRUCTOR = "[Review constructor Create] Create Interior Share ",
  WRITE_REVIEW_CONSTRUCTOR_SUCCESSFUL = "[Review constructor  Create Succesfully] Create Review constructor Successfully",
  WRITE_REVIEW_CONSTRUCTOR_FAILED = "[Review constructor  Create Fail] Create Review constructor Failed",
  LOAD_REVIEW_CONSTRUCTOR = "[Load All Review Constructor] Load Review Constructor All",
  LOAD_MORE_REVIEW_CONSTRUCTOR = "[Load More Review Constructor] Load More Review Constructor",
  DELETE_REVIEW_CONSTRUCTOR = "[Delete Review Constructor] Delete Review Constructor",
  DELETE_REVIEW_CONSTRUCTOR_FAIL = "[Delete Review Constructor Fail] Delete Review Constructor Fail",
  LOAD_REVIEW_CONSTRUCTOR_ID = "[Load Review Constructor By Id] Load Review Constructor By Id",
  UPDATE_REVIEW = "[User Update Review] Admin Update Review",
  UPDATE_REVIEW_SUCCESSFUL = "[User Update Review] User Update Review Successfully",
  UPDATE_REVIEW_FAILED = "[User Update Review] User Update Review Failed",
}
export class WriteReviewConstructor {
  static readonly type = ReviewActions.WRITE_REVIEW_CONSTRUCTOR;
  constructor(public readonly payload: ConstructionReviewCreateInput) {}
}
export class WriteReviewConstructorSuccessful {
  static readonly type = ReviewActions.WRITE_REVIEW_CONSTRUCTOR_SUCCESSFUL;
  constructor(public readonly payload: any) {}
}
export class WriteReviewConstructorFailed {
  static readonly type = ReviewActions.WRITE_REVIEW_CONSTRUCTOR_FAILED;
  constructor(public readonly payload: any) {}
}

export class LoadReviewConstructor {
  static readonly type = ReviewActions.LOAD_REVIEW_CONSTRUCTOR;
  constructor(public readonly payload?: any) {}
}

export class LoadMoreReviewConstructor {
  static readonly type = ReviewActions.LOAD_MORE_REVIEW_CONSTRUCTOR;
  constructor(public readonly payload?: any) {}
}

export class DeleteReviewConstructor {
  static readonly type = ReviewActions.DELETE_REVIEW_CONSTRUCTOR;
  constructor(public readonly payload?: ConstructionReviewDeleteInput) {}
}

export class DeleteReviewConstructorFail {
  static readonly type = ReviewActions.DELETE_REVIEW_CONSTRUCTOR_FAIL;
  constructor(public readonly payload?: any) {}
}

export class LoadReviewConstructorById {
  static readonly type = ReviewActions.LOAD_REVIEW_CONSTRUCTOR_ID;
  constructor(public readonly payload?: QueryConstructionReviewArgs) {}
}

export class UpdateReviewConstructor {
  static readonly type = ReviewActions.UPDATE_REVIEW;
  constructor(public readonly payload: ConstructionReviewUpdateInput) {}
}

export class UpdateReviewConstructorSuccessful {
  static readonly type = ReviewActions.UPDATE_REVIEW_SUCCESSFUL;
  constructor(public readonly payload: any) {}
}

export class UpdateReviewConstructorFailed {
  static readonly type = ReviewActions.UPDATE_REVIEW_FAILED;
  constructor(public readonly payload: any) {}
}
