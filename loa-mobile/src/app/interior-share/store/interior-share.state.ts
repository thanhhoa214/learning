import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { InteriorShareStateModel, initialState } from './interior-share-state.model';
import {
  AdminDeleteTopic,
  AdminDeleteTopicFailed,
  AdminUpdateTopic,
  AdminUpdateTopicFailed,
  AdminUpdateTopicSuccessful,
  BookmarkInteriorDetail,
  BookmarkInteriorListing,
  CommentInteriorShareDetail,
  CommentInteriorShareDetailFail,
  CommentInteriorShareDetailSuccessful,
  CommentInteriorShareListing,
  CommentInteriorShareListingFail,
  DeleteCommentInterior,
  DeleteCommentInteriorListing,
  DeleteCommentInteriorSuccessful,
  DeleteReplyInterior,
  DeleteReplyInteriorListing,
  LikeInteriorShareDetail,
  LikeInteriorShareListing,
  LoadInteriorShare,
  LoadInteriorShareByID,
  LoadMoreCommentInteriorShare,
  LoadMoreCommentInteriorShareListing,
  LoadMoreInteriorShare,
  LoadMoreReplyInteriorShare,
  LoadMoreReplyInteriorShareListing,
  PostInteriorShare,
  PostInteriorShareFailed,
  PostInteriorShareSuccessful,
  ReplyInteriorShareDetail,
  ReplyInteriorShareDetailSuccessful,
  ReplyInteriorShareListing
} from './interior-share.action';
import produce from 'immer';
import { InteriorShareApiService } from '../listing/interior-share.service';
@Injectable({ providedIn: 'root' })
@State<InteriorShareStateModel>({
  name: 'manageInteriorShare',
  defaults: initialState
})
export class InteriorShareState {
  constructor(private _apiService: InteriorShareApiService) {}

  @Selector()
  static getNodeConnection({ nodeConnection }: InteriorShareStateModel) {
    return nodeConnection;
  }

  @Selector()
  static getSelectedNode({ selectedNode }: InteriorShareStateModel) {
    return selectedNode;
  }

