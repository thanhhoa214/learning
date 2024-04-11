import {
  ArticleCommentCreateInput,
  ArticleDeleteInput,
  ArticleUserFollowInput,
  ArticleUserLikesInput,
  QueryArticlesArgs,
} from "@loa-shared/models/graphql.model";

const enum AddminActions {
  LOAD_ARTICLE = "[Admin Load Article] Load Article",
  LOAD_ARTICLE_BY_ID = "[Admin Load Article By ID] Load Article By ID",
  LOAD_MORE_COMMENT = "[Admin Load More comment] Load More comment",
  LOAD_MORE_REPLY = "[Admin Load More reply] Load More reply",
  LOAD_MORE_LIFE_STYLE = "[Admin Load More Life Style] Load More Life Style",
  COMMENT_LIFE_STYLE_DETAIL = "[Admin Comment Life Style Detail] Comment Life Style Detail ID",
  COMMENT_LIFE_STYLE_DETAIL_SUCCESSFUL = "[Admin Comment Life Style Detail Successful] Comment Life Style Detail Successful ID",
  COMMENT_LIFE_STYLE_DETAIL_FAIL = "[Admin Comment Life Style Detail Fail] Comment Style Detail Fail ID",
  REPLY_LIFE_STYLE_DETAIL = "[Admin Reply Life Style Detail] Reply Life Style Detail ID",
  REPLY_LIFE_STYLE_DETAIL_SUCCESSFUL = "[Admin Reply Life Style Detail Successful] Reply Life Style Detail Successful ID",
  REPLY_LIFE_STYLE_DETAIL_FAIL = "[Admin Reply Life Style Detail Fail] Reply Style Detail Fail ID",
  DELETE_COMMENT = "[User Delete Comment] User Delete Comment",
  DELETE_REPLY = "[User Delete Reply] User Delete Reply",
  BOOKMARK_LIFE_STYLE_LISTING = "[Bookmark Life Style Listing] Bookmark Life Style Listing",
  LIKE_LIFE_STYLE_LISTING = "[Like Life Style Listing] Like Life Style Listing",
  BOOKMARK_LIFE_STYLE_DETAIL = "[Bookmark Life Style Detail] Bookmark Life Style Detail",
  LIKE_LIFE_STYLE_DETAIL = "[Like Life Style Detail] Like Life Style Detail",
}

export class LoadLifeStyle {
  static readonly type = AddminActions.LOAD_ARTICLE;
  constructor(public readonly payload?: QueryArticlesArgs) {}
}

export class LoadMoreLifeStyle {
  static readonly type = AddminActions.LOAD_MORE_LIFE_STYLE;
  constructor(public readonly payload?: QueryArticlesArgs) {}
}

export class LoadLifeStyleByID {
  static readonly type = AddminActions.LOAD_ARTICLE_BY_ID;
  constructor(public readonly payload?: any) {}
}

export class LoadMoreComment {
  static readonly type = AddminActions.LOAD_MORE_COMMENT;
  constructor(public readonly payload?: any) {}
}

export class LoadMoreReply {
  static readonly type = AddminActions.LOAD_MORE_REPLY;
  constructor(public readonly payload?: any) {}
}

export class CommentLifeStyleDetail {
  static readonly type = AddminActions.COMMENT_LIFE_STYLE_DETAIL;
  constructor(public readonly payload?: ArticleCommentCreateInput) {}
}

export class CommentLifeStyleDetailSuccessful {
  static readonly type = AddminActions.COMMENT_LIFE_STYLE_DETAIL_SUCCESSFUL;
  constructor(public readonly payload?: any) {}
}

export class CommentLifeStyleDetailFail {
  static readonly type = AddminActions.COMMENT_LIFE_STYLE_DETAIL_FAIL;
  constructor(public readonly payload?: any) {}
}

export class ReplyLifeStyleDetail {
  static readonly type = AddminActions.REPLY_LIFE_STYLE_DETAIL;
  constructor(public readonly payload?: ArticleCommentCreateInput) {}
}

export class ReplyLifeStyleDetailSuccessful {
  static readonly type = AddminActions.REPLY_LIFE_STYLE_DETAIL_SUCCESSFUL;
  constructor(public readonly payload?: any) {}
}

export class ReplyLifeStyleDetailFail {
  static readonly type = AddminActions.REPLY_LIFE_STYLE_DETAIL_FAIL;
  constructor(public readonly payload?: any) {}
}

export class DeleteComment {
  static readonly type = AddminActions.DELETE_COMMENT;
  constructor(public readonly payload?: ArticleDeleteInput) {}
}

export class DeleteReply {
  static readonly type = AddminActions.DELETE_REPLY;
  constructor(public readonly payload?: ArticleDeleteInput) {}
}

export class BookmarkLifeStyleListing {
  static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_LISTING;
  constructor(public readonly payload?: ArticleUserFollowInput) {}
}

export class LikeLifeStyleListing {
  static readonly type = AddminActions.LIKE_LIFE_STYLE_LISTING;
  constructor(public readonly payload?: ArticleUserLikesInput) {}
}

export class BookmarkLifeStyleDetail {
  static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_DETAIL;
  constructor(public readonly payload?: ArticleUserFollowInput) {}
}

export class LikeLifeStyleDetail {
  static readonly type = AddminActions.LIKE_LIFE_STYLE_DETAIL;
  constructor(public readonly payload?: ArticleUserLikesInput) {}
}
