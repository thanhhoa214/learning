import {
    TopicNodeConnection,
    TopicNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface InteriorShareStateModel {
      nodeConnection?: TopicNodeConnection;
      selectedNode?: TopicNode;
    }
    
    export const initialState: InteriorShareStateModel = {};