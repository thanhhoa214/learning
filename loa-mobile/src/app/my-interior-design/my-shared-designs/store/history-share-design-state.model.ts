import {
  DesignNode,
  DesignNodeConnection,
} from "@loa-shared/models/graphql.model";

export interface ShareDesignConstructorStateModel {
  nodeConnection?: DesignNodeConnection;
  selectedNode?: DesignNode;
}

export const initialState: ShareDesignConstructorStateModel = {};
