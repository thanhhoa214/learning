import { QueryTopicFollowsArgs, TopicUserFollowInput } from "@loa-shared/models/graphql.model";

const enum AddminActions {
    LOAD_BOOKMARK_INTERIOR_SHARE = '[Admin Load My bookmark Interior No Image] Load Bookmark Interior share No Image',
    LOAD_MORE_BOOKMARK_NO_IMAGE = '[Admin Load More bookmark Interior No Image] Load More Bookmark Interior share No Image',
    DELETE_BOOKMARK_NO_IMAGE = '[Admin Delete bookmark Interior No Image] Delete Bookmark Interior share No Image'
}

export class LoadBookmarkInteriorShareNoImage {
    static readonly type = AddminActions.LOAD_BOOKMARK_INTERIOR_SHARE;
    constructor(public readonly payload?: QueryTopicFollowsArgs) {}
}

export class LoadMoreBookmarkInteriorShareNoImage {
    static readonly type = AddminActions.LOAD_MORE_BOOKMARK_NO_IMAGE;
    constructor(public readonly payload?: QueryTopicFollowsArgs) {}
}

export class DeletetMyBookmarkNoImage {
    static readonly type = AddminActions.DELETE_BOOKMARK_NO_IMAGE;
    constructor(public readonly payload?: TopicUserFollowInput) {}
}