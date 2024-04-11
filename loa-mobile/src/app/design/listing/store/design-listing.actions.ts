import { GetAllDesignsQueryVariables } from '../../shared/services';
import { Filters } from '../../shared/models/filter.model';

const enum Actions {
  LOAD_DESIGN_LISTING = '[DesignListing] Load Design Listing',
  LOAD_DESIGN_LISTING_NEXT = '[DesignListing] Load Design Listing Next',
  TOGGLE_BOOKMARK_STATUS_BY_ID = '[DesignListing] Toggle Bookmark Status By Id',
  SAVE_FILTERS = '[DesignListing] Save Filters',
}

export class LoadDesignListing {
  static readonly type = Actions.LOAD_DESIGN_LISTING;
  constructor(public payload?: GetAllDesignsQueryVariables) {}
}
export class LoadDesignListingNext {
  static readonly type = Actions.LOAD_DESIGN_LISTING_NEXT;
  constructor(public payload?: GetAllDesignsQueryVariables) {}
}
export class ToggleBookmarkStatusById {
  static readonly type = Actions.TOGGLE_BOOKMARK_STATUS_BY_ID;
  constructor(public payload?: { id: string }) {}
}
export class SaveFilters {
  static readonly type = Actions.SAVE_FILTERS;
  constructor(public payload: Filters) {}
}
