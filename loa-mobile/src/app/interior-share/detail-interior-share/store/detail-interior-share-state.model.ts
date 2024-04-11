import {
    TopicNodeConnection,
    TopicNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface DetailInteriorShareStateModel {
      nodeConnection?: TopicNodeConnection;
      selectedNode?: TopicNode;
    }
    
    export const initialState: DetailInteriorShareStateModel = {};