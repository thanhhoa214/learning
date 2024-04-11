import { QueryTopicFollowsArgs, TopicUserFollowInput } from "@loa-shared/models/graphql.model";

const enum AddminActions {
    LOAD_BOOKMARK_INTERIOR_SHARE = '[Admin Load My bookmark Interior] Load Bookmark Interior share',
    LOAD_MORE_BOOKMARK_IMAGE = '[Admin Load More bookmark Interior Image] Load More Bookmark Interior share Image',
    DELETE_BOOKMARK_IMAGE = '[Admin Delete bookmark Interior Image] Delete Bookmark Interior share Image'
}

export class LoadBookmarkInteriorShare {
    static readonly type = AddminActions.LOAD_BOOKMARK_INTERIOR_SHARE;
    constructor(public readonly payload?: QueryTopicFollowsArgs) {}
}

export class LoadMoreBookmarkInteriorShareImage {
    static readonly type = AddminActions.LOAD_MORE_BOOKMARK_IMAGE;
    constructor(public readonly payload?: QueryTopicFollowsArgs) {}
}

export class DeleteMyBookmark {
    static readonly type = AddminActions.DELETE_BOOKMARK_IMAGE;
    constructor(public readonly payload?: TopicUserFollowInput) {}
}