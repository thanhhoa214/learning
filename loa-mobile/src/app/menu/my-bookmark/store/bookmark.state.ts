import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AllMyBookmarkMenuGQL } from '../../shared/services';
import { BookMarkStateModel, initialState } from './bookmark-state.model';
import { BookmarkDesignMyBookmark, BookmarkDesignMyBookmarkSuccess, LoadBookmark, LoadMoreBookmarkDesign } from './bookmark.actions';
import produce from 'immer';
import { MyBookmarkService } from '../my-bookmark.service';
@Injectable({ providedIn: 'root' })
@State<BookMarkStateModel>({
  name: 'myBookmark',
  defaults: initialState,
})
export class BookmarkState {
  @Selector()
  static getNodeConnection({ nodeConnection }: BookMarkStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: BookMarkStateModel) {
    return selectedNode;
  }
  constructor(
    private _apiService: AllMyBookmarkMenuGQL,
    private _apiServiceBookmark: MyBookmarkService
  ) {}

  @Action(LoadBookmark, { cancelUncompleted: true })
  loadBookmark(
    { patchState }: StateContext<BookMarkStateModel>,
    { payload }: LoadBookmark
  ) {
    return this._apiService.fetch(payload).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.designsBookmarks,
        });
      })
    );
  }

  @Action(LoadMoreBookmarkDesign)
  loadMoreLifeStyle(
    ctx: StateContext<BookMarkStateModel>,
    { payload }: LoadMoreBookmarkDesign
  ) {
    return this._apiServiceBookmark.loadMoreBookmarkDesign({ ...payload })
    .pipe(
      tap(({ data }) => {
        const { designsBookmarks } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection
          draftDesign.pageInfo = designsBookmarks.pageInfo;
          draftDesign.edges = [
            ...draftDesign.edges,
            ...designsBookmarks.edges,
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(BookmarkDesignMyBookmark, { cancelUncompleted: true })
  deleteMyBookmark(
    { dispatch }: StateContext<BookMarkStateModel>,
    { payload }: BookmarkDesignMyBookmark
  ) {
    return this._apiServiceBookmark.bookmarkDesign({ id: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.designUserBookmarks;
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
          return dispatch(new BookmarkDesignMyBookmarkSuccess(status));
        }
      })
    );
  }
}
