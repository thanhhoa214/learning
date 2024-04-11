import { ReplyCommentDesignMutationVariables } from "@loa-mobile/design/shared/services/design-comment-reply.mutation.g";
import {
  GetDesignQueryVariables,
  LikeDesignMutationVariables,
  BookmarkDesignMutationVariables,
  CreateCommentDesignMutationVariables,
  DeleteCommentDesignMutationVariables,
  RequestDesignMutationVariables,
  DesignCommentMoreQueryVariables,
  DesignCommentReplyMoreQueryVariables,
} from "../../shared/services";

const enum Actions {
  LOAD_DESIGN_DETAIL = "[DesignDetail] Load Design Detail",
  LOAD_MORE_COMMENT = "[DesignDetail] Load More Comment",
  LOAD_MORE_REPLY = "[DesignDetail] Load More Reply",
  LIKE = "[DesignDetail] Like Design Detail",
  LIKE_STATIC = "[DesignDetail] Like Design Detail Static",
  BOOKMARK = "[DesignDetail] Bookmark Design Detail",
  BOOKMARK_STATIC = "[DesignDetail] Bookmark Design Detail Static",
  CLEAR = "[DesignDetail] Clear Design Detail",
  COMMENT = "[DesignDetail] Comment Design Detail",
  REPLY = "[DesignDetail] Reply Design Detail",
  DELETE_COMMENT = "[DesignDetail] Delete Comment Design Detail",
  REQUEST = "[DesignDetail] Request Design Detail",
  REQUEST_SUCCESSFUL = "[DesignDetail] Request Design Detail Successful",
}

export class LoadDesignDetail {
  static readonly type = Actions.LOAD_DESIGN_DETAIL;
  constructor(public payload: GetDesignQueryVariables) {}
}
export class LoadMoreComment {
  static readonly type = Actions.LOAD_MORE_COMMENT;
  constructor(public payload: DesignCommentMoreQueryVariables) {}
}
export class LoadMoreReply {
  static readonly type = Actions.LOAD_MORE_REPLY;
  constructor(public payload: DesignCommentReplyMoreQueryVariables) {}
}
export class LikeDesignDetail {
  static readonly type = Actions.LIKE;
  constructor(public payload: LikeDesignMutationVariables) {}
}
export class LikeStatic {
  static readonly type = Actions.LIKE_STATIC;
}
export class BookmarkDesignDetail {
  static readonly type = Actions.BOOKMARK;
  constructor(public payload: BookmarkDesignMutationVariables) {}
}
export class BookmarkStatic {
  static readonly type = Actions.BOOKMARK_STATIC;
}
export class ClearDesignDetail {
  static readonly type = Actions.CLEAR;
}
export class ReplyDesignDetail {
  static readonly type = Actions.REPLY;
  constructor(public payload: ReplyCommentDesignMutationVariables) {}
}
export class CommentDesignDetail {
  static readonly type = Actions.COMMENT;
  constructor(public payload: CreateCommentDesignMutationVariables) {}
}
export class DeleteCommentDesignDetail {
  static readonly type = Actions.DELETE_COMMENT;
  constructor(public payload: DeleteCommentDesignMutationVariables) {}
}
export class RequestDesignDetail {
  static readonly type = Actions.REQUEST;
  constructor(public payload: RequestDesignMutationVariables) {}
}
export class RequestDesignDetailSuccessful {
  static readonly type = Actions.REQUEST_SUCCESSFUL;
}
