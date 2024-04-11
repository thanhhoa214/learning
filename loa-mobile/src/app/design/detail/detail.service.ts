import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Actions,
  ofActionCompleted,
  ofActionDispatched,
  ofActionSuccessful,
  Store
} from '@ngxs/store';
import {
  LoadDesignDetail,
  DesignDetailState,
  LikeDesignDetail,
  BookmarkDesignDetail,
  ClearDesignDetail,
  CommentDesignDetail,
  DeleteCommentDesignDetail,
  RequestDesignDetailSuccessful,
  RequestDesignDetail,
  ReplyDesignDetail,
  LoadMoreComment,
  LoadMoreReply,
  LikeStatic,
  BookmarkStatic,
  DesignDetailStateModel
} from './store';
import {
  GetDesignQuery,
  GetDesignQueryVariables,
  LikeDesignMutationVariables,
  BookmarkDesignMutationVariables,
  RequestDesignMutationVariables,
  ReplyCommentDesignMutationVariables,
  DesignCommentMoreQueryVariables,
  DesignCommentReplyMoreQueryVariables
} from '../shared/services';
import {
  QuestionDesignCreateInput,
  UserDeleteQuestionInput
} from '@loa-shared/models/graphql.model';
import { ShareTypes } from '@loa-shared/models/';
import { SocialShareService } from '@loa-shared/services/social-share.service';
import { Plugins } from '@capacitor/core';
import { MyPurchaseDesignService } from '@loa-mobile/my-interior-design/my-purchased-designs/my-purchase-design.service';
const { Browser } = Plugins;

@Injectable({ providedIn: 'root' })
export class DesignDetailService {
  designDetail$: Observable<GetDesignQuery['design']>;

  constructor(
    private _store: Store,
    private _actions: Actions,
    private _socialShare: SocialShareService,
    private _purchasedDesignService: MyPurchaseDesignService
  ) {
    this.designDetail$ = this._store.select(DesignDetailState.design);
  }

  bookmark(variables?: BookmarkDesignMutationVariables) {
    this._store.dispatch(new BookmarkDesignDetail(variables));
  }

  bookmarkStatic() {
    this._store.dispatch(new BookmarkStatic());
  }

  clear(id: string) {
    const isMatched = this._store.selectSnapshot(DesignDetailState.designId) === id;
    if (!isMatched) this._store.dispatch(new ClearDesignDetail());
  }

  comment(variable: QuestionDesignCreateInput) {
    this._store.dispatch(new CommentDesignDetail({ input: variable }));
  }

  deleteComment(variable: UserDeleteQuestionInput) {
    this._store.dispatch(new DeleteCommentDesignDetail({ input: variable }));
  }

  getDesignDetail(): GetDesignQuery['design'] {
    return this._store.selectSnapshot(DesignDetailState.design);
  }

  like(variables?: LikeDesignMutationVariables) {
    this._store.dispatch(new LikeDesignDetail(variables));
  }

  likeStatic() {
    this._store.dispatch(new LikeStatic());
  }

  loadDesignDetail(queryVariables?: GetDesignQueryVariables) {
    this._store.dispatch(new LoadDesignDetail(queryVariables));
  }

  loadMoreComment(queryVariables?: DesignCommentMoreQueryVariables) {
    this._store.dispatch(new LoadMoreComment(queryVariables));
  }

  loadMoreReply(queryVariables?: DesignCommentReplyMoreQueryVariables) {
    this._store.dispatch(new LoadMoreReply(queryVariables));
  }

  onBookmarkCompleted() {
    return this._actions.pipe(ofActionSuccessful(BookmarkDesignDetail));
  }

  onCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(CommentDesignDetail));
  }

  onDeleteCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(DeleteCommentDesignDetail));
  }

  onLikeCompleted() {
    return this._actions.pipe(ofActionCompleted(LikeDesignDetail));
  }

  onLoadDesignDetail() {
    return this._actions.pipe(ofActionDispatched(LoadDesignDetail));
  }

  onReplyCompleted() {
    return this._actions.pipe(ofActionCompleted(ReplyDesignDetail));
  }

  onRequestSuccessful() {
    return this._actions.pipe(ofActionCompleted(RequestDesignDetailSuccessful));
  }

  openDesign() {
    const prefixUri = this._purchasedDesignService.snapshot.prefixUri;
    const fileName = encodeURI(
      `shareddocuments://${this.snapshot.design.id}-${this.snapshot.design.projectName}`
    );
    Browser.open({ url: `${prefixUri}${fileName}` });
  }

  reply(variable: ReplyCommentDesignMutationVariables['input']) {
    this._store.dispatch(new ReplyDesignDetail({ input: variable }));
  }

  request(input: RequestDesignMutationVariables['input']) {
    this._store.dispatch(new RequestDesignDetail({ input }));
  }

  async share(design: GetDesignQuery['design'], type: ShareTypes) {
    const routingUrl = `/design/${design.id}`;
    return this._socialShare.share(
      {
        link: routingUrl,
        title: design.projectName,
        message: design.projectName
      },
      type
    );
  }

  get snapshot() {
    return this._store.selectSnapshot<DesignDetailStateModel>(DesignDetailState);
  }
}
