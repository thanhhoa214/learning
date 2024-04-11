import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import {
  BookmarkLifeStyleDetail,
  BookmarkLifeStyleListing,
  CommentLifeStyleDetail,
  CommentLifeStyleDetailFail,
  DeleteComment,
  DeleteReply,
  LikeLifeStyleDetail,
  LikeLifeStyleListing,
  LoadLifeStyle,
  LoadLifeStyleByID,
  LoadMoreComment,
  LoadMoreLifeStyle,
  LoadMoreReply,
  ReplyLifeStyleDetail,
} from "./life-style.action";
import { LifeStyleStateModel, initialState } from "./life-style.state.model";
import produce from "immer";
import { LifeStyleService } from "../listing-life-style/life-style.service";
@Injectable({ providedIn: "root" })
@State<LifeStyleStateModel>({
  name: "manageLifeStyle",
  defaults: initialState,
})
export class LifeStyleState {
  @Selector()
  static getNodeConnection({ nodeConnection }: LifeStyleStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: LifeStyleStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: LifeStyleService) {}

  @Action(LoadLifeStyle, { cancelUncompleted: true })
  loadBanner(
    { patchState }: StateContext<LifeStyleStateModel>,
    { payload }: LoadLifeStyle
  ) {
    return this._apiService.getAllArticle({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.articles,
        });
      })
    );
  }

  @Action(BookmarkLifeStyleListing, { cancelUncompleted: true })
  bookmarkLifeStyle(
    { getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: BookmarkLifeStyleListing
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.nodeConnection;
      const dataAfterDelete = dataLifeStyle.edges.find(
        (edge) => edge.node.id === payload.id
      );
      dataAfterDelete.node.followed = !dataAfterDelete.node.followed;
    });
    patchState(newState);
    return this._apiService.bookmarkLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.articleUserFollow;
        if (!status) {
          // Reset state if bookmark fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.nodeConnection;
            const dataAfterDelete = dataLifeStyle.edges.find(
              (edge) => edge.node.id === payload.id
            );
            dataAfterDelete.node.followed = !dataAfterDelete.node.followed;
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(BookmarkLifeStyleDetail, { cancelUncompleted: true })
  bookmarkLifeStyleDetail(
    { getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: BookmarkLifeStyleDetail
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.selectedNode;
      dataLifeStyle.followed = !dataLifeStyle.followed;
    });
    patchState(newState);
    return this._apiService.bookmarkLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.articleUserFollow;
        if (!status) {
          // Reset state if bookmark fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.selectedNode;
            dataLifeStyle.followed = !dataLifeStyle.followed;
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(LikeLifeStyleListing, { cancelUncompleted: true })
  likeLifeStyle(
    { getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: LikeLifeStyleListing
  ) {
    // set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.nodeConnection;
      const dataAfterDelete = dataLifeStyle.edges.find(
        (edge) => edge.node.id === payload.id
      );
      if (dataAfterDelete.node.liked) {
        dataAfterDelete.node.numberOfLikes--;
      } else {
        dataAfterDelete.node.numberOfLikes++;
      }
      dataAfterDelete.node.liked = !dataAfterDelete.node.liked;
    });
    patchState(newState);

    return this._apiService.likeLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.articleUserLike;
        if (!status) {
          // Reset state if like fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.nodeConnection;
            const dataAfterDelete = dataLifeStyle.edges.find(
              (edge) => edge.node.id === payload.id
            );
            if (dataAfterDelete.node.liked) {
              dataAfterDelete.node.numberOfLikes--;
            } else {
              dataAfterDelete.node.numberOfLikes++;
            }
            dataAfterDelete.node.liked = !dataAfterDelete.node.liked;
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(LikeLifeStyleDetail, { cancelUncompleted: true })
  likeLifeStyleDetail(
    { getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: LikeLifeStyleDetail
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.selectedNode;
      if (dataLifeStyle.liked) {
        dataLifeStyle.numberOfLikes--;
      } else {
        dataLifeStyle.numberOfLikes++;
      }
      dataLifeStyle.liked = !dataLifeStyle.liked;
    });
    patchState(newState);

    return this._apiService.likeLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.articleUserLike;
        if (!status) {
          // Reset state if like fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.selectedNode;
            if (dataLifeStyle.liked) {
              dataLifeStyle.numberOfLikes--;
            } else {
              dataLifeStyle.numberOfLikes++;
            }
            dataLifeStyle.liked = !dataLifeStyle.liked;
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(LoadLifeStyleByID, { cancelUncompleted: true })
  loadArticleByID(
    { patchState }: StateContext<LifeStyleStateModel>,
    { payload }: LoadLifeStyleByID
  ) {
    return this._apiService.getArticleByID({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          selectedNode: data.article,
        });
      })
    );
  }

  @Action(LoadMoreComment)
  loadMoreComment(
    ctx: StateContext<LifeStyleStateModel>,
    { payload }: LoadMoreComment
  ) {
    return this._apiService.loadMoreComment({ ...payload }).pipe(
      tap(({ data }) => {
        const { article } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.selectedNode.comments;
          draftDesign.pageInfo = article.comments.pageInfo;
          draftDesign.edges = [...article.comments.edges, ...draftDesign.edges];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreReply)
  loadMoreReplpy(
    ctx: StateContext<LifeStyleStateModel>,
    { payload }: LoadMoreReply
  ) {
    return this._apiService.loadMoreComment({ ...payload }).pipe(
      tap(({ data }) => {
        const { article } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const replyComment = draftState.selectedNode.comments.edges.find(
            (edge) => edge.node.id === payload.id
          );
          replyComment.node.comments.pageInfo = article.comments.pageInfo;
          replyComment.node.comments.edges = [
            ...article.comments.edges,
            ...replyComment.node.comments.edges,
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreLifeStyle)
  loadMoreLifeStyle(
    ctx: StateContext<LifeStyleStateModel>,
    { payload }: LoadMoreLifeStyle
  ) {
    return this._apiService.getAllArticle({ ...payload }).pipe(
      tap(({ data }) => {
        const { articles } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = articles.pageInfo;
          draftDesign.edges = [...draftDesign.edges, ...articles.edges];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(CommentLifeStyleDetail, { cancelUncompleted: true })
  commentLifeStyle(
    { dispatch, getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: CommentLifeStyleDetail
  ) {
    return this._apiService.commentLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, article } = data.articleCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const draftDesign = draftState.selectedNode.comments;
            const tempData = {
              node: article,
              cursor: null,
            };
            draftDesign.edges = [...draftDesign.edges, tempData];
          });
          patchState(newState);
        }
        return dispatch(new CommentLifeStyleDetailFail(errors));
      })
    );
  }

  @Action(ReplyLifeStyleDetail, { cancelUncompleted: true })
  replyLifeStyle(
    { dispatch, getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: ReplyLifeStyleDetail
  ) {
    return this._apiService.commentLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, article } = data.articleCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const tempData = {
              node: article,
              cursor: null,
            };
            const replyComment = draftState.selectedNode.comments.edges.find(
              (edge) => edge.node.id === payload.parent
            );
            replyComment.node.comments.pageInfo = article.comments.pageInfo;
            replyComment.node.comments.edges = [
              ...replyComment.node.comments.edges,
              tempData,
            ];
          });
          patchState(newState);
        }
        return dispatch(new CommentLifeStyleDetailFail(errors));
      })
    );
  }

  @Action(DeleteComment, { cancelUncompleted: true })
  deleteCoooment(
    { dispatch, getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: DeleteComment
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.articleDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const deleteComment = draftState.selectedNode.comments.edges.filter(
              (edge) => edge.node.id != payload.id[0]
            );
            draftState.selectedNode.comments.edges = [...deleteComment];
          });
          patchState(newState);
        }
        return dispatch(new CommentLifeStyleDetailFail(errors));
      })
    );
  }

  @Action(DeleteReply, { cancelUncompleted: true })
  deleteReply(
    { dispatch, getState, patchState }: StateContext<LifeStyleStateModel>,
    { payload }: DeleteReply
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.articleDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataCommentLifeStyle = draftState.selectedNode.comments.edges;
            for (let i = 0; i < dataCommentLifeStyle.length; i++) {
              const deleteComment = dataCommentLifeStyle[
                i
              ].node.comments.edges.filter(
                (edge) => edge.node.id != payload.id[0]
              );
              dataCommentLifeStyle[i].node.comments.edges = [...deleteComment];
            }
          });
          patchState(newState);
        }
        return dispatch(new CommentLifeStyleDetailFail(errors));
      })
    );
  }
}
