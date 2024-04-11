import { Injectable } from '@angular/core';
import { InteriorShareApiService } from '@loa-mobile/interior-share/listing/interior-share.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { DetailInteriorShareStateModel, initialState } from './detail-interior-share-state.model';
import {
  AdminDeleteTopicDetail,
  AdminDeleteTopicDetailFailed,
  AdminDeleteTopicDetailSuccessful,
  BookmarkInterior,
  BookmarkInteriorFail,
  BookmarkInteriorSuccessful,
  LikeInteriorShare,
  LikeInteriorShareFail,
  LikeInteriorShareSuccessful,
  LoadBookmarkLikeByIDInterior,
  LoadBookmarkLikeInteriorShare
} from './detail-interior-share.actions';

@Injectable({ providedIn: 'root' })
@State<DetailInteriorShareStateModel>({
  name: 'detailInteriorShare',
  defaults: initialState
})
export class DetailInteriorShareState {
  constructor(private _apiService: InteriorShareApiService) {}

  @Selector()
  static getNodeConnection({ nodeConnection }: DetailInteriorShareStateModel) {
    return nodeConnection;
  }

  @Selector()
  static getSelectedNode({ selectedNode }: DetailInteriorShareStateModel) {
    return selectedNode;
  }

  @Action(BookmarkInterior, { cancelUncompleted: true })
  bookmarkInterior(
    { dispatch }: StateContext<DetailInteriorShareStateModel>,
    { payload }: BookmarkInterior
  ) {
    return this._apiService.bookmarkInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicUserFollow;
        if (status) {
          return dispatch(new BookmarkInteriorSuccessful(status));
        }
        return dispatch(new BookmarkInteriorFail(errors));
      })
    );
  }

  @Action(AdminDeleteTopicDetail, { cancelUncompleted: true })
  deleteTopicDetail(
    { dispatch }: StateContext<DetailInteriorShareStateModel>,
    { payload }: AdminDeleteTopicDetail
  ) {
    return this._apiService.adminDeleteTopic({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicDelete;
        if (status) {
          return dispatch(new AdminDeleteTopicDetailSuccessful(status));
        }
        return dispatch(new AdminDeleteTopicDetailFailed(errors));
      })
    );
  }

  @Action(LikeInteriorShare, { cancelUncompleted: true })
  likeInteriorShare(
    { dispatch }: StateContext<DetailInteriorShareStateModel>,
    { payload }: LikeInteriorShare
  ) {
    return this._apiService.likeInterior({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.topicUserLike;
        if (status) {
          return dispatch(new LikeInteriorShareSuccessful(status));
        }
        return dispatch(new LikeInteriorShareFail(errors));
      })
    );
  }

  @Action(LoadBookmarkLikeByIDInterior, { cancelUncompleted: true })
  loadBookmarkLikeByIDInterior(
    { patchState }: StateContext<DetailInteriorShareStateModel>,
    { payload }: LoadBookmarkLikeByIDInterior
  ) {
    return this._apiService.getBookmarkLikeInterior({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          selectedNode: data.topic
        });
      })
    );
  }

  @Action(LoadBookmarkLikeInteriorShare, { cancelUncompleted: true })
  loadBookmarkLikeInterior(
    { patchState }: StateContext<DetailInteriorShareStateModel>,
    { payload }: LoadBookmarkLikeInteriorShare
  ) {
    return this._apiService.getAllBookmarkLike({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.topics
        });
      })
    );
  }
}
