import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import {
  DeleteReviewConstructor,
  LoadMoreReviewConstructor,
  LoadReviewConstructor,
  ReviewState,
} from '../write-review/store';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss'],
})
export class MyReviewComponent {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  _subSink = new SubSink();
  itemPerpage = 10;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar = 4;
  dataSource;
  pageInfo;
  checkLoadMore = false;
  hideLoadMore = false;
  checkDelete = false;
  user;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    public alertController: AlertController,
    private translate: TranslateService,
    private _loginService: LoginService
  ) {}

  ionViewWillEnter() {
    this.user = this._loginService.snapshot?.userNode;
    this.loadDataReviewAll();
  }

  loadDataReviewAll() {
    this._store.dispatch(
      new LoadReviewConstructor({ first: 10, reviewer: this.user?.id })
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
      if (
        parseInt(nodeConnection.pageInfo.endCursor) + 1 ==
          nodeConnection.totalCount &&
        this.checkLoadMore
      ) {
        this.hideLoadMore = true;
      } else {
        this.hideLoadMore = false;
      }
      if (this.checkDelete) {
        this.checkDelete = false;
        this.checkLoadMore = true;
        this._store.dispatch(
          new LoadReviewConstructor({
            first: parseInt(this.pageInfo.endCursor) + 1,
          })
        );
      }
    }
    this._cdRef.detectChanges();
  }

  loadMoreData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.pageInfo.hasNextPage) {
        this.checkLoadMore = true;
        this._store.dispatch(
          new LoadMoreReviewConstructor({
            first: 10,
            after: this.pageInfo.endCursor,
            reviewer: this.user?.id,
          })
        );
      } else {
        this.hideLoadMore = true;
      }
    }, 500);
  }

  async deleteMyReview(id) {
    const temp = {
      message: '',
      cancel: '',
      delete: '',
    };
    this.translate
      .get('CONSTRUCTION_REVIEW.MY_REVIEW.message_delete')
      .subscribe((result: string) => {
        temp.message = result;
      });
    this.translate
      .get('CORE.DELETE_CONFIRMATION.cancel')
      .subscribe((result: string) => {
        temp.cancel = result;
      });
    this.translate
      .get('CORE.DELETE_CONFIRMATION.delete')
      .subscribe((result: string) => {
        temp.delete = result;
      });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: temp.message,
      buttons: [
        {
          text: temp.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah' + blah);
          },
        },
        {
          text: temp.delete,
          handler: () => {
            const param = {
              id: [id],
            };
            this.checkDelete = true;
            this._store.dispatch(new DeleteReviewConstructor(param));
          },
        },
      ],
    });

    await alert.present();
  }
}
