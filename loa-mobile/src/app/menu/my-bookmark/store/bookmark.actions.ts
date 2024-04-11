import { QueryDesignsBookmarksArgs } from '@loa-shared/models/graphql.model';
import * as Types from "@loa-shared/models/graphql.model";

const enum AddminActions {
  LOAD_BOOKMARK_DESIGN = '[Admin Load Bookmark Design] Load Bookmark Design',
  LOAD_MORE_BOOKMARK_DESIGN = '[Admin Load More Bookmark Design] Load More Bookmark Design',
  BOOKMARK_DESIGN_MY_BOOKMARK = '[Admin Bookmark Design My bookmark] Bookmark Design My bookmark',
  BOOKMARK_DESIGN_MY_BOOKMARK_SUCCESS = '[Admin Bookmark Design My bookmark Success] Bookmark Design My bookmark Success'
}

export class LoadBookmark {
  static readonly type = AddminActions.LOAD_BOOKMARK_DESIGN;
  constructor(public readonly payload?: QueryDesignsBookmarksArgs) {}
}

export class LoadMoreBookmarkDesign {
  static readonly type = AddminActions.LOAD_MORE_BOOKMARK_DESIGN;
  constructor(public readonly payload?: QueryDesignsBookmarksArgs) {}
}

export class BookmarkDesignMyBookmark {
  static readonly type = AddminActions.BOOKMARK_DESIGN_MY_BOOKMARK;
  constructor(public readonly payload?: Types.Scalars["String"]) {}
}

export class BookmarkDesignMyBookmarkSuccess {
  static readonly type = AddminActions.BOOKMARK_DESIGN_MY_BOOKMARK_SUCCESS;
  constructor(public readonly payload?: any) {}
}
