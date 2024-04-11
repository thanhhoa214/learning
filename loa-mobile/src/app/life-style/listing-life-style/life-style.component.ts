import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Actions, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import {
  DetailLifeStyleState,
  LoadBookmarkLike,
} from '../detail-life-style/store';
import {
  BookmarkLifeStyleListing,
  LifeStyleState,
  LikeLifeStyleListing,
  LoadLifeStyle,
  LoadMoreLifeStyle,
} from '../store';
import { Location } from '@angular/common';
import { filter, take } from 'rxjs/operators';
@Component({
  selector: 'loa-mobile-life-style',
  templateUrl: './life-style.component.html',
  styleUrls: ['./life-style.component.scss'],
})
export class LifeStyleComponent implements OnInit {
  searchQuery = '';
  pageCount = 0;
  itemsPerPage = 10;
  selectedOrderBy = '-id';
  public pageInfo;
  public dataSource = [];
  public tempDataSource = [];
  public dataBookmarkLike;
  public subsink = new SubSink();
  public subsinkBookmark = new SubSink();
  public checkLoadMore = false;
  public hideLoadMore = false;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private _actions: Actions,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    public location: Location
  ) {}

  ngOnInit(): void {
    console.log('Init>>>>');
  }

  ionViewWillEnter() {
    this.loadDataLifeStyle(this.searchQuery, this.selectedOrderBy);
  }

  loadDataLifeStyle(search, orderBy) {
    this.tempDataSource = this.dataSource;
    this._store.dispatch(
      new LoadLifeStyle({
        first: this.itemsPerPage,
        searchBy: search,
        orderBy: orderBy,
        level: 0,
      })
    );
    this.subsink.sink = this._store
      .select(LifeStyleState.getNodeConnection)
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
    }
    this._cdRef.detectChanges();
  }

  loadDataBookmarkLike(search, orderBy) {
    this._store.dispatch(
      new LoadBookmarkLike({ searchBy: search, orderBy: orderBy, level: 0 })
    );
    this.subsinkBookmark.sink = this._store
      .select(DetailLifeStyleState.getNodeConnection)
      .pipe(
        filter((item) => item != undefined),
        take(2)
      )
      .subscribe(this._fillDataSourceBookmarkLike.bind(this));
  }

  private _fillDataSourceBookmarkLike(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.dataBookmarkLike = edges;
      this.subsinkBookmark.unsubscribe();
    }
    this._cdRef.detectChanges();
  }

  bookmark(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new BookmarkLifeStyleListing({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  Like(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new LikeLifeStyleListing({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  onScrollDown(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.pageInfo.hasNextPage) {
        this.checkLoadMore = true;
        this._store.dispatch(
          new LoadMoreLifeStyle({
            first: this.itemsPerPage,
            after: this.pageInfo.endCursor,
            searchBy: this.searchQuery,
            orderBy: this.selectedOrderBy,
            level: 0,
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
    this.subsinkBookmark.unsubscribe();
  }
}
