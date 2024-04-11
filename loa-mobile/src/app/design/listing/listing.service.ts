import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import {
  LoadDesignListing,
  LoadDesignListingNext,
  DesignListingState,
  DesignListingStateModel,
  SaveFilters,
  ToggleBookmarkStatusById,
} from './store';
import {
  AREA_FILTER_RULE,
  Filters,
  PRICE_FILTER_RULE,
  CONSTRUCTION_PRICE_FILTER_RULE,
} from '../shared/models';
import { GetAllDesignsQueryVariables } from '../shared/services';
import { isEquals } from '@loa-shared/utils';

@Injectable({ providedIn: 'root' })
export class DesignListingService {
  designs$: Observable<DesignListingStateModel['designs']>;
  filters$: Observable<DesignListingStateModel['filters']>;

  constructor(private _store: Store, private _actions: Actions) {
    this.designs$ = this._store.select(DesignListingState.designs);
    this.filters$ = this._store.select(DesignListingState.filters);
  }
  get designs(): DesignListingStateModel['designs'] {
    return this._store.selectSnapshot(DesignListingState.designs);
  }
  get filters(): DesignListingStateModel['filters'] {
    return this._store.selectSnapshot(DesignListingState.filters);
  }

  loadDesignsWithFilters(
    input?: GetAllDesignsQueryVariables,
    shouldLoadMore = false
  ) {
    const {
      areaFrom = 0,
      areaTo,
      designType,
      houseTypes = [],
      styles = [],
      roomTypes = [],
      lowestPrice = 0,
      highestPrice,
      lowestConstructionPrice,
      highestConstructionPrice,
      projectName,
    } = this.filters;
    const inputFromFilters: GetAllDesignsQueryVariables = {
      designType: designType?.toLowerCase(),
      style:
        styles.length === 0
          ? undefined
          : styles.map((style) => style.toLowerCase()).join(','),
      typeOfHouse:
        houseTypes.length === 0
          ? undefined
          : houseTypes.map((houseType) => houseType.toLowerCase()).join(','),
      roomType:
        roomTypes.length === 0
          ? undefined
          : roomTypes.map((roomType) => roomType.toLowerCase()).join(','),
      areaFrom:
        areaFrom && areaFrom !== AREA_FILTER_RULE.MIN
          ? areaFrom + ''
          : AREA_FILTER_RULE.UNLIMITED,
      areaTo:
        areaTo && areaTo !== AREA_FILTER_RULE.MAX
          ? areaTo + ''
          : AREA_FILTER_RULE.UNLIMITED,
      priceFrom:
        lowestPrice && lowestPrice !== PRICE_FILTER_RULE.MIN
          ? lowestPrice + ''
          : PRICE_FILTER_RULE.UNLIMITED,
      priceTo:
        highestPrice && highestPrice !== PRICE_FILTER_RULE.MAX
          ? highestPrice + ''
          : PRICE_FILTER_RULE.UNLIMITED,
      estimateCostFrom:
        lowestConstructionPrice &&
        lowestConstructionPrice !== CONSTRUCTION_PRICE_FILTER_RULE.MIN
          ? lowestConstructionPrice + ''
          : CONSTRUCTION_PRICE_FILTER_RULE.UNLIMITED,
      estimateCostTo:
        highestConstructionPrice &&
        highestConstructionPrice !== CONSTRUCTION_PRICE_FILTER_RULE.MAX
          ? highestConstructionPrice + ''
          : CONSTRUCTION_PRICE_FILTER_RULE.UNLIMITED,
      projectName,
    };
    if (shouldLoadMore)
      this._store.dispatch(
        new LoadDesignListingNext({ ...inputFromFilters, ...input })
      );
    else
      this._store.dispatch(
        new LoadDesignListing({ ...inputFromFilters, ...input })
      );
  }
  toggleBookmarkStatusById(id: string) {
    this._store.dispatch(new ToggleBookmarkStatusById({ id }));
  }
  saveFilters(filters: Filters) {
    this._store.dispatch(new SaveFilters(filters));
  }
  patchFilters(filters: Filters) {
    this._store.dispatch(new SaveFilters({ ...this.filters, ...filters }));
  }
  hasFilters(): boolean {
    return !isEquals(this.filters, {});
  }
  onLoadDesignsCompleted() {
    return this._actions.pipe(ofActionSuccessful(LoadDesignListing));
  }
  onLoadDesignsMoreCompleted() {
    return this._actions.pipe(ofActionSuccessful(LoadDesignListingNext));
  }
}
