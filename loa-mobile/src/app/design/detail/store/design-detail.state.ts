import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';
import {
  LikeDesignDetail,
  LoadDesignDetail,
  BookmarkDesignDetail,
  ClearDesignDetail,
  CommentDesignDetail,
  DeleteCommentDesignDetail,
  RequestDesignDetail,
  RequestDesignDetailSuccessful,
  ReplyDesignDetail,
  LoadMoreComment,
  LoadMoreReply,
  LikeStatic,
  BookmarkStatic
} from './design-detail.actions';
import { tap } from 'rxjs/operators';
import { isEquals } from '../../../shared/utils';
import {
  GetDesignGQL,
  GetDesignQuery,
  BookmarkDesignGQL,
  LikeDesignGQL,
  CreateCommentDesignGQL,
  DeleteCommentDesignGQL,
  RequestDesignGQL,
  DesignCommentMoreGQL,
  DesignCommentReplyMoreGQL
} from '../../shared/services';
import { ReplyCommentDesignGQL } from '@loa-mobile/design/shared/services/design-comment-reply.mutation.g';
import { produce } from 'immer';
import { LoadUrlFailed } from '@loa-mobile/core/store';

export class DesignDetailStateModel {
  design?: GetDesignQuery['design'];
}

const defaults = {};

@State<DesignDetailStateModel>({
  name: 'designDetail',
  defaults
})
@Injectable()
export class DesignDetailState {
  constructor(
    private _designQuery: GetDesignGQL,
    private _likeMutation: LikeDesignGQL,
    private _bookmarkMutation: BookmarkDesignGQL,
    private _commentMutation: CreateCommentDesignGQL,
    private _deleteCommentMutation: DeleteCommentDesignGQL,
    private _requestDesignMutation: RequestDesignGQL,
    private _replyMutation: ReplyCommentDesignGQL,
    private _commentMoreQuery: DesignCommentMoreGQL,
    private _replyMoreQuery: DesignCommentReplyMoreGQL
  ) {}

  @Selector()
  static design({ design }: DesignDetailStateModel) {
    return design;
  }

  @Selector()
  static designId({ design }: DesignDetailStateModel) {
    return design.id;
  }

  @Action(BookmarkDesignDetail)
  bookmark(_, { payload }: BookmarkDesignDetail) {
    return this._bookmarkMutation.mutate(payload).pipe(tap(console.log));
  }

  @Action(BookmarkStatic)
  bookmarkStatic({ getState, patchState }: StateContext<DesignDetailStateModel>) {
    const newState = produce(getState(), (draftState) => {
      const draftDesign = draftState.design;
      if (draftDesign.bookmarked) {
        draftDesign.bookmarked = false;
        draftDesign.numberOfBookmarks -= 1;
      } else {
        draftDesign.bookmarked = true;
        draftDesign.numberOfBookmarks += 1;
      }
    });
    patchState(newState);
  }

  @Action(ClearDesignDetail)
  clear({ patchState }: StateContext<DesignDetailStateModel>) {
    patchState({ design: undefined });
  }

  @Action(LikeDesignDetail)
  like(_, { payload }: LikeDesignDetail) {
    return this._likeMutation.mutate({ id: payload.id }).pipe(tap(console.log));
  }

  @Action(LikeStatic)
  likeStatic({ getState, patchState }: StateContext<DesignDetailStateModel>) {
    const newState = produce(getState(), (draftState) => {
      const draftDesign = draftState.design;
      if (draftDesign.liked) {
        draftDesign.liked = false;
        draftDesign.numberOfLikes -= 1;
      } else {
        draftDesign.liked = true;
        draftDesign.numberOfLikes += 1;
      }
    });
    patchState(newState);
  }

  @Action(LoadDesignDetail)
  loadDesignDetail(
    { getState, patchState, dispatch }: StateContext<DesignDetailStateModel>,
    { payload }: LoadDesignDetail
  ) {
    const state = getState();
    return this._designQuery.fetch(payload).pipe(
      tap(({ data }) => {
        const { design } = data;

        if (!design) return dispatch(new LoadUrlFailed());

        if (isEquals(design, state.design)) return;
        patchState({ design });
      })
    );
  }

  @Action(LoadMoreComment)
  loadMoreComment(
    { getState, patchState }: StateContext<DesignDetailStateModel>,
    { payload }: LoadMoreComment
  ) {
    return this._commentMoreQuery.fetch(payload).pipe(
      tap(({ data }) => {
        const { design } = data;

        const newState = produce(getState(), (draftState) => {
          const draftDesign = draftState.design.questionAnswer;
          draftDesign.pageInfo = design.questionAnswer.pageInfo;
          draftDesign.edges = [...design.questionAnswer.edges, ...draftDesign.edges];
        });
        patchState(newState);
      })
    );
  }

  @Action(LoadMoreReply)
  loadMoreReply(
    { getState, patchState }: StateContext<DesignDetailStateModel>,
    { payload }: LoadMoreReply
  ) {
    return this._replyMoreQuery.fetch(payload).pipe(
      tap(({ data }) => {
        const { designQA } = data;

        const newState = produce(getState(), (draftState) => {
          const question = draftState.design.questionAnswer.edges.find(
            (edge) => edge.node.id === payload.id
          );
          question.node.answer.pageInfo = designQA.answer.pageInfo;
          question.node.answer.edges = [...designQA.answer.edges, ...question.node.answer.edges];
        });
        patchState(newState);
      })
    );
  }

  @Action(RequestDesignDetail)
  request({ dispatch }: StateContext<DesignDetailStateModel>, { payload }: RequestDesignDetail) {
    return this._requestDesignMutation.mutate(payload).pipe(
      tap(({ data }) => {
        if (data.designInquiryCreate.status) {
          dispatch(new RequestDesignDetailSuccessful());
        }
      })
    );
  }

  @Action(CommentDesignDetail)
  @ImmutableContext()
  comment(_, { payload }: CommentDesignDetail) {
    return this._commentMutation.mutate(payload).pipe(tap(console.log));
  }

  @Action(DeleteCommentDesignDetail)
  @ImmutableContext()
  deleteComment(_, { payload }: DeleteCommentDesignDetail) {
    return this._deleteCommentMutation.mutate(payload).pipe(tap(console.log));
  }

  @Action(ReplyDesignDetail)
  @ImmutableContext()
  reply(_, { payload }: ReplyDesignDetail) {
    return this._replyMutation.mutate(payload).pipe(tap(console.log));
  }
}
