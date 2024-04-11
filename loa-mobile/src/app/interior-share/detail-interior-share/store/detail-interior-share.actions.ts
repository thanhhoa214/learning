import { QueryTopicsArgs, TopicDeleteInput, TopicUserFollowInput, TopicUserLikesInput } from "@loa-shared/models/graphql.model";

const enum AddminActions {
    LOAD_BOOKMARK_LIKE_INTERIOR = '[Admin Load Bookmark Like Interior] Load Bookmark Like Interior',
    BOOKMARK_INTEROR_SHARE = '[Admin Bookmark Interior Share] Load Bookmark Interior Share ID',
    BOOKMARK_INTEROR_SHARE_SUCCESSFUL = '[Admin Bookmark Interior Share Successful] Load Bookmark Interior Share Successful ID',
    BOOKMARK_INTEROR_SHARE_FAIL = '[Admin Bookmark Interior Share Fail] Load Bookmark Interior Share Fail ID',
    LIKE_INTEROR_SHARE = '[Admin Like Interior Share] Load Like Interior Share ID',
    LIKE_INTEROR_SHARE_SUCCESSFUL = '[Admin Like Interior Share Successful] Load Like Interior Share Successful ID',
    LIKE_INTEROR_SHARE_FAIL = '[Admin Like Interior Share Fail] Load Like Interior Share Fail ID',
    LOAD_BOOKMARK_LIKEBY_ID_INTERIOR = '[Admin Load Bookmark Like By ID Interior Share] Load Bookmark Like By ID Interior Share',
    DELETE_TOPIC_DETAIL = '[Admin Delete Topic Detail] Admin Topic Delete Detail',
    DELETE_TOPIC_DETAIL_SUCCESSFUL = '[Admin Delete Topic Detail Successfully] Admin Topic Delete Detail Successfully',
    DELETE_TOPIC_DETAIL_FAILED = '[Admin Delete Topic Detail Failed] Admin Topic Delete Detail Failed',
}

export class LoadBookmarkLikeInteriorShare {
    static readonly type = AddminActions.LOAD_BOOKMARK_LIKE_INTERIOR;
    constructor(public readonly payload?: QueryTopicsArgs) {}
}

export class BookmarkInterior {
    static readonly type = AddminActions.BOOKMARK_INTEROR_SHARE;
    constructor(public readonly payload?: TopicUserFollowInput) {}
}

export class BookmarkInteriorSuccessful {
    static readonly type = AddminActions.BOOKMARK_INTEROR_SHARE_SUCCESSFUL;
    constructor(public readonly payload?: any) {}
}

export class BookmarkInteriorFail {
    static readonly type = AddminActions.BOOKMARK_INTEROR_SHARE_FAIL;
    constructor(public readonly payload?: any) {}
}

export class LikeInteriorShare {
    static readonly type = AddminActions.LIKE_INTEROR_SHARE;
    constructor(public readonly payload?: TopicUserLikesInput) {}
}

export class LikeInteriorShareSuccessful {
    static readonly type = AddminActions.LIKE_INTEROR_SHARE_SUCCESSFUL;
    constructor(public readonly payload?: any) {}
}

export class LikeInteriorShareFail {
    static readonly type = AddminActions.LIKE_INTEROR_SHARE_FAIL;
    constructor(public readonly payload?: any) {}
}

export class LoadBookmarkLikeByIDInterior {
    static readonly type = AddminActions.LOAD_BOOKMARK_LIKEBY_ID_INTERIOR;
    constructor(public readonly payload?: any) {}
}

export class AdminDeleteTopicDetail {
    static readonly type = AddminActions.DELETE_TOPIC_DETAIL;
    constructor(public readonly payload: TopicDeleteInput) {}
}
  
export class AdminDeleteTopicDetailSuccessful {
    static readonly type = AddminActions.DELETE_TOPIC_DETAIL_SUCCESSFUL;
    constructor(public readonly payload: any) {}
}
export class AdminDeleteTopicDetailFailed {
    static readonly type = AddminActions.DELETE_TOPIC_DETAIL_FAILED;
    constructor(public readonly payload: any) {}
}