  @Action(LoadInteriorShareByID, { cancelUncompleted: true })
  LoadInteriorShareByID(
    { patchState }: StateContext<InteriorShareStateModel>,
    { payload }: LoadInteriorShareByID
  ) {
    return this._apiService.getTopicByID({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          selectedNode: data.topic
        });
      })
    );
  }

  @Action(AdminUpdateTopic, { cancelUncompleted: true })
  adminUpdateTopic(
    { dispatch }: StateContext<InteriorShareStateModel>,
    { payload }: AdminUpdateTopic
  ) {
    return this._apiService.adminUpdateTopic({ input: payload }).pipe(
      tap(({ data }) => {
        if (data.topicUpdate != null) {
          const { errors, status } = data.topicUpdate;
          if (status) {
            return dispatch(new AdminUpdateTopicSuccessful(status));
          }
          return dispatch(new AdminUpdateTopicFailed(errors));
        } else {
          return dispatch(new AdminUpdateTopicFailed(data));
        }
      })
    );
  }

  @Action(BookmarkInteriorDetail, { cancelUncompleted: true })
  bookmarkInteriorDetail(
    { getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: BookmarkInteriorDetail
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.selectedNode;
      dataLifeStyle.followed = !dataLifeStyle.followed;
    });
    patchState(newState);
    return this._apiService.bookmarkInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserFollow;
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

  @Action(BookmarkInteriorListing, { cancelUncompleted: true })
  bookmarkInteriorListing(
    { getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: BookmarkInteriorListing
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.nodeConnection;
      const dataAfterDelete = dataLifeStyle.edges.find((edge) => edge.node.id === payload.id);
      dataAfterDelete.node.followed = !dataAfterDelete.node.followed;
    });
    patchState(newState);
    return this._apiService.bookmarkInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserFollow;
        if (!status) {
          // Reset state if bookmark fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.nodeConnection;
            const dataAfterDelete = dataLifeStyle.edges.find((edge) => edge.node.id === payload.id);
            dataAfterDelete.node.followed = !dataAfterDelete.node.followed;
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(CommentInteriorShareDetail, { cancelUncompleted: true })
  commentInteriorShare(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: CommentInteriorShareDetail
  ) {
    return this._apiService.comment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, topic } = data.topicCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const draftDesign = draftState.selectedNode.comments;
            const tempData = {
              node: topic,
              cursor: null
            };
            draftDesign.edges = [...draftDesign.edges, tempData];
          });
          patchState(newState);
          dispatch(new CommentInteriorShareDetailSuccessful());
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(CommentInteriorShareListing, { cancelUncompleted: true })
  commentInteriorShareListing(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: CommentInteriorShareListing
  ) {
    return this._apiService.comment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, topic } = data.topicCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            // const draftDesign = draftState.selectedNode.comments
            const loadMoreComment = draftState.nodeConnection.edges.find(
              (edge) => edge.node.id === payload.parent
            );
            const tempData = {
              node: topic,
              cursor: null
            };
            loadMoreComment.node.comments.edges = [
              ...loadMoreComment.node.comments.edges,
              tempData
            ];
          });
          patchState(newState);
        } else {
          return dispatch(new CommentInteriorShareListingFail(errors));
        }
      })
    );
  }

  @Action(DeleteCommentInteriorListing, { cancelUncompleted: true })
  deleteCommentInteriorListing(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: DeleteCommentInteriorListing
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataInterior = draftState.nodeConnection.edges;
            for (let i = 0; i < dataInterior.length; i++) {
              for (let k = 0; k < dataInterior[i].node.comments.edges.length; k++) {
                if (payload.id[0] == dataInterior[i].node.comments.edges[k].node.id) {
                  const deleteComment = dataInterior[i].node.comments.edges.filter(
                    (edge) => edge.node.id != payload.id[0]
                  );
                  dataInterior[i].node.comments.edges = [...deleteComment];
                }
              }
            }
          });
          patchState(newState);
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(DeleteCommentInterior, { cancelUncompleted: true })
  deleteCoooment(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: DeleteCommentInterior
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const deleteComment = draftState.selectedNode.comments.edges.filter(
              (edge) => edge.node.id != payload.id[0]
            );
            draftState.selectedNode.comments.edges = [...deleteComment];
          });
          patchState(newState);
          dispatch(new DeleteCommentInteriorSuccessful());
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(DeleteReplyInterior, { cancelUncompleted: true })
  deleteReply(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: DeleteReplyInterior
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataCommentLifeStyle = draftState.selectedNode.comments.edges;
            for (let i = 0; i < dataCommentLifeStyle.length; i++) {
              const deleteComment = dataCommentLifeStyle[i].node.comments.edges.filter(
                (edge) => edge.node.id != payload.id[0]
              );
              dataCommentLifeStyle[i].node.comments.edges = [...deleteComment];
            }
          });
          patchState(newState);
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(DeleteReplyInteriorListing, { cancelUncompleted: true })
  deleteReplyListing(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: DeleteReplyInteriorListing
  ) {
    return this._apiService.deleteComment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataInterior = draftState.nodeConnection.edges;
            for (let i = 0; i < dataInterior.length; i++) {
              // const replyComment = draftState.nodeConnection.edges[i].node.comments.edges.find(
              //   (edge) => edge.node.id === payload.id[0]
              // );
              for (let k = 0; k < dataInterior[i].node.comments.edges.length; k++) {
                const dataComment = dataInterior[i].node.comments.edges[k].node.comments.edges;
                for (let l = 0; l < dataComment.length; l++) {
                  if (payload.id[0] == dataComment[l].node.id) {
                    const deleteComment = dataComment.filter(
                      (edge) => edge.node.id != payload.id[0]
                    );
                    dataInterior[i].node.comments.edges[k].node.comments.edges = [...deleteComment];
                  }
                }
              }
              // const dataCommentLifeStyle = replyComment.node.comments.edges
              // for(let  i = 0; i < dataCommentLifeStyle.length; i++){
              //   const deleteComment = dataCommentLifeStyle[i].node.comments.edges.filter(
              //     (edge) => edge.node.id != payload.id[0]
              //   );
              //   dataCommentLifeStyle[i].node.comments.edges = [
              //     ...deleteComment,
              //   ];
              // }
            }
          });
          patchState(newState);
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(AdminDeleteTopic, { cancelUncompleted: true })
  deleteTopic(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: AdminDeleteTopic
  ) {
    return this._apiService.adminDeleteTopic({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          // return dispatch(new AdminDeleteTopicSuccessful(status));
          const newState = produce(getState(), (draftState) => {
            const dataCommentLifeStyle = draftState.nodeConnection;
            const dataAfterDelete = dataCommentLifeStyle.edges.filter(
              (edge) => edge.node.id != payload.id[0]
            );
            dataCommentLifeStyle.edges = [...dataAfterDelete];
          });
          patchState(newState);
        }
        return dispatch(new AdminDeleteTopicFailed(errors));
      })
    );
  }

  @Action(LikeInteriorShareDetail, { cancelUncompleted: true })
  likeInteriorDetail(
    { getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: LikeInteriorShareDetail
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
    return this._apiService.likeInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserLike;
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

  @Action(LikeInteriorShareListing, { cancelUncompleted: true })
  likeInteriorShareListing(
    { getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: LikeInteriorShareListing
  ) {
    // Set state temp
    const newState = produce(getState(), (draftState) => {
      const dataLifeStyle = draftState.nodeConnection;
      const dataAfterDelete = dataLifeStyle.edges.find((edge) => edge.node.id === payload.id);
      if (dataAfterDelete.node.liked) {
        dataAfterDelete.node.numberOfLikes--;
      } else {
        dataAfterDelete.node.numberOfLikes++;
      }
      dataAfterDelete.node.liked = !dataAfterDelete.node.liked;
    });
    patchState(newState);
    return this._apiService.likeInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserLike;
        if (!status) {
          // Reset state if like fail
          const newState = produce(getState(), (draftState) => {
            const dataLifeStyle = draftState.nodeConnection;
            const dataAfterDelete = dataLifeStyle.edges.find((edge) => edge.node.id === payload.id);
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

  @Action(LoadInteriorShare, { cancelUncompleted: true })
  loadBanner(
    { patchState }: StateContext<InteriorShareStateModel>,
    { payload }: LoadInteriorShare
  ) {
    return this._apiService.getAllTopic({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.topics
        });
      })
    );
  }

  @Action(LoadMoreCommentInteriorShare)
  loadMoreCommentInterior(
    ctx: StateContext<InteriorShareStateModel>,
    { payload }: LoadMoreCommentInteriorShare
  ) {
    return this._apiService.loadMoreCommentInterior({ ...payload }).pipe(
      tap(({ data }) => {
        const { topic } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.selectedNode.comments;
          draftDesign.pageInfo = topic.comments.pageInfo;
          draftDesign.edges = [...topic.comments.edges, ...draftDesign.edges];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreCommentInteriorShareListing)
  loadMoreCommentInteriorListing(
    ctx: StateContext<InteriorShareStateModel>,
    { payload }: LoadMoreCommentInteriorShareListing
  ) {
    return this._apiService.loadMoreCommentInterior({ ...payload }).pipe(
      tap(({ data }) => {
        const { topic } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const loadMoreComment = draftState.nodeConnection.edges.find(
            (edge) => edge.node.id === payload.id
          );
          loadMoreComment.node.comments.pageInfo = topic.comments.pageInfo;
          loadMoreComment.node.comments.edges = [
            ...topic.comments.edges,
            ...loadMoreComment.node.comments.edges
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreInteriorShare)
  loadMoreInteriorShare(
    ctx: StateContext<InteriorShareStateModel>,
    { payload }: LoadMoreInteriorShare
  ) {
    return this._apiService.getAllTopic({ ...payload }).pipe(
      tap(({ data }) => {
        const { topics } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = topics.pageInfo;
          draftDesign.edges = [...draftDesign.edges, ...topics.edges];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreReplyInteriorShare)
  loadMoreReplyInterior(
    ctx: StateContext<InteriorShareStateModel>,
    { payload }: LoadMoreReplyInteriorShare
  ) {
    return this._apiService.loadMoreRepplyInterior({ ...payload }).pipe(
      tap(({ data }) => {
        const { topic } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const replyComment = draftState.selectedNode.comments.edges.find(
            (edge) => edge.node.id === payload.id
          );
          replyComment.node.comments.pageInfo = topic.comments.pageInfo;
          replyComment.node.comments.edges = [
            ...topic.comments.edges,
            ...replyComment.node.comments.edges
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadMoreReplyInteriorShareListing)
  loadMoreReplyInteriorListing(
    ctx: StateContext<InteriorShareStateModel>,
    { payload }: LoadMoreReplyInteriorShareListing
  ) {
    return this._apiService.loadMoreRepplyInterior({ ...payload }).pipe(
      tap(({ data }) => {
        const { topic } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          for (let i = 0; i < draftState.nodeConnection.edges.length; i++) {
            const replyComment = draftState.nodeConnection.edges[i].node.comments.edges.find(
              (edge) => edge.node.id === payload.id
            );
            if (replyComment) {
              replyComment.node.comments.pageInfo = topic.comments.pageInfo;
              replyComment.node.comments.edges = [
                ...topic.comments.edges,
                ...replyComment.node.comments.edges
              ];
            }
          }
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(PostInteriorShare, { cancelUncompleted: true })
  postInteriorShare(
    { dispatch }: StateContext<InteriorShareStateModel>,
    { payload }: PostInteriorShare
  ) {
    return this._apiService.adminPostInteriorShare({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicCreate;
        if (status) {
          return dispatch(new PostInteriorShareSuccessful(status));
        }
        return dispatch(new PostInteriorShareFailed(errors));
      })
    );
  }

  @Action(ReplyInteriorShareDetail, { cancelUncompleted: true })
  replyInteriorShare(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: ReplyInteriorShareDetail
  ) {
    return this._apiService.comment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, topic } = data.topicCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const tempData = {
              node: topic,
              cursor: null
            };
            const replyComment = draftState.selectedNode.comments.edges.find(
              (edge) => edge.node.id === payload.parent
            );
            replyComment.node.comments.pageInfo = topic.comments.pageInfo;
            replyComment.node.comments.edges = [...replyComment.node.comments.edges, tempData];
          });
          patchState(newState);
          dispatch(new ReplyInteriorShareDetailSuccessful());
        }
        return dispatch(new CommentInteriorShareDetailFail(errors));
      })
    );
  }

  @Action(ReplyInteriorShareListing, { cancelUncompleted: true })
  replyInteriorShareListing(
    { dispatch, getState, patchState }: StateContext<InteriorShareStateModel>,
    { payload }: ReplyInteriorShareListing
  ) {
    return this._apiService.comment({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, topic } = data.topicCommentCreate;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const tempData = {
              node: topic,
              cursor: null
            };
            const dataInterior = draftState.nodeConnection.edges;
            for (let i = 0; i < dataInterior.length; i++) {
              for (let k = 0; k < dataInterior[i].node.comments.edges.length; k++) {
                if (payload.parent == dataInterior[i].node.comments.edges[k].node.id) {
                  const replyComment = dataInterior[i].node.comments.edges.find(
                    (edge) => edge.node.id === payload.parent
                  );
                  // replyComment.node.comments.pageInfo = topic.comments.pageInfo;
                  replyComment.node.comments.edges = [
                    ...replyComment.node.comments.edges,
                    tempData
                  ];
                }
              }
            }
            // const replyComment = draftState.selectedNode.comments.edges.find(
            //   (edge) => edge.node.id === payload.parent
            // );
          });
          patchState(newState);
        } else {
          return dispatch(new CommentInteriorShareListingFail(errors));
        }
      })
    );
  }
}
