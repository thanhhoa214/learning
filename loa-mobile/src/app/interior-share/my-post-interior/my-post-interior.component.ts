import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { SubSink } from 'subsink';
import {
  AdminDeleteTopic,
  InteriorShareState,
  LikeInteriorShareListing,
  LoadInteriorShare,
  LoadMoreInteriorShare
} from '../store';
import {
  BookmarkInterior,
  BookmarkInteriorFail,
  BookmarkInteriorSuccessful
} from '../detail-interior-share/store';
import { DeleteDialogComponent } from '@loa-mobile/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  BookmarkInteriorState,
  LoadBookmarkInteriorShare,
  LoadMoreBookmarkInteriorShareImage
} from './store';
import { AlertController, IonSearchbar } from '@ionic/angular';
import {
  LoadBookmarkInteriorShareNoImage,
  LoadMoreBookmarkInteriorShareNoImage
} from './store/bookmark-no-image/bookmark-no-image.action';
import { BookmarkInteriorNoImageState } from './store/bookmark-no-image';
import { BottomBarVisibilityService } from '@loa-shared/services/bottom-bar-visibility.service';
import { Capacitor } from '@capacitor/core';
import { InteriorShareApiService } from '../listing/interior-share.service';
import { ShareTypes } from '@loa-shared/models';
import { urlify } from '@loa-shared/utils';
@Component({
  selector: 'loa-mobile-my-post-interior',
  templateUrl: './my-post-interior.component.html',
  styleUrls: ['./my-post-interior.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPostInteriorComponent implements OnInit {
  selectedIndex = 0;
  searchQuery = '';
  pageCount = 0;
  pageCountBookmark = 0;
  pageCountBookmarkNoImage = 0;
  itemsPerPage = 10;
  itemsPerPageBookmark = 4;
  itemsPerPageBookmarkNoImage = 4;
  selectedOrderBy = '-id';
  public pageInfo;
  public pageInfoBookmark;
  public pageInfoBookmarkNoImage;
  public dataSource = [];
  public tempDataSource = [];
  public dataSourceBookmark = [];
  public tempDataSourceBookmark = [];
  public dataSourceBookmarkNoImage = [];
  public tempDataSourceBookmarkNoImage = [];
  public dataBookmarkLike;
  public subsink = new SubSink();
  public dataUser;
  isShowComment = [];
  public sum = 0;
  throttle = 50;
  scrollDistance = 1;
  public checkLoad = false;
  public countPage = 1;
  public countPageBookmark = 1;
  public countPageBookmarkNoImage = 1;
  public checkLoadMore = false;
  public hideLoadMore = false;
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    private _actions: Actions,
    public location: Location,
    private dialog: MatDialog,
    public alertController: AlertController,
    private _bottomBarVisibility: BottomBarVisibilityService,
    private _interiorShareService: InteriorShareApiService
  ) {
    this.dataUser = this._loginService.snapshot?.userNode;
    this._bottomBarVisibility.hide();
  }

  ngOnInit(): void {
    console.log('Init>>>>>>');
  }

  ionViewWillEnter() {
    this._bottomBarVisibility.hide();
    this.loadDataInteriorShare(this.searchQuery, this.selectedOrderBy);
    this.loadDataBookmarkInteriorShare(this.selectedOrderBy, this.countPageBookmark);
    this.loadDataBookmarkInteriorShareNoImage(this.selectedOrderBy);
    this._registerSearching();
  }

  loadDataInteriorShare(search, orderBy) {
    this.tempDataSource = this.dataSource;
    this._store.dispatch(
      new LoadInteriorShare({
        first: this.itemsPerPage,
        searchBy: search,
        orderBy: orderBy,
        level: 0,
        userId: this.dataUser.id
      })
    );
    this.subsink.sink = this._store
      .select(InteriorShareState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.pageCount = nodeConnection.totalCount;
      this.sum += edges.length;
      // this.addItems(edges, this.tempDataSource);
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

  loadDataBookmarkInteriorShareNoImage(orderBy) {
    this.tempDataSourceBookmarkNoImage = this.dataSourceBookmarkNoImage;
    this._store.dispatch(
      new LoadBookmarkInteriorShareNoImage({
        first: this.itemsPerPageBookmarkNoImage,
        orderBy: orderBy,
        userId: this.dataUser.id,
        hasImages: false
      })
    );
    this.subsink.sink = this._store
      .select(BookmarkInteriorNoImageState.getNodeConnection)
      .subscribe(this._fillDataSourceBookmarkNoImage.bind(this));
  }

  private _fillDataSourceBookmarkNoImage(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfoBookmarkNoImage = nodeConnection.pageInfo;
      this.pageCountBookmarkNoImage = nodeConnection.totalCount;
      this.dataSourceBookmarkNoImage = edges;
    }
    this._cdRef.detectChanges();
  }

  loadDataBookmarkInteriorShare(orderBy, countPage) {
    this.tempDataSourceBookmark = this.dataSourceBookmark;
    this._store.dispatch(
      new LoadBookmarkInteriorShare({
        first: this.itemsPerPageBookmark * countPage,
        orderBy: orderBy,
        userId: this.dataUser.id,
        hasImages: true
      })
    );
    this.subsink.sink = this._store
      .select(BookmarkInteriorState.getNodeConnection)
      .subscribe(this._fillDataSourceBookmark.bind(this));
  }

  private _fillDataSourceBookmark(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfoBookmark = nodeConnection.pageInfo;
      this.pageCountBookmark = nodeConnection.totalCount;
      this.dataSourceBookmark = edges;
    }
    this._cdRef.detectChanges();
  }

  setValueForComment(total) {
    if (total > 0) {
      this.isShowComment = [];
      for (let i = 0; i < total; i++) {
        this.isShowComment.push(true);
      }
    }
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

  tabChanged(ev) {
    if (ev.index === 0) {
      this.selectedIndex = 0;
    } else {
      console.log(ev.index);
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah' + blah);
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  removeInteriorShareInArray(index, id) {
    const temp = this.dataBookmarkLike.filter((item) => item.node.id != id);
    this.dataBookmarkLike = temp;
    this._cdRef.detectChanges();
  }

  onScrollDown(event) {
    this.tempDataSource = this.dataSource;
    this.checkLoad = false;
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
            level: 0,
            userId: this.dataUser.id
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }

  loadMoreBookmark() {
    this.tempDataSourceBookmark = this.dataSourceBookmark;
    this.checkLoad = false;
    if (this.pageInfoBookmark.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkInteriorShareImage({
          first: this.itemsPerPageBookmark,
          after: this.pageInfoBookmark.endCursor,
          orderBy: this.selectedOrderBy,
          userId: this.dataUser.id,
          hasImages: true
        })
      );
    }
  }

  loadMoreBookmarkNoImage() {
    this.tempDataSourceBookmarkNoImage = this.dataSourceBookmarkNoImage;
    this.checkLoad = false;
    if (this.pageInfoBookmarkNoImage.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkInteriorShareNoImage({
          first: this.itemsPerPageBookmarkNoImage,
          after: this.pageInfoBookmarkNoImage.endCursor,
          orderBy: this.selectedOrderBy,
          userId: this.dataUser.id,
          hasImages: false
        })
      );
    }
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
        level: 0,
        userId: this.dataUser.id,
        after: this.pageInfoBookmarkNoImage.endCursor
      })
    );
    // this.loadDataInteriorShareBookmarkLike(this.searchQuery, this.selectedOrderBy)
  }

  bookmark(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      // this._store.dispatch(new DeleteMyBookmark({id}))
      this._store.dispatch(new BookmarkInterior({ id }));
      // Bookmark Fail
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkInteriorFail))
        .subscribe((translation) => {
          if (translation) {
            this.subsink.unsubscribe();
          }
        });
      // Bookmark Successfully
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkInteriorSuccessful))
        .subscribe((translation) => {
          if (translation) {
            this.subsink.unsubscribe();
            this.dataSourceBookmark = [];
            this.tempDataSourceBookmark = [];
            this.loadDataBookmarkInteriorShare(this.selectedOrderBy, this.countPageBookmark);
          }
        });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  bookmarkNoImage(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      // this._store.dispatch(new DeletetMyBookmarkNoImage({id}))
      this._store.dispatch(new BookmarkInterior({ id }));
      // Bookmark Fail
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkInteriorFail))
        .subscribe((translation) => {
          if (translation) {
            this.subsink.unsubscribe();
          }
        });
      // Bookmark Successfully
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkInteriorSuccessful))
        .subscribe((translation) => {
          if (translation) {
            this.subsink.unsubscribe();
            this.dataSourceBookmarkNoImage = [];
            this.tempDataSourceBookmarkNoImage = [];
            this.loadDataBookmarkInteriorShareNoImage(this.selectedOrderBy);
          }
        });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
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

  changeBookmark(value) {
    this.selectedIndex = value;
  }

  public setUrlInteriorShare(content) {
    if (content.length > 80) {
      const subStr = content.substring(0, 80) + '...';
      return urlify(subStr);
    } else {
      return urlify(content);
    }
  }

  private _registerSearching() {
    this.subsink.sink = this.searchbar.ionChange.subscribe((event: CustomEvent) => {
      this.searchQuery = event.detail.value;
      this.searchPost();
    });
  }

  ionViewWillLeave(): void {
    this._bottomBarVisibility.show();
  }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
