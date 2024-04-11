import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, IonContent } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { LifeStyleService } from '@loa-mobile/life-style/life-style.service';
import { LifeStyleStateModel } from '@loa-mobile/life-style/store';
import { RinIonTextareaComponent } from '@loa-shared/components/rin-ion-textarea/rin-ion-textarea.component';
import { SubSinkable } from '@loa-shared/models';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';

const { Keyboard, Device } = Plugins;

interface ReplyInfo {
  name: string;
  questionId?: string;
}
@Component({
  selector: 'loa-mobile-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent extends SubSinkable implements OnChanges, OnDestroy {
  @Input() hide = false;
  @Input() id: LifeStyleStateModel['selectedNode']['id'];
  @Input() parentElement: IonContent;
  @Input() questionAnswer: LifeStyleStateModel['selectedNode']['comments'];
  @ViewChild(RinIonTextareaComponent) ionTextarea: RinIonTextareaComponent;

  me: LoginUserNode;
  replyInfo: ReplyInfo;

  constructor(
    private _detailService: LifeStyleService,
    private _loginService: LoginService,
    private _translate: TranslateService,
    private _notify: NotificationService,
    private _alertCtr: AlertController
  ) {
    super();
  }

  clickReply(replyInfo: ReplyInfo) {
    this.replyInfo = replyInfo;
    this.ionTextarea.setFocus();
  }

  async comment(event: Event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const question = this.ionTextarea.value;
    if (!question) return;

    const htmlQuestion = question.replace(/\n/gi, '</br>');
    if (this.replyInfo?.questionId) {
      this._detailService.reply({
        content: htmlQuestion,
        parent: this.replyInfo.questionId
      });
    } else {
      this._detailService.comment({ content: htmlQuestion, parent: this.id });
    }
    this.ionTextarea.reset();
    this.resetSelectedQuestion();
    const deviceInfo = await Device.getInfo();
    if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') Keyboard.hide();
  }

  async deleteComment(event: Event, id: string) {
    event.stopImmediatePropagation();
    event.preventDefault();
    const promises = [
      this._translate.get('DESIGN.DETAIL.COMMENT.comment').toPromise(),
      this._translate.get('CORE.DELETE_CONFIRMATION').toPromise()
    ];
    const [commentTranslation, confirmationTranslation] = await Promise.all(promises);

    const deleteApproveCallback = () => {
      const user = this._loginService.snapshot?.userNode;
      if (user) {
        this._detailService.deleteComment({ id: [id] });
      } else {
        this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
          this._notify.openSnackBar(data, 'error', true);
        });
      }
    };

    const alert = await this._alertCtr.create({
      header: confirmationTranslation.header.replace('{{name}}', commentTranslation),
      message: confirmationTranslation.message.replace(
        '{{name}}',
        commentTranslation.toLowerCase()
      ),
      buttons: [
        {
          text: confirmationTranslation.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: confirmationTranslation.delete,
          handler: deleteApproveCallback
        }
      ]
    });

    await alert.present();
  }

  loadMoreComments() {
    this._detailService.loadMoreComment({
      id: this.id,
      before: this.questionAnswer.pageInfo.startCursor
    });
  }

  loadMoreReply(questionId: string) {
    this._detailService.loadMoreReply({
      id: questionId,
      before: this.questionAnswer.pageInfo.startCursor
    });
  }

  ngOnChanges(): void {
    this.me = this._loginService.snapshot?.userNode;
    this._registerCommentOrReplyCompleted();
  }

  resetSelectedQuestion() {
    this.replyInfo = null;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.parentElement.scrollToBottom();
    }, 1000);
  }

  private _registerCommentOrReplyCompleted(): void {
    this._subSink.sink = merge(
      this._detailService.onCommentCompleted(),
      this._detailService.onReplyCompleted()
    ).subscribe(() => {
      this.scrollToBottom();
    });
  }
}
