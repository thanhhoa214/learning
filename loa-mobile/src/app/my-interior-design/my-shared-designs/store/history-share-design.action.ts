import { QueryDesignsPurchasedArgs } from "@loa-shared/models/graphql.model";

const enum AddminActions {
  LOAD_SHARE_DESIGN_CONSTRUCTOR = "[Admin Load Share Design Constructor] Load Share Design Constructor",
  LOAD_MORE_SHARE_DESIGN_CONSTRUCTOR = "[Admin Load More Share Design Constructor] Load More Share Design Constructor",
}

export class LoadShareDesignConstructor {
  static readonly type = AddminActions.LOAD_SHARE_DESIGN_CONSTRUCTOR;
  constructor(public readonly payload?: QueryDesignsPurchasedArgs) {}
}

export class LoadMoreShareDesignConstructor {
  static readonly type = AddminActions.LOAD_MORE_SHARE_DESIGN_CONSTRUCTOR;
  constructor(public readonly payload?: QueryDesignsPurchasedArgs) {}
}
