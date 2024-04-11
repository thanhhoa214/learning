import { Injectable } from '@angular/core';
import { MutationAuthUpgradeBusinessArgs } from '@loa-shared/models/graphql.model';
import { AdminUpgradeBusinessMutation } from './graphql/upgrade-business.mutation';

@Injectable({
  providedIn: 'root'
})
export class UpgradeBusinessService {
  constructor(
    private _upgradeBusinessMember: AdminUpgradeBusinessMutation
  ) { }
  memberUpgradeBusiness(args: MutationAuthUpgradeBusinessArgs) {
    return this._upgradeBusinessMember.mutate(args);
  }
}
