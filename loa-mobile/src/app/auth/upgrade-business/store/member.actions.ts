import { UpgradeBusinessInput } from "@loa-shared/models/graphql.model";

const enum AddminActions {
    UPGRADE_BUSINESS = '[Customer Upgrade] Upgrade Business',
    UPGRADE_BUSINESS_SUCCESSFUL = '[Customer Upgrade] Upgrade Business Successfully',
    UPGRADE_BUSINESS_FAILED = '[Customer Upgrade] Upgrade Business Failed',
  }

  export class AdminUpgradeBusiness {
    static readonly type = AddminActions.UPGRADE_BUSINESS;
    constructor(public readonly payload: UpgradeBusinessInput) {}
  }
  
  export class AdminUpgradeBusinessSuccessful {
    static readonly type = AddminActions.UPGRADE_BUSINESS_SUCCESSFUL;
    constructor(public readonly payload: any) {}
  }
  export class AdminUpgradeBusinessFailed {
    static readonly type = AddminActions.UPGRADE_BUSINESS_FAILED;
    constructor(public readonly payload: any) {}
  }