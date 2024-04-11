import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';
import {
  BookmarkInteriorDetail,
  InteriorShareState,
  LikeInteriorShareDetail,
  LoadInteriorShareByID
} from '../store';
import { InteriorShareApiService } from '../listing/interior-share.service';
import { Capacitor } from '@capacitor/core';
import { DeleteDialogComponent } from '@loa-shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminDeleteTopicDetail, AdminDeleteTopicDetailSuccessful } from './store';
import { ShareTypes } from '@loa-shared/models';
import { urlify } from '@loa-shared/utils';
@Component({
  selector: 'loa-mobile-detail-interior-share',
  templateUrl: './detail-interior-share.component.html',
  styleUrls: ['./detail-interior-share.component.scss']
})
export class DetailInteriorShareComponent {
  public dataBookmarkLike;
  public dataComment;
  public dataSource;
  public dataUser;
  public interiorShareID;
  isShowComment = true;
  public itemsPerPage = 4;
  public itemsPerPageChild = 1;
  public pageCount;
  public pageInfo;
  public selectedOrderBy = '-id';
  public selectedOrderByChild = '-id';
  public subsink = new SubSink();

  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _actions: Actions,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    public location: Location,
    private _interiorShareService: InteriorShareApiService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataUser = this._loginService.snapshot?.userNode;
  }

  Like(ev: Event, id) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._store.dispatch(new LikeInteriorShareDetail({ id }));
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
      this._store.dispatch(new BookmarkInteriorDetail({ id }));
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  deleteInteriorShare(ev: Event, id) {
    console.log(ev + ' ' + id);
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
        this._store.dispatch(new AdminDeleteTopicDetail(param));
        // Delete customer Fail
        // this.subsink.sink = this._actions
        // .pipe(
        // ofActionSuccessful(AdminDeleteTopicDetailFailed))
        // .subscribe((translation) => {
        //   if(translation){
        //     this.subsink.unsubscribe();
        //   }
        // });
        // Delete customer Successfully
        this.subsink.sink = this._actions
          .pipe(ofActionSuccessful(AdminDeleteTopicDetailSuccessful))
          .subscribe((translation) => {
            if (translation) {
              console.log(123123123);
              this.router.navigate(['/interior-share']);
            }
          });
      }
    });
  }

  ionViewWillEnter() {
    this.interiorShareID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDataInteriorShare(this.interiorShareID);
  }

  loadDataInteriorShare(id) {
    this._store.dispatch(
      new LoadInteriorShareByID({
        id: id,
        last: this.itemsPerPage,
        lastChild: this.itemsPerPageChild
      })
    );
    this.subsink.sink = this._store
      .select(InteriorShareState.getSelectedNode)
      .subscribe(this._fillDataSource.bind(this));
  }

  // ionViewWillLeave(): void {
  //   this._bottomBarVisibility.show();
  // }
  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
    this.interiorShareID = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.loadDataInteriorShare(this.interiorShareID)
    // this.loadDataBookmarkLikeInterior(this.interiorShareID)
  }

  public setUrlInteriorShare(content) {
    return urlify(content);
  }

  async share(ev: Event, type: ShareTypes) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    // const info = await Device.getInfo();
    const platform = Capacitor.getPlatform();
    if (platform === 'android' || platform === 'ios') {
      this._interiorShareService.share(this.dataSource, type);
      return;
    }
    this._notify.openSnackBar('Web Share not supported', 'error');
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      if (nodeConnection.id == this.interiorShareID) {
        this.dataComment = nodeConnection.comments.edges;
        this.pageInfo = nodeConnection.comments.pageInfo;
        this.pageCount = nodeConnection.comments.totalCount;
        this.dataSource = nodeConnection;
      }
    }
    this._cdRef.detectChanges();
  }
}
