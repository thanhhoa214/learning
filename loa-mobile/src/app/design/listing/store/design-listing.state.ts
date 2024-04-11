import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  LoadDesignListing,
  LoadDesignListingNext,
  SaveFilters,
  ToggleBookmarkStatusById,
} from './design-listing.actions';
import { tap } from 'rxjs/operators';
import { isEquals } from '../../../shared/utils';
import { GetAllDesignsQuery, GetAllDesignsGQL } from '../../shared/services';
import { Filters } from '../../shared/models/filter.model';
import produce from 'immer';
export class DesignListingStateModel {
  designs?: GetAllDesignsQuery['designs'];
  filters?: Filters;
}

const defaults = {
  filters: {},
};

@State<DesignListingStateModel>({
  name: 'designListing',
  defaults,
})
@Injectable()
export class DesignListingState {
  @Selector()
  static designs({ designs }: DesignListingStateModel) {
    return designs;
  }
  @Selector()
  static filters({ filters }: DesignListingStateModel) {
    return filters;
  }

  constructor(private designsQuery: GetAllDesignsGQL) {}

  @Action(LoadDesignListing)
  loadDesignListing(
    { getState, patchState }: StateContext<DesignListingStateModel>,
    { payload }: LoadDesignListing
  ) {
    const state = getState();

    return this.designsQuery.fetch({ first: 5, ...payload }).pipe(
      tap(({ data }) => {
        const { designs } = data;

        if (isEquals(designs, state.designs)) return;
        patchState({ designs });
      })
    );
  }
  @Action(LoadDesignListingNext, { cancelUncompleted: true })
  loadDesignListingNext(
    { getState, patchState }: StateContext<DesignListingStateModel>,
    { payload }: LoadDesignListingNext
  ) {
    return this.designsQuery.fetch({ first: 5, ...payload }).pipe(
      tap(({ data }) => {
        const { designs } = data;

        const newState = produce(getState(), (draftState) => {
          const draftDesigns = draftState.designs;
          draftDesigns.pageInfo = designs.pageInfo;
          draftDesigns.edges = draftDesigns.edges.concat(designs.edges);
        });
        patchState(newState);
      })
    );
  }
  @Action(SaveFilters, { cancelUncompleted: true })
  saveFilters(
    { patchState }: StateContext<DesignListingStateModel>,
    { payload }: SaveFilters
  ) {
    patchState({ filters: payload });
  }

  @Action(ToggleBookmarkStatusById)
  toggleBookmarkStatusById(
    { getState, patchState }: StateContext<DesignListingStateModel>,
    { payload }: ToggleBookmarkStatusById
  ) {
    const newState = produce(getState(), (draftState) => {
      const edges = draftState.designs.edges;
      const index = edges.findIndex((edge) => edge.node.id === payload.id);
      if (index !== -1)
        edges[index].node.bookmarked = !edges[index].node.bookmarked;
    });
    patchState(newState);
  }
}
