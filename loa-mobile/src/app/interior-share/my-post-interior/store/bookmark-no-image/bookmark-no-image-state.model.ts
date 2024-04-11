import {
    TopicFollowNodeConnection,
    TopicFollowNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface BookmarkInteriorNoImageStateModel {
      nodeConnection?: TopicFollowNodeConnection;
      selectedNode?: TopicFollowNode;
    }
    
    export const initialState: BookmarkInteriorNoImageStateModel = {};