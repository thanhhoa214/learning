import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  LoadConstructionListing,
  LoadConstructionListingNext,
  ShareDeSignConstruction,
  ShareDeSignConstructionSuccess,
} from './construction-listing.actions';
import { tap } from 'rxjs/operators';
import { isEquals } from '@loa-shared/utils';
import {
  GetAllConstructionsQuery,
  GetAllConstructionsGQL,
  ShareDesignConstructorMutationGQL,
} from '../services';
import { produce } from 'immer';
export class ConstructionListingStateModel {
  constructions?: GetAllConstructionsQuery['constructions'];
}

const defaults = {};

@State<ConstructionListingStateModel>({
  name: 'constructionListing',
  defaults,
})
@Injectable()
export class ConstructionListingState {
  @Selector()
  static constructions({ constructions }: ConstructionListingStateModel) {
    return constructions;
  }

  constructor(
    private constructionsQuery: GetAllConstructionsGQL,
    private userShareDesignConstructorMutation: ShareDesignConstructorMutationGQL
  ) {}

  @Action(LoadConstructionListing)
  loadConstructionListing(
    { getState, patchState }: StateContext<ConstructionListingStateModel>,
    { payload }: LoadConstructionListing
  ) {
    const state = getState();

    return this.constructionsQuery
      .fetch({ orderBy: '-id', first: 10, ...payload })
      .pipe(
        tap(({ data }) => {
          const { constructions } = data;
          if (isEquals(constructions, state.constructions)) return;
          patchState({ constructions });
        })
      );
  }
  @Action(LoadConstructionListingNext, { cancelUncompleted: true })
  loadConstructionListingNext(
    { getState, patchState }: StateContext<ConstructionListingStateModel>,
    { payload }: LoadConstructionListingNext
  ) {
    return this.constructionsQuery
      .fetch({ orderBy: '-id', first: 10, ...payload })
      .pipe(
        tap(({ data }) => {
          const { constructions } = data;

          const newState = produce(getState(), (draftState) => {
            const draftConstructions = draftState.constructions;
            draftConstructions.pageInfo = constructions.pageInfo;
            draftConstructions.edges = draftConstructions.edges.concat(
              constructions.edges
            );
          });

          patchState(newState);
        })
      );
  }
  @Action(ShareDeSignConstruction, { cancelUncompleted: true })
  adminUpdateTopic(
    { dispatch }: StateContext<ConstructionListingStateModel>,
    { payload }: ShareDeSignConstruction
  ) {
    return this.userShareDesignConstructorMutation
      .mutate({ input: payload })
      .pipe(
        tap(({ data }) => {
          const { status } = data.userShareDesignConstructor;
          if (status) {
            return dispatch(new ShareDeSignConstructionSuccess());
          }
        })
      );
  }
}
