import { Injectable } from "@angular/core";
import {
  ArticleNode,
  MutationArticleCommentCreateArgs,
  MutationArticleDeleteArgs,
  MutationArticleUserFollowArgs,
  MutationArticleUserLikeArgs,
  QueryArticleArgs,
  QueryArticlesArgs,
} from "@loa-shared/models/graphql.model";
import { DeleteCommentMutation } from "../shared/graphql/mutations";
import { BookmarkLifeStyleMutation } from "../shared/graphql/mutations/bookmark-life-style.mutation";
import { CommentLifeStyleMutation } from "../shared/graphql/mutations/comment-life-style.mutation";
import { LikeLifeStyleMutation } from "../shared/graphql/mutations/like-life-style.mutation";
import {
  GetAllArticle,
  GetBookmarkLikeQuery,
  GetByIdArticleQuery,
} from "../shared/graphql/queries";
import { GetAllBookmarkLike } from "../shared/graphql/queries/get-all-bookmark-like.query";
import { LoadMoreCommentQuery } from "../shared/graphql/queries/load-more-comment.query";
import { LoadMoreReplyQuery } from "../shared/graphql/queries/load-more-reply.query";
import { SocialShareService } from "@loa-shared/services/social-share.service";
import { ShareTypes } from "@loa-shared/models";
@Injectable({
  providedIn: "root",
})
export class LifeStyleService {
  constructor(
    private _getAllArticle: GetAllArticle,
    private _getArticleByID: GetByIdArticleQuery,
    private _getBookmarkLike: GetBookmarkLikeQuery,
    private _bookmarkLifeStyle: BookmarkLifeStyleMutation,
    private _likeLifeStyle: LikeLifeStyleMutation,
    private _getAllBookmarkLike: GetAllBookmarkLike,
    private _commentLifeStyle: CommentLifeStyleMutation,
    private _loadMoreComment: LoadMoreCommentQuery,
    private _loadMoreReply: LoadMoreReplyQuery,
    private _deleteComment: DeleteCommentMutation,
    private _socialShare: SocialShareService
  ) {}

  getAllArticle(args?: QueryArticlesArgs) {
    return this._getAllArticle.watch(args).valueChanges;
  }

  getArticleByID(args?: QueryArticleArgs) {
    return this._getArticleByID.watch(args).valueChanges;
  }

  getBookmarkLike(args?: QueryArticleArgs) {
    return this._getBookmarkLike.watch(args).valueChanges;
  }

  bookmarkLifeStyle(args: MutationArticleUserFollowArgs) {
    return this._bookmarkLifeStyle.mutate(args);
  }

  likeLifeStyle(args: MutationArticleUserLikeArgs) {
    return this._likeLifeStyle.mutate(args);
  }

  getAllBookmarkLike(args?: QueryArticlesArgs) {
    return this._getAllBookmarkLike.watch(args).valueChanges;
  }

  commentLifeStyle(args: MutationArticleCommentCreateArgs) {
    return this._commentLifeStyle.mutate(args);
  }

  loadMoreComment(args?: QueryArticleArgs) {
    return this._loadMoreComment.watch(args).valueChanges;
  }

  loadMoreReply(args?: QueryArticleArgs) {
    return this._loadMoreReply.watch(args).valueChanges;
  }

  comment(args: MutationArticleCommentCreateArgs) {
    return this._commentLifeStyle.mutate(args);
  }

  deleteComment(args: MutationArticleDeleteArgs) {
    return this._deleteComment.mutate(args);
  }

  async share(lifeStyle: ArticleNode, type: ShareTypes) {
    const routingUrl = `/life-style/${lifeStyle.id}`;
    return this._socialShare.share(
      {
        link: routingUrl,
        title: lifeStyle.title,
        message: lifeStyle.title,
        thumbnailUrl: lifeStyle.thumbnail,
      },
      type
    );
  }
}
