import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';
import { DeleteDialogComponent } from '@loa-mobile/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  AdminDeleteTopic,
  BookmarkInteriorListing,
  InteriorShareState,
  LikeInteriorShareListing,
  LoadInteriorShare,
  LoadMoreInteriorShare
} from '../store';
import { BottomBarVisibilityService } from '@loa-shared/services/bottom-bar-visibility.service';
import { Capacitor } from '@capacitor/core';
import { InteriorShareApiService } from './interior-share.service';
import { IonSearchbar } from '@ionic/angular';
import { ShareTypes } from '@loa-shared/models';
import { urlify } from '@loa-shared/utils';
@Component({
  selector: 'loa-mobile-interior-share',
  templateUrl: './interior-share.component.html',
  styleUrls: ['./interior-share.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteriorShareComponent implements OnInit {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;

  public _subSink = new SubSink();
  public checkLoadMore = false;
  public countPage = 1;
  public dataBookmarkLike;
  public dataSource = [];
  public dataUser;
  public hideLoadMore = false;
  isShowComment = [];
  itemsPerPage = 10;
  pageCount = 0;
  public pageInfo;
  searchQuery = '';
  selectedOrderBy = '-id';
  public tempDataSource = [];

  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    public location: Location,
    private dialog: MatDialog,
    private _bottomBarVisibility: BottomBarVisibilityService,
    private _interiorShareService: InteriorShareApiService
  ) {
    this._bottomBarVisibility.hide();
  }

  Like(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new LikeInteriorShareListing({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  bookmark(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new BookmarkInteriorListing({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  deleteInteriorShare(ev: Event, id, index) {
    console.log(index + ev);
    const arrID = [id];
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { idDelete: arrID }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result.idDelete) {
        const param = {
          id: result.idDelete
        };
        this._store.dispatch(new AdminDeleteTopic(param));
      }
    });
  }

  ionViewWillEnter() {
    this._bottomBarVisibility.hide();
    this.dataUser = this._loginService.snapshot?.userNode;
    this.loadDataInteriorShare(this.searchQuery, this.selectedOrderBy);
    // this.loadDataInteriorShareBookmarkLike(this.searchQuery, this.selectedOrderBy)
    this._registerSearching();
  }

  ionViewWillLeave(): void {
    this._bottomBarVisibility.show();
  }

  loadDataInteriorShare(search, orderBy) {
    this.tempDataSource = this.dataSource;
    this._store.dispatch(
      new LoadInteriorShare({
        first: this.itemsPerPage,
        searchBy: search,
        orderBy: orderBy,
        level: 0
      })
    );
    this._subSink.sink = this._store
      .select(InteriorShareState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

  ngOnInit(): void {
    // this.dataUser = this._loginService.snapshot?.userNode;
    // this.loadDataInteriorShare(this.searchQuery, this.selectedOrderBy)
    // this.loadDataInteriorShareBookmarkLike(this.searchQuery, this.selectedOrderBy)
  }

  onScrollDown(event) {
    this.tempDataSource = this.dataSource;
    setTimeout(() => {
      event.target.complete();
      if (this.pageInfo.hasNextPage) {
        this.checkLoadMore = true;
        this._store.dispatch(
          new LoadMoreInteriorShare({
            first: this.itemsPerPage,
            after: this.pageInfo.endCursor,
            searchBy: this.searchQuery,
            orderBy: this.selectedOrderBy,
            level: 0
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }

  removeInteriorShareInArray(index, id) {
    const temp = this.dataBookmarkLike.filter((item) => item.node.id != id);
    this.dataBookmarkLike = temp;
    this._cdRef.detectChanges();
  }

  searchPost() {
    this.countPage = 1;
    this.dataSource = [];
    this.tempDataSource = [];
    this._store.dispatch(
      new LoadInteriorShare({
        first: this.itemsPerPage,
        searchBy: this.searchQuery,
        orderBy: this.selectedOrderBy,
        level: 0
      })
    );
  }

  public setUrlInteriorShare(content) {
    if (content.length > 80) {
      const subStr = content.substring(0, 80) + '...';
      return urlify(subStr);
    } else {
      return urlify(content);
    }
  }

  setValueForComment(total) {
    if (total > 0) {
      this.isShowComment = [];
      for (let i = 0; i < total; i++) {
        this.isShowComment.push(true);
      }
    }
  }

  share(ev: Event, item, type: ShareTypes) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    // const info = await Device.getInfo();
    const platform = Capacitor.getPlatform();
    if (platform === 'android' || platform === 'ios') {
      this._interiorShareService.share(item, type);
      return;
    }
    this._notify.openSnackBar('Web Share not supported', 'error');
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
      if (this.dataSource.length > 0) {
        this.setValueForComment(this.dataSource.length);
      }
    }
    this._cdRef.detectChanges();
  }

  private _registerSearching() {
    this._subSink.sink = this.searchbar.ionChange.subscribe((event: CustomEvent) => {
      this.searchQuery = event.detail.value;
      this.searchPost();
    });
  }
}
