import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { DetailLifeStyleStateModel, initialState } from './detail-life-style-state.model';
import { BookmarkLifeStyle, BookmarkLifeStyleFail, BookmarkLifeStyleSuccessful, CommentLifeStyle, 
  CommentLifeStyleFail, LikeLifeStyle, LikeLifeStyleFail, LikeLifeStyleSuccessful, LoadBookmarkLike, LoadBookmarkLikeByID } from './detail-life-style.action';
import produce from 'immer';
import { LifeStyleService } from '@loa-mobile/life-style/listing-life-style/life-style.service';
@Injectable({ providedIn: 'root' })
@State<DetailLifeStyleStateModel>({
  name: 'detailLifeStyle',
  defaults: initialState,
})
export class DetailLifeStyleState {
  @Selector()
  static getNodeConnection({ nodeConnection }: DetailLifeStyleStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: DetailLifeStyleStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: LifeStyleService) {}

  @Action(LoadBookmarkLikeByID, { cancelUncompleted: true })
  loadBookmarkLikeByID(
    { patchState }: StateContext<DetailLifeStyleStateModel>,
    { payload }: LoadBookmarkLikeByID
  ) {
  return this._apiService.getBookmarkLike({ ...payload })
    .pipe(
      tap(({ data }) => {
          patchState({
              selectedNode: data.article,
          });
      })
    );
  }

  @Action(BookmarkLifeStyle, { cancelUncompleted: true })
  bookmarkLifeStyle(
    { dispatch }: StateContext<DetailLifeStyleStateModel>,
    { payload }: BookmarkLifeStyle
  ) {
    return this._apiService.bookmarkLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.articleUserFollow;
        if (status) {
          return dispatch(new BookmarkLifeStyleSuccessful(status));
        }
        return dispatch(new BookmarkLifeStyleFail(errors));
      })
    );
  }

  @Action(LikeLifeStyle, { cancelUncompleted: true })
  likeLifeStyle(
    { dispatch }: StateContext<DetailLifeStyleStateModel>,
    { payload }: LikeLifeStyle
  ) {
    return this._apiService.likeLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.articleUserLike;
        if (status) {
          return dispatch(new LikeLifeStyleSuccessful(status));
        }
        return dispatch(new LikeLifeStyleFail(errors));
      })
    );
  }

  @Action(LoadBookmarkLike, { cancelUncompleted: true })
  loadBookmarkLike(
    { patchState }: StateContext<DetailLifeStyleStateModel>,
    { payload }: LoadBookmarkLike
  ) {
  return this._apiService.getAllBookmarkLike({ ...payload })
    .pipe(
      tap(({ data }) => {
          patchState({
              nodeConnection: data.articles,
          });
      })
    );
  }

  @Action(CommentLifeStyle, { cancelUncompleted: true })
  commentLifeStyle(
    { dispatch, getState, patchState }: StateContext<DetailLifeStyleStateModel>,
    { payload }: CommentLifeStyle
  ) {
    return this._apiService.commentLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status, article } = data.articleCommentCreate;
        if (status) {
          // return dispatch(new CommentLifeStyleSuccessful(status));
          const newState = produce(getState(), (draftState) => {
            const draftDesign = draftState.selectedNode.comments
            const tempData = {
              node: article,
              cursor: null
            }
            // draftDesign.pageInfo = article.comments.pageInfo;
            draftDesign.edges = [
              ...draftDesign.edges, tempData
            ];
          });
          patchState(newState);
        }
        return dispatch(new CommentLifeStyleFail(errors));
      })
    );
  }
}