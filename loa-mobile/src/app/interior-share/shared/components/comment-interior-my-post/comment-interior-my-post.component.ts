import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { LoginState, LoginUserNode } from '@loa-mobile/auth/login/store';
import { NotificationService } from '@loa-mobile/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Actions, Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import {
  CommentInteriorShareListing,
  DeleteCommentInteriorListing,
  DeleteReplyInteriorListing,
  InteriorShareState,
  LoadMoreCommentInteriorShareListing,
  LoadMoreReplyInteriorShareListing,
  ReplyInteriorShareListing,
} from '@loa-mobile/interior-share/store';
const { Keyboard, Device } = Plugins;
interface ReplyInfo {
  questionId?: string;
  name: string;
}

@Component({
  selector: 'app-comment-interior-my-post',
  templateUrl: './comment-interior-my-post.component.html',
  styleUrls: ['./comment-interior-my-post.component.scss'],
})
export class CommentInteriorMyPostComponent implements OnInit {
  @Input() id: any;
  @Input() parentElement: HTMLDivElement;
  @Input() questionAnswer: any;
  @Input() hide = false;

  @ViewChild(MatInput) commentInputElement: MatInput;

  commentInput: FormControl = new FormControl('');
  me: LoginUserNode;
  replyInfo: ReplyInfo;
  isKeyboardShowing = false;
  public lifeStyleID;
  public questionId;
  public subsink = new SubSink();
  public itemsPerPage = 4;
  public selectedOrderBy = '-id';
  public itemsPerPageChild = 1;
  public selectedOrderByChild = '-id';
  public tempQuestion;
  public dataShow = [];
  public checkLoadMore = false;
  constructor(
    private _loginService: LoginService,
    private _translate: TranslateService,
    private _notify: NotificationService,
    private activatedRoute: ActivatedRoute,
    private _actions: Actions,
    private _store: Store,
    private _cdRef: ChangeDetectorRef,
    public alertController: AlertController
  ) {
    this.lifeStyleID = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this._registerKeyboardEvents();
    this._store.select(LoginState.getUserNode).subscribe((data) => {
      this.me = data;
    });
  }

  ngOnDestroy(): void {
    Device.getInfo().then((deviceInfo) => {
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        Keyboard.removeAllListeners();
      }
    });
  }

  // private _registerKeyboardEvents() {
  //   Device.getInfo().then((deviceInfo) => {
  //     if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
  //       Keyboard.addListener('keyboardWillShow', () => {
  //         this.isKeyboardShowing = true;
  //         setTimeout(() => {
  //           this._scrollToBottom();
  //         }, 500);
  //       });
  //       Keyboard.addListener('keyboardWillHide', () => {
  //         this.isKeyboardShowing = false;
  //         setTimeout(() => {
  //           this._scrollToBottom();
  //         }, 1000);
  //       });
  //     }
  //   });
  // }
  private _registerKeyboardEvents() {
    Device.getInfo().then((deviceInfo) => {
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        const scrollBottomCallback = () => {
          setTimeout(() => {
            this._scrollToBottom();
          }, 500);
        };
        Keyboard.addListener('keyboardWillShow', scrollBottomCallback);
        Keyboard.addListener('keyboardWillHide', scrollBottomCallback);
      }
    });
  }

  async deleteComment(event: Event, id: string) {
    const arrDelete = [id];
    event.stopImmediatePropagation();
    event.preventDefault();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-delete-comment',
      header: 'Confirm!',
      message:
        'Are you sure you want to permanently delete this post from Interior Design?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah ' + blah);
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this._store.dispatch(
              new DeleteCommentInteriorListing({ id: arrDelete })
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCommentReply(event: Event, id: string) {
    const arrDelete = [id];
    event.stopImmediatePropagation();
    event.preventDefault();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-delete-comment',
      header: 'Confirm!',
      message:
        'Are you sure you want to permanently delete this post from Interior Design?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah ' + blah);
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this._store.dispatch(
              new DeleteReplyInteriorListing({ id: arrDelete })
            );
          },
        },
      ],
    });
    await alert.present();
  }
  async comment(event: Event, question: string) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      if (this.replyInfo?.questionId) {
        const params = {
          content: question,
          parent: this.replyInfo?.questionId,
        };
        this.replyCommentForComment(params);
      } else {
        const params = {
          content: question,
          parent: this.id,
        };
        this.replyCommentForInterior(params);
      }
      this.commentInput.reset();
      this.resetSelectedQuestion();
      const deviceInfo = await Device.getInfo();
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios')
        Keyboard.hide();
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }
  clickReply(replyInfo: ReplyInfo) {
    this.replyInfo = replyInfo;
    this.commentInputElement.focus();
  }

  resetSelectedQuestion() {
    this.replyInfo = null;
  }
  loadMoreComments() {
    this._store.dispatch(
      new LoadMoreCommentInteriorShareListing({
        id: this.id,
        before: this.questionAnswer.pageInfo.startCursor,
        last: this.itemsPerPage,
        level: 1,
      })
    );
    this.subsink.sink = this._store
      .select(InteriorShareState.getSelectedNode)
      .subscribe(this._fillDataSourceLoadMore.bind(this));
  }

  private _fillDataSourceLoadMore(nodeConnection: any): void {
    if (!nodeConnection) return;
    if (nodeConnection) {
      if (nodeConnection.id == this.lifeStyleID) {
        if (!this.checkLoadMore) {
          console.log(nodeConnection);
          this.questionAnswer = nodeConnection.comments;
        }
      }
    }
    this._cdRef.detectChanges();
  }

  updateCommentAfterLoadMore(dataNew, dataOld) {
    if (dataOld.edges.length > 0) {
      const temp = [];
      for (let i = 0; i < dataNew.edges.length; i++) {
        temp.push(dataNew.edges[i]);
      }
      for (let i = 0; i < dataOld.edges.length; i++) {
        temp.push(dataOld.edges[i]);
      }
      this.questionAnswer = {
        edges: temp,
        pageInfo: dataNew.pageInfo,
        totalCount: dataNew.totalCount,
      };
      console.log(this.questionAnswer);
      this._cdRef.detectChanges();
    }
  }
  loadMoreReply(questionId: string, pageInfo) {
    this._store.dispatch(
      new LoadMoreReplyInteriorShareListing({
        id: questionId,
        before: pageInfo.startCursor,
        last: this.itemsPerPage,
        level: 2,
      })
    );
  }

  replyCommentForInterior(params) {
    this._store.dispatch(new CommentInteriorShareListing(params));
  }

  replyCommentForComment(params) {
    this._store.dispatch(new ReplyInteriorShareListing(params));
  }

  private _scrollToBottom(): void {
    this.parentElement.scrollTop = this.parentElement.scrollHeight;
  }
}
