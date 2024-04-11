import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionDetailService } from './detail.service';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@loa-shared/utils';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { NotificationService } from '@loa-shared/services/notification.service';
import { Device } from '@capacitor/core';
import { SubSink } from 'subsink';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { GetConstructionQuery } from './services';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import {
  LoadMoreReviewConstructor,
  LoadReviewConstructor,
  ReviewState,
} from '@loa-mobile/menu/my-construction-review/write-review/store';
import { Store } from '@ngxs/store';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements ViewWillEnter, OnDestroy {
  construction: GetConstructionQuery;
  user: LoginUserNode;

  private _subSink = new SubSink();
  private _id: string;
  itemPerpage = 10;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar = 4;
  dataSource;
  pageInfo;
  checkDelete = false;
  checkDisableReview = false;
  constructor(
    public location: Location,
    public _detailService: ConstructionDetailService,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
    private _store: Store,
    private _cdRef: ChangeDetectorRef
  ) {}

  ionViewWillEnter(): void {
    window.scroll(0, 0);
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    this._detailService.clear(this._id);
    this._detailService.loadConstructionDetail({ id: this._id });
    this._subSink.sink = this._detailService
      .getConstructionDetail$()
      .subscribe((construction) => {
        this.construction = construction;
        if (construction)
          this._titleService.setTitle(
            `${construction.construction.constructorCompany.companyName} | Interior Design`
          );
      });
    this.user = this._loginService.snapshot?.userNode;
    this.loadDataReviewAll();
    if (this.user.id == this._id) {
      this.checkDisableReview = true;
    } else {
      this.checkDisableReview = false;
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

  get defaultImage(): string {
    return DEFAULT_IMAGE_PLACEHOLDER;
  }

  async share() {
    const info = await Device.getInfo();
    if (info.platform === 'android' || info.platform === 'ios') {
      this._detailService.share(this.construction.construction);
      return;
    }
    this._notify.openSnackBar('Web Share not supported', 'error');
  }

  openRequestConstructionDialog() {
    // if (this.user) {
    //   this._dialog.open(RequestConstructionComponent, {
    //     data: { id: this.construction.id },
    //   });
    // } else {
    //   this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
    //     this._notify.openSnackBar(data, 'error', true);
    //   });
    // }
  }
  public scrollToBottom(elemnt): void {
    elemnt.scrollTop = elemnt.scrollHeight;
  }
  writeReviewConstructor(id) {
    this._router.navigate([
      '/menu/my-construction-review/write-review/create/' + id,
    ]);
  }

  loadDataReviewAll() {
    this._store.dispatch(
      new LoadReviewConstructor({ first: 4, construction: this._id })
    );
    this._subSink.sink = this._store
      .select(ReviewState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.dataSource = edges;
      if (this.checkDelete) {
        this.checkDelete = false;
        this._store.dispatch(
          new LoadReviewConstructor({
            first: parseInt(this.pageInfo.endCursor) + 1,
            construction: this._id,
          })
        );
      }
    }
    this._cdRef.detectChanges();
  }

  loadMoreData() {
    if (this.pageInfo.hasNextPage) {
      this._store.dispatch(
        new LoadMoreReviewConstructor({
          first: 10,
          after: this.pageInfo.endCursor,
          construction: this._id,
        })
      );
    }
  }
}
