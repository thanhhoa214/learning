import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginState } from '@loa-mobile/auth/login/store';
import {
  BookmarkDesignMyBookmark,
  BookmarkDesignMyBookmarkSuccess,
  BookmarkState,
  LoadBookmark,
  LoadMoreBookmarkDesign,
} from './store';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { ViewWillEnter } from '@ionic/angular';
import {
  BookmarkInteriorState,
  LoadBookmarkInteriorShare,
  LoadMoreBookmarkInteriorShareImage,
} from '@loa-mobile/interior-share/my-post-interior/store';
import {
  LoadBookmarkInteriorShareNoImage,
  LoadMoreBookmarkInteriorShareNoImage,
} from '@loa-mobile/interior-share/my-post-interior/store/bookmark-no-image/bookmark-no-image.action';
import { BookmarkInteriorNoImageState } from '@loa-mobile/interior-share/my-post-interior/store/bookmark-no-image';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import {
  BookmarkInterior,
  BookmarkInteriorFail,
  BookmarkInteriorSuccessful,
} from '@loa-mobile/interior-share/detail-interior-share/store';
import {
  BookmarkLifeStyleMyBookmark,
  BookmarkLifeStyleMyBookmarkSuccess,
  BookmarkLifeStyleState,
  LoadBookmarkLifeStyle,
  LoadMoreBookmarkLifeStyle,
} from './store/life-style';
@Component({
  selector: 'loa-mobile-my-bookmark',
  templateUrl: './my-bookmark.component.html',
  styleUrls: ['./my-bookmark.component.scss'],
})
export class MyBookmarkComponent implements ViewWillEnter, OnDestroy {
  pageIndex = 0;
  pageCount = 0;
  itemsPerPage = 3;
  public subsink = new SubSink();
  public pageInfo;
  public filterUserId = '';
  array = [];
  sum = 0;
  throttle = 50;
  scrollDistance = 1;
  public pageInfoBookmark;
  public pageCountBookmark = 0;
  public dataSourceBookmark;
  public itemsPerPageBookmarkImage = 4;
  public pageInfoBookmarkNoImage;
  public pageCountBookmarkNoImage = 0;
  public dataSourceBookmarkNoImage;
  public itemsPerPageBookmarkLifeStyle = 4;
  public pageInfoBookmarkLifeStyle;
  public pageCountBookmarkLifeStyle = 0;
  public dataSourceBookmarkLifeStyle;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private router: Router,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    private _actions: Actions
  ) {}

  ionViewWillEnter(): void {
    const userNode = this._store.selectSnapshot(LoginState.getUserNode);
    if (userNode) {
      this.filterUserId = userNode.id;
      this.loadDataBookmark(userNode.id);
      this.loadDataBookmarkInteriorShareImage('-id');
      this.loadDataBookmarkInteriorShareNoImage('-id');
      this.loadDataBookmarkLifeStyle();
    }
  }

  loadDataBookmark(userId) {
    this._store.dispatch(
      new LoadBookmark({
        first: this.itemsPerPage,
        userId,
        orderBy: '-id',
      })
    );
    this.subsink.sink = this._store
      .select(BookmarkState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.pageCount = nodeConnection.totalCount;
      this.array = edges;
      console.log(this.pageInfo);
    }
    this._cdRef.detectChanges();
  }

  loadDataBookmarkInteriorShareImage(orderBy) {
    this._store.dispatch(
      new LoadBookmarkInteriorShare({
        first: this.itemsPerPageBookmarkImage,
        orderBy: orderBy,
        userId: this.filterUserId,
        hasImages: true,
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

  loadDataBookmarkInteriorShareNoImage(orderBy) {
    this._store.dispatch(
      new LoadBookmarkInteriorShareNoImage({
        first: this.itemsPerPage,
        orderBy: orderBy,
        userId: this.filterUserId,
        hasImages: false,
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

  loadDataBookmarkLifeStyle() {
    this._store.dispatch(
      new LoadBookmarkLifeStyle({
        first: this.itemsPerPageBookmarkLifeStyle,
        userId: this.filterUserId,
      })
    );
    this.subsink.sink = this._store
      .select(BookmarkLifeStyleState.getNodeConnection)
      .subscribe(this._fillDataSourceBookmarkLifeStyle.bind(this));
  }

  private _fillDataSourceBookmarkLifeStyle(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfoBookmarkLifeStyle = nodeConnection.pageInfo;
      this.pageCountBookmarkLifeStyle = nodeConnection.totalCount;
      this.dataSourceBookmarkLifeStyle = edges;
    }
    this._cdRef.detectChanges();
  }

  onScrollDown() {
    console.log('scrolled down!!');
    if (this.pageInfo.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkDesign({
          userId: this.filterUserId,
          first: this.itemsPerPage,
          after: this.pageInfo.endCursor,
        })
      );
    }
  }

  loadMoreBookmarkDesign() {
    if (this.pageInfo.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkDesign({
          userId: this.filterUserId,
          first: this.itemsPerPage,
          after: this.pageInfo.endCursor,
        })
      );
    }
  }

  loadMoreBookmark() {
    if (this.pageInfoBookmark.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkInteriorShareImage({
          first: this.itemsPerPageBookmarkImage,
          after: this.pageInfoBookmark.endCursor,
          orderBy: '-id',
          userId: this.filterUserId,
          hasImages: true,
        })
      );
    }
  }

  loadMoreBookmarkNoImage() {
    if (this.pageInfoBookmarkNoImage.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkInteriorShareNoImage({
          first: this.itemsPerPage,
          after: this.pageInfoBookmarkNoImage.endCursor,
          orderBy: '-id',
          userId: this.filterUserId,
          hasImages: false,
        })
      );
    }
  }
  loadMoreBookmarkLifeStyle() {
    if (this.pageInfoBookmarkLifeStyle.hasNextPage) {
      this._store.dispatch(
        new LoadMoreBookmarkLifeStyle({
          first: this.itemsPerPageBookmarkLifeStyle,
          after: this.pageInfoBookmarkLifeStyle.endCursor,
          userId: this.filterUserId,
        })
      );
    }
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
            // this.subsink.unsubscribe();
            this.dataSourceBookmark = [];
            this.loadDataBookmarkInteriorShareImage('-id');
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
            // this.subsink.unsubscribe();
            this.dataSourceBookmarkNoImage = [];
            this.loadDataBookmarkInteriorShareNoImage('-id');
          }
        });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }
  bookmarkLifeStyle(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new BookmarkLifeStyleMyBookmark({ id }));
      // Bookmark Successfully
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkLifeStyleMyBookmarkSuccess))
        .subscribe((translation) => {
          if (translation) {
            // this.subsink.unsubscribe();
            this.dataSourceBookmarkLifeStyle = [];
            this.loadDataBookmarkLifeStyle();
          }
        });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  bookmarkdesign(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new BookmarkDesignMyBookmark(id));
      // Bookmark Successfully
      this.subsink.sink = this._actions
        .pipe(ofActionSuccessful(BookmarkDesignMyBookmarkSuccess))
        .subscribe((translation) => {
          if (translation) {
            // this.subsink.unsubscribe();
            this.dataSourceBookmark = [];
            this.loadDataBookmark(this.filterUserId);
          }
        });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  detailPage(id) {
    this.router.navigateByUrl('/design/' + id);
  }

  tabChanged(ev) {
    if (ev.index === 0) {
      console.log('Design');
    } else {
      console.log('Story');
    }
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
