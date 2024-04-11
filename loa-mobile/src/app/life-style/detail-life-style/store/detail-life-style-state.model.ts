import {
    ArticleNodeConnection,
    ArticleNode,
    } from '@loa-shared/models/graphql.model';
    
    export interface DetailLifeStyleStateModel {
      nodeConnection?: ArticleNodeConnection;
      selectedNode?: ArticleNode;
    }
    
    export const initialState: DetailLifeStyleStateModel = {};