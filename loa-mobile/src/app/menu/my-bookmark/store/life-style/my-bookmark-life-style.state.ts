import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { MyBookmarkService } from '../../my-bookmark.service';
import { BookmarkLifeStyleStateModel, initialState } from './my-bookmark-life-style-state.model';
import { BookmarkLifeStyleMyBookmark, BookmarkLifeStyleMyBookmarkSuccess, LoadBookmarkLifeStyle, LoadMoreBookmarkLifeStyle } from './my-bookmark-life-style.action';
import produce from 'immer';
@Injectable({ providedIn: 'root' })
@State<BookmarkLifeStyleStateModel>({
  name: 'myBookmarkLifeStyle',
  defaults: initialState,
})
export class BookmarkLifeStyleState {
  @Selector()
  static getNodeConnection({ nodeConnection }: BookmarkLifeStyleStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: BookmarkLifeStyleStateModel) {
    return selectedNode;
  }
  constructor(
    private _apiService: MyBookmarkService,
  ) {}

  @Action(LoadBookmarkLifeStyle)
  loadMyBookmarkLifeStyle(
    ctx: StateContext<BookmarkLifeStyleStateModel>,
    { payload }: LoadBookmarkLifeStyle
  ) {
    return this._apiService.loadBookmarkLifeStyle({ ...payload })
    .pipe(
      tap(({ data }) => {
        ctx.patchState({
          nodeConnection: data.articleFollows,
        });
      })
    );
  }

  @Action(LoadMoreBookmarkLifeStyle)
  loadMoreMyBookmarkLifeStyle(
    ctx: StateContext<BookmarkLifeStyleStateModel>,
    { payload }: LoadMoreBookmarkLifeStyle
  ) {
    return this._apiService.loadBookmarkLifeStyle({ ...payload })
    .pipe(
      tap(({ data }) => {
        const { articleFollows } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection
          draftDesign.pageInfo = articleFollows.pageInfo;
          draftDesign.edges = [
            ...draftDesign.edges,
            ...articleFollows.edges,
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(BookmarkLifeStyleMyBookmark, { cancelUncompleted: true })
  deleteMyBookmark(
    { dispatch }: StateContext<BookmarkLifeStyleStateModel>,
    { payload }: BookmarkLifeStyleMyBookmark
  ) {
    return this._apiService.bookmarkLifeStyle({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.articleUserFollow;
        if (status) {
          // const newState = produce(getState(), (draftState) => {
          //   const dataMyBookmark = draftState.nodeConnection
          //   const dataAfterDelete = dataMyBookmark.edges.filter(
          //     (edge) => edge.node.article.id !== payload.id
          //   );
          //   dataMyBookmark.edges = [
          //     ...dataAfterDelete,
          //   ];
          // });
          // patchState(newState);
          return dispatch(new BookmarkLifeStyleMyBookmarkSuccess(status));
        }
      })
    );
  }
}