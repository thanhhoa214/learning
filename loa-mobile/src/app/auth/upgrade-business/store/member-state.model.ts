import { UserNode, UserNodeConnection } from "@loa-shared/models/graphql.model";

export interface UpgradeBusinessStateModel {
  nodeConnection?: UserNodeConnection;
  selectedNode?: UserNode;
}

export const initialState: UpgradeBusinessStateModel = {};