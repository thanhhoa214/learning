import {
  QueryTopicsArgs,
  TopicCommentCreateInput,
  TopicCreateInput,
  TopicDeleteInput,
  TopicUpdateInput,
  TopicUserFollowInput,
  TopicUserLikesInput
} from '@loa-shared/models/graphql.model';

const enum AddminActions {
  LOAD_INTERIOR_SHARE = '[Admin Load Topic] Load Topic',
  LOAD_INTERIOR_SHARE_BY_ID = '[Admin Load Topic By ID] Load Topic By ID',
  CREATE_INTERIOR_SHARE = '[Admin Interior Share Create] Create Interior Share ',
  CREATE_INTERIOR_SHARE_SUCCESSFUL = '[Admin Interior Share  Create Succesfully] Create Interior Share Successfully',
  CREATE_INTERIOR_SHARE_FAILED = '[Admin Interior Share  Create Fail] Create Interior Share  Failed',
  UPDATE_TOPIC = '[Admin Update Topic] Admin Update Topic',
  UPDATE_TOPIC_SUCCESSFUL = '[Admin Update Topic] Admin Update Topic Successfully',
  UPDATE_TOPIC_FAILED = '[Admin Update Topic] Admin Update Topic Failed',
  DELETE_TOPIC = '[Admin Delete Topic] Admin Topic Delete',
  DELETE_TOPIC_SUCCESSFUL = '[Admin Delete Topic Successfully] Admin Topic Delete Successfully',
  DELETE_TOPIC_FAILED = '[Admin Delete Topic Failed] Admin Topic Delete Failed',
  LOAD_MORE_COMMENT_INTERIOR = '[Admin Load More comment Interior Share] Load More comment Interior Share',
  LOAD_MORE_REPLY_INTERIOR = '[Admin Load More reply Interior Share] Load More reply Interior Share',
  LOAD_MORE_COMMENT_INTERIOR_LISTING = '[Admin Load More comment Interior Share Listing] Load More comment Interior Share Listing',
  LOAD_MORE_REPLY_INTERIOR_LISTING = '[Admin Load More reply Interior Share Listing] Load More reply Interior Share Listing',
  LOAD_MORE_INTERIOR_SHARE = '[Admin Load More Interior Share] Load More Interior Share',
  COMMENT_INTERIOR_SHARE_DETAIL = '[Admin Comment Interior Share Detail] Comment Interior Share Detail ID',
  COMMENT_INTERIOR_SHARE_DETAIL_SUCCESSFUL = '[Admin Comment Interior Share Detail Successful] Comment Interior Share Detail Successful ID',
  COMMENT_INTERIOR_SHARE_DETAIL_FAIL = '[Admin Comment Interior Share Detail Fail] Comment Interior Share Detail Fail ID',
  REPLY_INTERIOR_SHARE_DETAIL = '[Admin Reply Interior Share Detail] Reply Interior Share Detail ID',
  REPLY_INTERIOR_SHARE_DETAIL_SUCCESSFUL = '[Admin Reply Interior Share Detail Successful] Reply Interior Share Detail',
  REPLY_INTERIOR_SHARE_DETAIL_FAIL = '[Admin Reply Interior Share Detail Fail] Reply Interior Share Detail Fail ID',
  DELETE_COMMENT_INTERIOR = '[User Delete Comment Interior] User Delete Comment Interior',
  DELETE_COMMENT_INTERIOR_SUCCESSFUL = '[User Delete Comment Interior] User Delete Comment Interior Successful',
  DELETE_REPLY_INTERIOR = '[User Delete Reply Interior] User Delete Reply Interior',
  COMMENT_INTERIOR_SHARE_LISTING = '[Admin Comment Interior Share Listing] Comment Interior Share Listing ID',
  COMMENT_INTERIOR_SHARE_LISTING_SUCCESSFUL = '[Admin Comment Interior Share Listing Successful] Comment Interior Share Listing Successful ID',
  COMMENT_INTERIOR_SHARE_LISTING_FAIL = '[Admin Comment Interior Share Listing Fail] Comment Interior Share Listing Fail ID',
  REPLY_INTERIOR_SHARE_LISTING = '[Admin Reply Interior Share Listing] Reply Interior Share Listing ID',
  REPLY_INTERIOR_SHARE_LISTING_SUCCESSFUL = '[Admin Reply Interior Share Listing Successful] Reply Interior Share Listing',
  REPLY_INTERIOR_SHARE_LISTING_FAIL = '[Admin Reply Interior Share Listing Fail] Reply Interior Share Listing Fail ID',
  DELETE_COMMENT_INTERIOR_LISTING = '[User Delete Comment Interior Listing] User Delete Comment Interior Listing',
  DELETE_REPLY_INTERIOR_LISTING = '[User Delete Reply Interior Listing] User Delete Reply Interior Listing',
  BOOKMARK_INTERIOR_SHARE_LISTING = '[Bookmark Interior Share Listing] Bookmark Interior Share Listing',
  LIKE_INTERIOR_SHARE_LISTING = '[Like Interior Share Listing] Like Interior Share Listing',
  BOOKMARK_INTERIOR_SHARE_DETAIL = '[Bookmark Interior Share Detail] Bookmark Interior Share Detail',
  LIKE_INTERIOR_SHARE_DETAIL = '[Like Interior Share Detail] Like Interior Share Detail'
}

