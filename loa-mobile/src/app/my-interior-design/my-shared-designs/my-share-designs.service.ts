import { Injectable } from "@angular/core";
import { QueryDesignsHistoryShareWithCcArgs } from "@loa-shared/models/graphql.model";
import { GetAllShareDesignConstructor } from "./graphql/get-all-design-share-constructor.query";

@Injectable({
  providedIn: "root",
})
export class MyShareDesignsService {
  constructor(private _getAllShareDesign: GetAllShareDesignConstructor) {}
  getAllShareDesignConstructor(args?: QueryDesignsHistoryShareWithCcArgs) {
    return this._getAllShareDesign.watch(args).valueChanges;
  }
}
