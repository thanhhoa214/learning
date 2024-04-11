import {
    ArticleFollowNodeConnection,
    ArticleFollowNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface BookmarkLifeStyleStateModel {
      nodeConnection?: ArticleFollowNodeConnection;
      selectedNode?: ArticleFollowNode;
    }
    
    export const initialState: BookmarkLifeStyleStateModel = {};