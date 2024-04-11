import { ArticleUserFollowInput, QueryArticleFollowsArgs } from "@loa-shared/models/graphql.model";

const enum AddminActions {
  LOAD_BOOKMARK_LIFE_STYLE = '[Admin Load Bookmark Life Style] Load Bookmark Life Style',
  LOAD_MORE_BOOKMARK_LIFE_STYLE = '[Admin Load More Bookmark Life Style] Load More Bookmark Life Style',
  BOOKMARK_LIFE_STYLE_MY_BOOKMARK = '[Admin Bookmark Life Style My bookmark] Bookmark Life Style My bookmark',
  BOOKMARK_LIFE_STYLE_MY_BOOKMARK_SUCCESS = '[Admin Bookmark Life Style My bookmark Success] Bookmark Life Style My bookmark Success'
}

export class LoadBookmarkLifeStyle {
  static readonly type = AddminActions.LOAD_BOOKMARK_LIFE_STYLE;
  constructor(public readonly payload?: QueryArticleFollowsArgs) {}
}

export class LoadMoreBookmarkLifeStyle {
  static readonly type = AddminActions.LOAD_MORE_BOOKMARK_LIFE_STYLE;
  constructor(public readonly payload?: QueryArticleFollowsArgs) {}
}

export class BookmarkLifeStyleMyBookmark {
  static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_MY_BOOKMARK;
  constructor(public readonly payload?: ArticleUserFollowInput) {}
}

export class BookmarkLifeStyleMyBookmarkSuccess {
  static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_MY_BOOKMARK_SUCCESS;
  constructor(public readonly payload?: any) {}
}