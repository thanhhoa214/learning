import { ShareDesignCreateInput } from '@loa-shared/models/graphql.model';
import { GetAllConstructionsQueryVariables } from '../services';

const enum Actions {
  LOAD_CONSTRUCTOR_LISTING = '[ConstructionListing] Load Construction Listing',
  LOAD_CONSTRUCTOR_LISTING_NEXT = '[ConstructionListing] Load Construction Listing Next',
  TOGGLE_BOOKMARK_STATUS_BY_ID = '[ConstructionListing] Toggle Bookmark Status By Id',
  SAVE_FILTERS = '[ConstructionListing] Save Filters',
  SHARE_DESIGN = '[Share Design Construction] Share Design Construction',
  SHARE_DESIGN_SUCCESS = '[Share Design Construction Success] Share Design Construction Success'
}

export class LoadConstructionListing {
  static readonly type = Actions.LOAD_CONSTRUCTOR_LISTING;
  constructor(public payload?: GetAllConstructionsQueryVariables) {}
}
export class LoadConstructionListingNext {
  static readonly type = Actions.LOAD_CONSTRUCTOR_LISTING_NEXT;
  constructor(public payload?: GetAllConstructionsQueryVariables) {}
}

export class ShareDeSignConstruction {
  static readonly type = Actions.SHARE_DESIGN;
  constructor(public payload?: ShareDesignCreateInput) {}
}

export class ShareDeSignConstructionSuccess {
  static readonly type = Actions.SHARE_DESIGN_SUCCESS;
  constructor() {console.log("Success")}
}
