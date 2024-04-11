import {
  ConstructionReviewNodeConnection,
  ConstructionReviewNode,
} from "@loa-shared/models/graphql.model";

export interface WriteReviewStateModel {
  nodeConnection?: ConstructionReviewNodeConnection;
  selectedNode?: ConstructionReviewNode;
}

export const initialState: WriteReviewStateModel = {};
