import { ArticleCommentCreateInput, ArticleUserFollowInput, ArticleUserLikesInput, QueryArticlesArgs } from "@loa-shared/models/graphql.model";

const enum AddminActions {
    LOAD_BOOKMARK_LIKEBY_ID = '[Admin Load Bookmark Like By ID] Load Bookmark Like By ID',
    BOOKMARK_LIFE_STYLE = '[Admin Bookmark Life Style] Load Bookmark Life Style ID',
    BOOKMARK_LIFE_STYLE_SUCCESSFUL = '[Admin Bookmark Life Style Successful] Load Bookmark Life Style Successful ID',
    BOOKMARK_LIFE_STYLE_FAIL = '[Admin Bookmark Life Style Fail] Load Bookmark Life Style Fail ID',
    LIKE_LIFE_STYLE = '[Admin Like Life Style] Load Like Life Style ID',
    LIKE_LIFE_STYLE_SUCCESSFUL = '[Admin Like Life Style Successful] Load Like Life Style Successful ID',
    LIKE_LIFE_STYLE_FAIL = '[Admin Like Life Style Fail] Load Like Life Style Fail ID',
    LOAD_BOOKMARK_LIKE = '[Admin Load Bookmark Like] Load Bookmark Like',
    COMMENT_LIFE_STYLE = '[Admin Comment Life Style] Comment Life Style ID',
    COMMENT_LIFE_STYLE_SUCCESSFUL = '[Admin Comment Life Style Successful] Comment Life Style Successful ID',
    COMMENT_LIFE_STYLE_FAIL = '[Admin Comment Life Style Fail] Comment Comment Style Fail ID',
}

export class LoadBookmarkLikeByID {
    static readonly type = AddminActions.LOAD_BOOKMARK_LIKEBY_ID;
    constructor(public readonly payload?: any) {}
}

export class BookmarkLifeStyle {
    static readonly type = AddminActions.BOOKMARK_LIFE_STYLE;
    constructor(public readonly payload?: ArticleUserFollowInput) {}
}

export class BookmarkLifeStyleSuccessful {
    static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_SUCCESSFUL;
    constructor(public readonly payload?: any) {}
}

export class BookmarkLifeStyleFail {
    static readonly type = AddminActions.BOOKMARK_LIFE_STYLE_FAIL;
    constructor(public readonly payload?: any) {}
}

export class LikeLifeStyle {
    static readonly type = AddminActions.LIKE_LIFE_STYLE;
    constructor(public readonly payload?: ArticleUserLikesInput) {}
}

export class LikeLifeStyleSuccessful {
    static readonly type = AddminActions.LIKE_LIFE_STYLE_SUCCESSFUL;
    constructor(public readonly payload?: any) {}
}

export class LikeLifeStyleFail {
    static readonly type = AddminActions.LIKE_LIFE_STYLE_FAIL;
    constructor(public readonly payload?: any) {}
}

export class LoadBookmarkLike {
    static readonly type = AddminActions.LOAD_BOOKMARK_LIKE;
    constructor(public readonly payload?: QueryArticlesArgs) {}
}

export class CommentLifeStyle {
    static readonly type = AddminActions.COMMENT_LIFE_STYLE;
    constructor(public readonly payload?: ArticleCommentCreateInput) {}
}

export class CommentLifeStyleSuccessful {
    static readonly type = AddminActions.COMMENT_LIFE_STYLE_SUCCESSFUL;
    constructor(public readonly payload?: any) {}
}

export class CommentLifeStyleFail {
    static readonly type = AddminActions.COMMENT_LIFE_STYLE_FAIL;
    constructor(public readonly payload?: any) {}
}