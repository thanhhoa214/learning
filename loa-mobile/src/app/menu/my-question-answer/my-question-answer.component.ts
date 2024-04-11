import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginState } from '@loa-mobile/auth/login/store';
import { Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { LoadQuestionAnswer, QuestionAnswerState } from './store';

@Component({
  selector: 'loa-mobile-my-question-answer',
  templateUrl: './my-question-answer.component.html',
  styleUrls: ['./my-question-answer.component.scss'],
})
export class MyQuestionAnswerComponent implements ViewWillEnter {
  public subsink = new SubSink();
  pageIndex = 0;
  pageCount = 0;
  itemsPerPage = 20;
  public pageInfo;
  public filterUserId = '';
  array = [];
  sum = 0;
  throttle = 50;
  scrollDistance = 1;
  constructor(
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    const userNode = this._store.selectSnapshot(LoginState.getUserNode);
    if (userNode) {
      this.filterUserId = userNode.id;
      this.loadDataQuestionAnswer(userNode.id);
    }
  }

  loadDataQuestionAnswer(userId) {
    this._store.dispatch(
      new LoadQuestionAnswer({
        first: this.itemsPerPage,
        orderBy: '-id',
        userId: userId,
        level: 0,
      })
    );
    this.subsink.sink = this._store
      .select(QuestionAnswerState.getNodeConnection)
      .subscribe(this._fillDataSource.bind(this));
  }

  private _fillDataSource(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      const { edges } = nodeConnection;
      this.pageInfo = nodeConnection.pageInfo;
      this.pageCount = nodeConnection.totalCount;
      this.addItems(edges);
      this.sum += edges.length;
      console.log(edges);
    }
    this._cdRef.detectChanges();
  }
  addItems(arr) {
    this.array = [];
    for (let i = 0; i < arr.length; ++i) {
      this.array.push(arr[i]);
    }
  }

  onScrollDown() {
    if (this.sum < this.pageCount * this.itemsPerPage) {
      this._store.dispatch(
        new LoadQuestionAnswer({
          first: this.itemsPerPage,
          after: this.pageInfo.endCursor,
          userId: this.filterUserId,
        })
      );
    }
  }

  detailPage(id) {
    this.router.navigateByUrl('/design/' + id);
  }

  tabChanged(ev) {
    if (ev.index == 0) {
      // this.loadDataQuestionAnswer(this.filterUserId)
      console.log('Q&A design');
    } else {
      console.log('Q&A forum');
    }
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
