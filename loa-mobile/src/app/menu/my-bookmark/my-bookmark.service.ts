import { Injectable } from '@angular/core';
import { BookmarkLifeStyleMutation } from '@loa-mobile/life-style/shared/graphql/mutations';
import { MutationArticleUserFollowArgs, MutationDesignUserBookmarksArgs, QueryArticleFollowsArgs, QueryDesignsBookmarksArgs } from '@loa-shared/models/graphql.model';
import { BookmarkDesignMyBookmarkMutation } from './shared/mutations/delete-bookmark-design.mutation';
import { LoadBookmarkLifeStyleQuery } from './shared/queries/load-bookmark-life-style.query';
import { LoadMoreBookmarkDesignQuery } from './shared/queries/load-more-bookmark-design.query';

@Injectable({
  providedIn: 'root'
})
export class MyBookmarkService {
  constructor(
    private _getLoadMoreBookmarkDesign: LoadMoreBookmarkDesignQuery,
    private _getBookmarkLifeStyle: LoadBookmarkLifeStyleQuery,
    private _bookmarkLifeStyle: BookmarkLifeStyleMutation,
    private _bookmarkDesign: BookmarkDesignMyBookmarkMutation
  ) {}

  loadMoreBookmarkDesign(args?: QueryDesignsBookmarksArgs) {
    return this._getLoadMoreBookmarkDesign.watch(args).valueChanges;
  }

  loadBookmarkLifeStyle(args?: QueryArticleFollowsArgs) {
    return this._getBookmarkLifeStyle.watch(args).valueChanges;
  }

  bookmarkLifeStyle(args: MutationArticleUserFollowArgs) {
    return this._bookmarkLifeStyle.mutate(args);
  }

  bookmarkDesign(args: MutationDesignUserBookmarksArgs) {
    return this._bookmarkDesign.mutate(args);
  }
}