export class LoadInteriorShare {
  static readonly type = AddminActions.LOAD_INTERIOR_SHARE;

  constructor(public readonly payload?: QueryTopicsArgs) {}
}

export class LoadMoreInteriorShare {
  static readonly type = AddminActions.LOAD_MORE_INTERIOR_SHARE;

  constructor(public readonly payload?: QueryTopicsArgs) {}
}

export class LoadInteriorShareByID {
  static readonly type = AddminActions.LOAD_INTERIOR_SHARE_BY_ID;

  constructor(public readonly payload?: any) {}
}

export class PostInteriorShare {
  static readonly type = AddminActions.CREATE_INTERIOR_SHARE;

  constructor(public readonly payload: TopicCreateInput) {}
}
export class PostInteriorShareSuccessful {
  static readonly type = AddminActions.CREATE_INTERIOR_SHARE_SUCCESSFUL;

  constructor(public readonly payload: any) {}
}
export class PostInteriorShareFailed {
  static readonly type = AddminActions.CREATE_INTERIOR_SHARE_FAILED;

  constructor(public readonly payload: any) {}
}

export class AdminUpdateTopic {
  static readonly type = AddminActions.UPDATE_TOPIC;

  constructor(public readonly payload: TopicUpdateInput) {}
}

export class AdminUpdateTopicSuccessful {
  static readonly type = AddminActions.UPDATE_TOPIC_SUCCESSFUL;

  constructor(public readonly payload: any) {}
}

export class AdminUpdateTopicFailed {
  static readonly type = AddminActions.UPDATE_TOPIC_FAILED;

  constructor(public readonly payload: any) {}
}

export class AdminDeleteTopic {
  static readonly type = AddminActions.DELETE_TOPIC;

  constructor(public readonly payload: TopicDeleteInput) {}
}

export class AdminDeleteTopicSuccessful {
  static readonly type = AddminActions.DELETE_TOPIC_SUCCESSFUL;

  constructor(public readonly payload: any) {}
}
export class AdminDeleteTopicFailed {
  static readonly type = AddminActions.DELETE_TOPIC_FAILED;

  constructor(public readonly payload: any) {}
}

export class LoadMoreCommentInteriorShare {
  static readonly type = AddminActions.LOAD_MORE_COMMENT_INTERIOR;

  constructor(public readonly payload?: any) {}
}

export class LoadMoreCommentInteriorShareListing {
  static readonly type = AddminActions.LOAD_MORE_COMMENT_INTERIOR_LISTING;

  constructor(public readonly payload?: any) {}
}

