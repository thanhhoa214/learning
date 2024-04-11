import { Injectable } from '@angular/core';
import {
  MutationTopicCommentCreateArgs,
  MutationTopicCreateArgs,
  MutationTopicDeleteArgs,
  MutationTopicUpdateArgs,
  MutationTopicUserFollowArgs,
  MutationTopicUserLikeArgs,
  QueryTopicArgs,
  QueryTopicFollowsArgs,
  QueryTopicsArgs,
  TopicNode
} from '@loa-shared/models/graphql.model';
import { BookmarkInteriorShareMutation } from '../shared/graphql/mutations';
import { CommentInteriorShareMutation } from '../shared/graphql/mutations/comment-interior-share.mutation';
import { DeleteCommentInteriorMutation } from '../shared/graphql/mutations/delete-comment-interior-share.mutation';
import { AdminDeleteTopicMutation } from '../shared/graphql/mutations/delete-interior-share.mutation';
import { LikeInteriorShareMutation } from '../shared/graphql/mutations/like-interior-share.mutation';
import { CreateTopicMutation } from '../shared/graphql/mutations/post-interior-share.mutation';
import { AdminUpdateTopicMutation } from '../shared/graphql/mutations/update-interior-share.mưtation';
import { GetAllMyBookmark, GetAllTopic, GetByIdTopicQuery } from '../shared/graphql/queries';
import { GetAllBookmarkLikInterior } from '../shared/graphql/queries/get-all-bookmark-like.query';
import { GetBookmarkLikeQueryInterior } from '../shared/graphql/queries/get-bookmark-like.query';
import { LoadMoreCommentInterior } from '../shared/graphql/queries/load-more-comment-interior.query';
import { LoadMoreReplyInterior } from '../shared/graphql/queries/load-more-reply-interior.query';
import { SocialShareService } from '@loa-shared/services/social-share.service';
import { ShareTypes } from '@loa-shared/models';
@Injectable({
  providedIn: 'root'
})
export class InteriorShareApiService {
  constructor(
    private _getAllTopic: GetAllTopic,
    private _getTopicByID: GetByIdTopicQuery,
    private _getAllBookmarkLike: GetAllBookmarkLikInterior,
    private _bookmarkInterior: BookmarkInteriorShareMutation,
    private _likeInterior: LikeInteriorShareMutation,
    private _createTopic: CreateTopicMutation,
    private _updateTopic: AdminUpdateTopicMutation,
    private _deleteTopic: AdminDeleteTopicMutation,
    private _getAllMybookmark: GetAllMyBookmark,
    private _getBookmarkLike: GetBookmarkLikeQueryInterior,
    private _loadMoreComment: LoadMoreCommentInterior,
    private _loadMoreReply: LoadMoreReplyInterior,
    private _commentInteriorShare: CommentInteriorShareMutation,
    private _deleteComment: DeleteCommentInteriorMutation,
    private _socialShare: SocialShareService
  ) {}

  adminDeleteTopic(args: MutationTopicDeleteArgs) {
    return this._deleteTopic.mutate(args);
  }

  adminPostInteriorShare(args: MutationTopicCreateArgs) {
    return this._createTopic.mutate(args);
  }

  adminUpdateTopic(args: MutationTopicUpdateArgs) {
    return this._updateTopic.mutate(args);
  }

  bookmarkInterior(args: MutationTopicUserFollowArgs) {
    return this._bookmarkInterior.mutate(args);
  }

  comment(args: MutationTopicCommentCreateArgs) {
    return this._commentInteriorShare.mutate(args);
  }

  deleteComment(args: MutationTopicDeleteArgs) {
    return this._deleteComment.mutate(args);
  }

  getAllBookmarkLike(args?: QueryTopicsArgs) {
    return this._getAllBookmarkLike.watch(args).valueChanges;
  }

  getAllMyBookmark(args?: QueryTopicFollowsArgs) {
    return this._getAllMybookmark.watch(args).valueChanges;
  }

  getAllTopic(args?: QueryTopicsArgs) {
    return this._getAllTopic.watch(args).valueChanges;
  }

  getBookmarkLikeInterior(args?: QueryTopicArgs) {
    return this._getBookmarkLike.watch(args).valueChanges;
  }

  getTopicByID(args?: QueryTopicArgs) {
    return this._getTopicByID.watch(args).valueChanges;
  }

  likeInterior(args: MutationTopicUserLikeArgs) {
    return this._likeInterior.mutate(args);
  }

  loadMoreCommentInterior(args?: QueryTopicArgs) {
    return this._loadMoreComment.watch(args).valueChanges;
  }

  loadMoreRepplyInterior(args?: QueryTopicArgs) {
    return this._loadMoreReply.watch(args).valueChanges;
  }

  async share(interior: TopicNode, type: ShareTypes) {
    const routingUrl = `/interior-share/${interior.id}`;
    return this._socialShare.share(
      {
        link: routingUrl,
        title: interior.content,
        message: interior.content,
        thumbnailUrl: interior.images[0]?.image
      },
      type
    );
  }
}
