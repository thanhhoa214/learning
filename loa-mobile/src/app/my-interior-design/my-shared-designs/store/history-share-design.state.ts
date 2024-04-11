import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import produce from "immer";
import { tap } from "rxjs/operators";
import { MyShareDesignsService } from "../my-share-designs.service";
import {
  ShareDesignConstructorStateModel,
  initialState,
} from "./history-share-design-state.model";
import {
  LoadMoreShareDesignConstructor,
  LoadShareDesignConstructor,
} from "./history-share-design.action";

@Injectable({ providedIn: "root" })
@State<ShareDesignConstructorStateModel>({
  name: "shareDesignConstructor",
  defaults: initialState,
})
export class MyShareDesignConstructorState {
  @Selector()
  static getNodeConnection({
    nodeConnection,
  }: ShareDesignConstructorStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: ShareDesignConstructorStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: MyShareDesignsService) {}

  @Action(LoadShareDesignConstructor, { cancelUncompleted: true })
  loadShareDesignConstructor(
    { patchState }: StateContext<ShareDesignConstructorStateModel>,
    { payload }: LoadShareDesignConstructor
  ) {
    return this._apiService.getAllShareDesignConstructor({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({
          nodeConnection: data.designsHistoryShareWithCc,
        });
      })
    );
  }

  @Action(LoadMoreShareDesignConstructor)
  loadMoreShareDesignConstructor(
    ctx: StateContext<ShareDesignConstructorStateModel>,
    { payload }: LoadMoreShareDesignConstructor
  ) {
    return this._apiService.getAllShareDesignConstructor({ ...payload }).pipe(
      tap(({ data }) => {
        const { designsHistoryShareWithCc } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = designsHistoryShareWithCc.pageInfo;
          draftDesign.edges = [
            ...draftDesign.edges,
            ...designsHistoryShareWithCc.edges,
          ];
        });
        ctx.patchState(newState);
      })
    );
  }
}
