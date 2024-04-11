import { Injectable } from '@angular/core';
import { InteriorShareApiService } from '@loa-mobile/interior-share/listing/interior-share.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BookmarkInteriorNoImageStateModel, initialState } from './bookmark-no-image-state.model';
import {
  DeletetMyBookmarkNoImage,
  LoadBookmarkInteriorShareNoImage,
  LoadMoreBookmarkInteriorShareNoImage
} from './bookmark-no-image.action';
import produce from 'immer';
@Injectable({ providedIn: 'root' })
@State<BookmarkInteriorNoImageStateModel>({
  name: 'bookmarkInteriorShareNoImage',
  defaults: initialState
})
export class BookmarkInteriorNoImageState {
  constructor(private _apiService: InteriorShareApiService) {}

  @Selector()
  static getNodeConnection({ nodeConnection }: BookmarkInteriorNoImageStateModel) {
    return nodeConnection;
  }

  @Selector()
  static getSelectedNode({ selectedNode }: BookmarkInteriorNoImageStateModel) {
    return selectedNode;
  }

  @Action(DeletetMyBookmarkNoImage, { cancelUncompleted: true })
  deleteMyBookmarkNoImage(
    { getState, patchState }: StateContext<BookmarkInteriorNoImageStateModel>,
    { payload }: DeletetMyBookmarkNoImage
  ) {
    return this._apiService.bookmarkInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { status } = data.topicUserFollow;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataMyBookmark = draftState.nodeConnection;
            const dataAfterDelete = dataMyBookmark.edges.filter(
              (edge) => edge.node.topic.id != payload.id
            );
            dataMyBookmark.edges = [...dataAfterDelete];
          });
          patchState(newState);
        }
      })
    );
  }

  @Action(LoadBookmarkInteriorShareNoImage, { cancelUncompleted: true })
  loadBanner(
    { patchState }: StateContext<BookmarkInteriorNoImageStateModel>,
    { payload }: LoadBookmarkInteriorShareNoImage
  ) {
    return this._apiService.getAllMyBookmark({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.topicFollows
        });
      })
    );
  }

  @Action(LoadMoreBookmarkInteriorShareNoImage)
  loadMoreLifeStyle(
    ctx: StateContext<BookmarkInteriorNoImageStateModel>,
    { payload }: LoadMoreBookmarkInteriorShareNoImage
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
