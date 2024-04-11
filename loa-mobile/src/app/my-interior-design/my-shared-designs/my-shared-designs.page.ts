import { ChangeDetectorRef, Component } from "@angular/core";
import { SubSinkable } from "@loa-shared/models";
import { Store } from "@ngxs/store";
import {
  LoadMoreShareDesignConstructor,
  LoadShareDesignConstructor,
  MyShareDesignConstructorState,
} from "./store";

@Component({
  templateUrl: "./my-shared-designs.page.html",
  styleUrls: ["./my-shared-designs.page.scss"],
})
export class MySharedDesignsPage extends SubSinkable {
  itemsPerPage = 10;
  selectedOrderBy = "-id";
  pageInfo;
  dataSource = [];
  checkLoadMore = false;
  hideLoadMore = false;
  pageCount = 0;
  constructor(private _store: Store, private _cdRef: ChangeDetectorRef) {
    super();
  }
  ionViewWillEnter(): void {
    this.loadDataShareDesignConstructor(this.selectedOrderBy);
  }

  loadDataShareDesignConstructor(orderBy) {
    this._store.dispatch(
      new LoadShareDesignConstructor({
        first: this.itemsPerPage,
        orderBy: orderBy,
      })
    );
    this._subSink.sink = this._store
      .select(MyShareDesignConstructorState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.pageCount = nodeConnection.totalCount;
      this.dataSource = edges;
      if (
        parseInt(nodeConnection.pageInfo.endCursor) + 1 ==
          nodeConnection.totalCount &&
        this.checkLoadMore
      ) {
        this.hideLoadMore = true;
      } else {
        this.hideLoadMore = false;
      }
      console.log(this.dataSource);
    }
    this._cdRef.detectChanges();
  }
  loadMorePurchaseDesign(event) {
    setTimeout(() => {
      event.target.complete();
      this.checkLoadMore = true;
      if (this.pageInfo.hasNextPage) {
        this._store.dispatch(
          new LoadMoreShareDesignConstructor({
            first: this.itemsPerPage,
            after: this.pageInfo.endCursor,
            orderBy: this.selectedOrderBy,
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }
}
