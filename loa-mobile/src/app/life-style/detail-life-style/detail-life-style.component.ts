import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Actions, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import {
  BookmarkLifeStyleDetail,
  LifeStyleState,
  LikeLifeStyleDetail,
  LoadLifeStyleByID,
} from '../store';
import { Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { LifeStyleService } from '../listing-life-style/life-style.service';
import { ShareTypes } from '@loa-shared/models';
@Component({
  selector: 'loa-mobile-detail-life-style',
  templateUrl: './detail-life-style.component.html',
  styleUrls: ['./detail-life-style.component.scss'],
})
export class DetailLifeStyleComponent implements OnInit {
  public subsink = new SubSink();
  public lifeStyleID;
  public dataComment;
  public pageInfo;
  public pageCount;
  public itemsPerPage = 4;
  public selectedOrderBy = '-id';
  public itemsPerPageChild = 1;
  public selectedOrderByChild = '-id';
  public dataSource;
  public dataBookmarkLike;
  isShowComment = true;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _actions: Actions,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    public location: Location,
    private _lifeStyleShareService: LifeStyleService
  ) {}

  ngOnInit(): void {
    this.lifeStyleID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDataArticle(this.lifeStyleID);
  }

  loadDataArticle(id) {
    this._store.dispatch(
      new LoadLifeStyleByID({
        id: id,
        last: this.itemsPerPage,
        lastChild: this.itemsPerPageChild,
      })
    );
    this.subsink.sink = this._store
      .select(LifeStyleState.getSelectedNode)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      if (nodeConnection.id == this.lifeStyleID) {
        this.dataComment = nodeConnection.comments.edges;
        this.pageInfo = nodeConnection.comments.pageInfo;
        this.pageCount = nodeConnection.comments.totalCount;
        this.dataSource = nodeConnection;
      }
    }
    this._cdRef.detectChanges();
  }

  bookmark(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new BookmarkLifeStyleDetail({ id }));
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
      this._store.dispatch(new LikeLifeStyleDetail({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }
  share(ev: Event, type: ShareTypes) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    // const info = await Device.getInfo();
    const platform = Capacitor.getPlatform();
    if (platform === 'android' || platform === 'ios') {
      this._lifeStyleShareService.share(this.dataSource, type);
      return;
    }
    this._notify.openSnackBar('Web Share not supported', 'error');
  }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
