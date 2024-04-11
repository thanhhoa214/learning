import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import produce from "immer";
import { tap } from "rxjs/operators";
import { ReviewConstructorService } from "../review-constructor.service";
import {
  WriteReviewStateModel,
  initialState,
} from "./construction-review-state.model";
import {
  DeleteReviewConstructor,
  DeleteReviewConstructorFail,
  LoadMoreReviewConstructor,
  LoadReviewConstructor,
  LoadReviewConstructorById,
  UpdateReviewConstructor,
  UpdateReviewConstructorFailed,
  UpdateReviewConstructorSuccessful,
  WriteReviewConstructor,
  WriteReviewConstructorFailed,
  WriteReviewConstructorSuccessful,
} from "./construction-review.action";

@Injectable({ providedIn: "root" })
@State<WriteReviewStateModel>({
  name: "reviewConstructor",
  defaults: initialState,
})
export class ReviewState {
  @Selector()
  static getNodeConnection({ nodeConnection }: WriteReviewStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: WriteReviewStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: ReviewConstructorService) {}

  @Action(WriteReviewConstructor, { cancelUncompleted: true })
  reveiwConstructor(
    { dispatch }: StateContext<WriteReviewStateModel>,
    { payload }: WriteReviewConstructor
  ) {
    return this._apiService.createReviewConstructor({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.constructionReviewCreate;
        if (status) {
          return dispatch(new WriteReviewConstructorSuccessful(status));
        }
        return dispatch(new WriteReviewConstructorFailed(errors));
      })
    );
  }

  @Action(LoadReviewConstructor, { cancelUncompleted: true })
  loadReviewAll(
    { patchState }: StateContext<WriteReviewStateModel>,
    { payload }: LoadReviewConstructor
  ) {
    return this._apiService.getAllReview({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.constructionReviews,
        });
      })
    );
  }

  @Action(LoadMoreReviewConstructor)
  loadMoreReviewConstructor(
    ctx: StateContext<WriteReviewStateModel>,
    { payload }: LoadMoreReviewConstructor
  ) {
    return this._apiService.getAllReview({ ...payload }).pipe(
      tap(({ data }) => {
        const { constructionReviews } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = constructionReviews.pageInfo;
          draftDesign.edges = [
            ...draftDesign.edges,
            ...constructionReviews.edges,
          ];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(DeleteReviewConstructor, { cancelUncompleted: true })
  deleteReview(
    { dispatch, getState, patchState }: StateContext<WriteReviewStateModel>,
    { payload }: DeleteReviewConstructor
  ) {
    return this._apiService.deleteReview({ input: payload }).pipe(
      tap(({ data }) => {
        const { errors, status } = data.constructionReviewDelete;
        if (status) {
          const newState = produce(getState(), (draftState) => {
            const dataReview = draftState.nodeConnection;
            const dataAfterDelete = dataReview.edges.filter(
              (edge) => edge.node.id != payload.id[0]
            );
            dataReview.edges = [...dataAfterDelete];
          });
          patchState(newState);
        } else {
          return dispatch(new DeleteReviewConstructorFail(errors));
        }
      })
    );
  }

  @Action(LoadReviewConstructorById, { cancelUncompleted: true })
  LoadReviewByID(
    { patchState }: StateContext<WriteReviewStateModel>,
    { payload }: LoadReviewConstructorById
  ) {
    return this._apiService.getReviewByID({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          selectedNode: data.constructionReview,
        });
      })
    );
  }

  @Action(UpdateReviewConstructor, { cancelUncompleted: true })
  userUpdateReview(
    { dispatch }: StateContext<WriteReviewStateModel>,
    { payload }: UpdateReviewConstructor
  ) {
    return this._apiService.updateReviewConstructor({ input: payload }).pipe(
      tap(({ data }) => {
        if (data.constructionReviewUpdate != null) {
          const { errors, status } = data.constructionReviewUpdate;
          if (status) {
            return dispatch(new UpdateReviewConstructorSuccessful(status));
          }
          return dispatch(new UpdateReviewConstructorFailed(errors));
        } else {
          return dispatch(new UpdateReviewConstructorFailed(data));
        }
      })
    );
  }
}
