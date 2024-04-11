import { formatNumber } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { OpenFileService } from '@loa-mobile/core/services/open-file.service';
import { SubSinkable } from '@loa-shared/models';
import { NotificationService } from '@loa-shared/services/notification.service';
import { Store } from '@ngxs/store';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { MyPurchaseDesignService } from './my-purchase-design.service';
import { LoadMorePurchaseDesign, LoadPurchaseDesign, MyPurchaseDesignState } from './store';
@Component({
  templateUrl: './my-purchased-designs.page.html',
  styleUrls: ['./my-purchased-designs.page.scss']
})
export class MyPurchasedDesignsPage extends SubSinkable implements ViewWillEnter {
  checkLoadMore = false;
  dataSource = [];
  downloadedIds = [];
  hideLoadMore = false;
  itemsPerPage = 10;
  pageCount = 0;
  pageInfo;

  constructor(
    public activatedRoute: ActivatedRoute,
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private _myPurchaseService: MyPurchaseDesignService,
    private _loadingCtrl: LoadingController,
    private _notify: NotificationService,
    private _openFileService: OpenFileService
  ) {
    super();
  }

  downloadDesignFile(id: string, name: string) {
    this._myPurchaseService.download(id, name);
  }

  ionViewWillEnter(): void {
    this.loadDataPurchaseDesign();
    this._myPurchaseService.updateDownloadedIds();
    this._registerDownloadedIds();
    this._registerDownload();
    this._registerDownloading();
    this._registerDownloadFailed();
    this._registerDownloadSuccessful();
  }

  loadDataPurchaseDesign() {
    this._store.dispatch(
      new LoadPurchaseDesign({
        first: this.itemsPerPage
      })
    );
    this._subSink.sink = this._store
      .select(MyPurchaseDesignState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  loadMorePurchaseDesign(event) {
    setTimeout(() => {
      event.target.complete();
      this.checkLoadMore = true;
      if (this.pageInfo.hasNextPage) {
        this._store.dispatch(
          new LoadMorePurchaseDesign({
            first: this.itemsPerPage,
            after: this.pageInfo.endCursor
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }

  async openDialog({ id, name, fileName }: { id: string; name?: string; fileName?: string }) {
    const realFileName = fileName ?? `${id}-${name}.zip`;
    const folderUrl = this._myPurchaseService.snapshot.prefixUri;
    this._openFileService.open({ folderUrl, fileName: realFileName });
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.pageCount = nodeConnection.totalCount;
      this.dataSource = edges;
      if (
        parseInt(nodeConnection.pageInfo.endCursor) + 1 == nodeConnection.totalCount &&
        this.checkLoadMore
      ) {
        this.hideLoadMore = true;
      } else {
        this.hideLoadMore = false;
      }
    }
    this._cdRef.detectChanges();
  }

  private _registerDownload() {
    this._subSink.sink = this._myPurchaseService.onDownload$.subscribe(async () => {
      let topLoading = await this._loadingCtrl.getTop();
      if (!topLoading) {
        topLoading = await this._loadingCtrl.create({
          duration: 9999999999,
          cssClass: 'downloading'
        });
      }
      await topLoading.present();
      topLoading.message = 'Downloading...0%';
    });
  }

  private _registerDownloadFailed() {
    this._subSink.sink = this._myPurchaseService.onDownloadFailed$.subscribe(() => {
      this._loadingCtrl?.dismiss();
      this._notify.openSnackBar('Download Failed for some reason. Please try again.', 'error');
    });
  }

  private _registerDownloadSuccessful() {
    this._subSink.sink = this._myPurchaseService.onDownloadSuccessful$.subscribe(
      ({ payload: { id, fileName } }) => {
        this._loadingCtrl?.dismiss();
        this.openDialog({ id, fileName });
      }
    );
  }

  private _registerDownloadedIds() {
    this._subSink.sink = this._myPurchaseService.downloadedIds$.subscribe(
      (downloadedIds) => (this.downloadedIds = downloadedIds)
    );
  }

  private _registerDownloading() {
    this._subSink.sink = this._myPurchaseService.downloadingProgress$
      .pipe(
        map((progress) =>
          formatNumber((progress?.currentSize * 100) / progress?.totalSize, 'en-US', '1.0-2')
        ),
        filter((progress) => !!progress),
        distinctUntilChanged()
      )
      .subscribe(async (progress) => {
        const topLoading = await this._loadingCtrl.getTop();
        topLoading && (topLoading.message = `Downloading...${progress}%`);
      });
  }
}