export class LoadMoreReplyInteriorShare {
  static readonly type = AddminActions.LOAD_MORE_REPLY_INTERIOR;

  constructor(public readonly payload?: any) {}
}

export class LoadMoreReplyInteriorShareListing {
  static readonly type = AddminActions.LOAD_MORE_REPLY_INTERIOR_LISTING;

  constructor(public readonly payload?: any) {}
}

export class CommentInteriorShareDetail {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_DETAIL;

  constructor(public readonly payload?: TopicCommentCreateInput) {}
}

export class CommentInteriorShareDetailSuccessful {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_DETAIL_SUCCESSFUL;

  constructor(public readonly payload?: any) {}
}

export class CommentInteriorShareDetailFail {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_DETAIL_FAIL;

  constructor(public readonly payload?: any) {}
}

export class ReplyInteriorShareDetail {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_DETAIL;

  constructor(public readonly payload?: TopicCommentCreateInput) {}
}

export class ReplyInteriorShareDetailSuccessful {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_DETAIL_SUCCESSFUL;

  constructor(public readonly payload?: any) {}
}

export class ReplyInteriorShareDetailFail {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_DETAIL_FAIL;

  constructor(public readonly payload?: any) {}
}

export class DeleteCommentInterior {
  static readonly type = AddminActions.DELETE_COMMENT_INTERIOR;

  constructor(public readonly payload?: TopicDeleteInput) {}
}
export class DeleteCommentInteriorSuccessful {
  static readonly type = AddminActions.DELETE_COMMENT_INTERIOR_SUCCESSFUL;

  constructor(public readonly payload?: TopicDeleteInput) {}
}

export class DeleteReplyInterior {
  static readonly type = AddminActions.DELETE_REPLY_INTERIOR;

  constructor(public readonly payload?: TopicDeleteInput) {}
}

export class CommentInteriorShareListing {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_LISTING;

  constructor(public readonly payload?: TopicCommentCreateInput) {}
}

export class CommentInteriorShareListingSuccessful {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_LISTING_SUCCESSFUL;

  constructor(public readonly payload?: any) {}
}

export class CommentInteriorShareListingFail {
  static readonly type = AddminActions.COMMENT_INTERIOR_SHARE_LISTING_FAIL;

  constructor(public readonly payload?: any) {}
}

export class ReplyInteriorShareListing {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_LISTING;

  constructor(public readonly payload?: TopicCommentCreateInput) {}
}

export class ReplyInteriorShareListingSuccessful {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_LISTING_SUCCESSFUL;

  constructor(public readonly payload?: any) {}
}

export class ReplyInteriorShareListingFail {
  static readonly type = AddminActions.REPLY_INTERIOR_SHARE_LISTING_FAIL;

  constructor(public readonly payload?: any) {}
}

export class DeleteCommentInteriorListing {
  static readonly type = AddminActions.DELETE_COMMENT_INTERIOR_LISTING;

  constructor(public readonly payload?: TopicDeleteInput) {}
}

export class DeleteReplyInteriorListing {
  static readonly type = AddminActions.DELETE_REPLY_INTERIOR_LISTING;

  constructor(public readonly payload?: TopicDeleteInput) {}
}

export class BookmarkInteriorListing {
  static readonly type = AddminActions.BOOKMARK_INTERIOR_SHARE_LISTING;

  constructor(public readonly payload?: TopicUserFollowInput) {}
}

export class LikeInteriorShareListing {
  static readonly type = AddminActions.LIKE_INTERIOR_SHARE_LISTING;

  constructor(public readonly payload?: TopicUserLikesInput) {}
}

export class BookmarkInteriorDetail {
  static readonly type = AddminActions.BOOKMARK_INTERIOR_SHARE_DETAIL;

  constructor(public readonly payload?: TopicUserFollowInput) {}
}

export class LikeInteriorShareDetail {
  static readonly type = AddminActions.LIKE_INTERIOR_SHARE_DETAIL;

  constructor(public readonly payload?: TopicUserLikesInput) {}
}
