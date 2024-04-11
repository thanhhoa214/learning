import {
  ArticleNodeConnection,
  ArticleNode,
  } from '@loa-shared/models/graphql.model';
import { GetByIdArticleQuery } from '../shared/graphql/queries';
  
  export interface LifeStyleStateModel {
    nodeConnection?: ArticleNodeConnection;
    selectedNode?: ArticleNode;
    article?: GetByIdArticleQuery;
  }
  
  export const initialState: LifeStyleStateModel = {};