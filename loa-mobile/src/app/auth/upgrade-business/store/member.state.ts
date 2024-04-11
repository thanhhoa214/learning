import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { UpgradeBusinessService } from "../upgrade-business.service";
import { UpgradeBusinessStateModel, initialState } from "./member-state.model";
import { AdminUpgradeBusiness, AdminUpgradeBusinessFailed, AdminUpgradeBusinessSuccessful } from "./member.actions";

@Injectable({ providedIn: 'root' })
@State<UpgradeBusinessStateModel>({
  name: 'upgradeBusiness',
  defaults: initialState,
})
export class UpgradeBusinessState {
  @Selector()
  static getNodeConnection({ nodeConnection }: UpgradeBusinessStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: UpgradeBusinessStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: UpgradeBusinessService) {}

  @Action(AdminUpgradeBusiness, { cancelUncompleted: true })
  adminUpgradeBusiness(
    { dispatch }: StateContext<UpgradeBusinessStateModel>,
    { payload }: AdminUpgradeBusiness
  ) {
    return this._apiService.memberUpgradeBusiness({ input: payload }).pipe(
      tap(({ data }) => {
        if(data.authUpgradeBusiness != null){
          const { errors, status, business} = data.authUpgradeBusiness;
          if (status) {
            return dispatch(new AdminUpgradeBusinessSuccessful(business));
          }
          return dispatch(new AdminUpgradeBusinessFailed(errors));
        }else{
          return dispatch(new AdminUpgradeBusinessFailed(data));
        }
        
      })
    );
  }
}