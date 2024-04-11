import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Actions, ofActionDispatched, Store } from "@ngxs/store";
import {
  LoadConstructionDetail,
  ConstructionDetailState,
  ClearConstructionDetail,
} from "./store";
import {
  GetConstructionQuery,
  GetConstructionQueryVariables,
} from "./services";
import { Plugins } from "@capacitor/core";
import {
  BranchDeepLinksWeb,
  BranchShortUrlParams,
} from "capacitor-branch-deep-links";
const { Share, BranchDeepLinks } = Plugins;

@Injectable({ providedIn: "root" })
export class ConstructionDetailService {
  constructor(private _store: Store, private _actions: Actions) {}
  loadConstructionDetail(queryVariables?: GetConstructionQueryVariables) {
    this._store.dispatch(new LoadConstructionDetail(queryVariables));
  }
  async share(construction: GetConstructionQuery["construction"]) {
    const routingUrl = `/construction/${construction.id}`;
    const params: BranchShortUrlParams = {
      analytics: null,
      properties: {
        custom_string: routingUrl,
      },
    };
    const {
      url,
    } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(params);
    return Share.share({
      title: construction.constructorCompany.companyName,
      url,
      dialogTitle: `Share ${construction.constructorCompany.companyName}`,
    });
  }
  clear(id: string) {
    const isMatched =
      this._store.selectSnapshot(ConstructionDetailState.constructionId) === id;
    if (!isMatched) this._store.dispatch(new ClearConstructionDetail());
  }
  getConstructionDetail$(): Observable<GetConstructionQuery> {
    return this._store.select(ConstructionDetailState.construction);
  }
  getConstructionDetail(): GetConstructionQuery {
    return this._store.selectSnapshot(ConstructionDetailState.construction);
  }
  onLoadConstructionDetail() {
    return this._actions.pipe(ofActionDispatched(LoadConstructionDetail));
  }
}
