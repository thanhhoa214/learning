import { Injectable } from '@angular/core';
import { InteriorShareApiService } from '@loa-mobile/interior-share/listing/interior-share.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BookmarkInteriorStateModel, initialState } from './my-bookmark-state.model';
import {
  DeleteMyBookmark,
  LoadBookmarkInteriorShare,
  LoadMoreBookmarkInteriorShareImage
} from './my-bookmark.action';
import produce from 'immer';
@Injectable({ providedIn: 'root' })
@State<BookmarkInteriorStateModel>({
  name: 'bookmarkInteriorShare',
  defaults: initialState
})
export class BookmarkInteriorState {
  constructor(private _apiService: InteriorShareApiService) {}

  @Selector()
  static getNodeConnection({ nodeConnection }: BookmarkInteriorStateModel) {
    return nodeConnection;
  }

  @Selector()
  static getSelectedNode({ selectedNode }: BookmarkInteriorStateModel) {
    return selectedNode;
  }

  @Action(DeleteMyBookmark, { cancelUncompleted: true })
  deleteMyBookmark(
    { getState, patchState }: StateContext<BookmarkInteriorStateModel>,
    { payload }: DeleteMyBookmark
  ) {
    return this._apiService.bookmarkInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserFollow;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataMyBookmark = draftState.nodeConnection;
            const dataAfterDelete = dataMyBookmark.edges.filter(
              (edge) => edge.node.topic.id !== payload.id
            );
            dataMyBookmark.edges = [...dataAfterDelete];
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(LoadBookmarkInteriorShare, { cancelUncompleted: true })
  loadBanner(
    { patchState }: StateContext<BookmarkInteriorStateModel>,
    { payload }: LoadBookmarkInteriorShare
  ) {
    return this._apiService.getAllMyBookmark({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.topicFollows
        });
      })
    );
  }

  @Action(LoadMoreBookmarkInteriorShareImage)
  loadMoreLifeStyle(
    ctx: StateContext<BookmarkInteriorStateModel>,
    { payload }: LoadMoreBookmarkInteriorShareImage
  ) {
    return this._apiService.getAllMyBookmark({ ...payload }).pipe(
      tap(({ data }) => {
        const { topicFollows } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = topicFollows.pageInfo;
          draftDesign.edges = [...draftDesign.edges, ...topicFollows.edges];
        });
        ctx.patchState(newState);
      })
    );
  }
}
