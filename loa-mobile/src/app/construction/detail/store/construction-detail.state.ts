import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  ClearConstructionDetail,
  LoadConstructionDetail,
} from "./construction-detail.actions";
import { tap } from "rxjs/operators";
import { GetConstructionGQL, GetConstructionQuery } from "../services";
import { isEquals } from "@loa-shared/utils";

export class ConstructionDetailStateModel {
  construction?: GetConstructionQuery;
}

const defaults = {};

@State<ConstructionDetailStateModel>({
  name: "constructionDetail",
  defaults,
})
@Injectable()
export class ConstructionDetailState {
  @Selector()
  static construction({ construction }: ConstructionDetailStateModel) {
    return construction;
  }
  @Selector()
  static constructionId({ construction }: ConstructionDetailStateModel) {
    return construction.construction.id;
  }

  constructor(private _constructionQuery: GetConstructionGQL) {}

  @Action(LoadConstructionDetail)
  loadConstructionDetail(
    { getState, patchState }: StateContext<ConstructionDetailStateModel>,
    { payload }: LoadConstructionDetail
  ) {
    const state = getState();
    return this._constructionQuery.fetch(payload).pipe(
      tap(({ data }) => {
        if (isEquals(data, state.construction)) return;
        patchState({ construction: data });
      })
    );
  }

  @Action(ClearConstructionDetail)
  clear({ patchState }: StateContext<ConstructionDetailStateModel>) {
    patchState({ construction: undefined });
  }
}
