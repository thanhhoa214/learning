import {
    TopicFollowNodeConnection,
    TopicFollowNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface BookmarkInteriorStateModel {
      nodeConnection?: TopicFollowNodeConnection;
      selectedNode?: TopicFollowNode;
    }
    
    export const initialState: BookmarkInteriorStateModel = {};