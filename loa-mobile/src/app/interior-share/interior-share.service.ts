import {
  DeleteCommentInteriorSuccessful,
  ReplyInteriorShareDetailSuccessful
} from './store/interior-share.action';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import {
  LoadInteriorShareByID,
  InteriorShareState,
  LikeInteriorShareDetail,
  BookmarkInteriorDetail,
  CommentInteriorShareDetail,
  DeleteCommentInterior,
  ReplyInteriorShareDetail,
  LoadMoreCommentInteriorShare,
  LoadMoreReplyInteriorShare,
  InteriorShareStateModel,
  CommentInteriorShareDetailSuccessful
} from './store';
import { SocialShareService } from '@loa-shared/services/social-share.service';
import { MyPurchaseDesignService } from '@loa-mobile/my-interior-design/my-purchased-designs/my-purchase-design.service';

@Injectable({ providedIn: 'root' })
export class InteriorShareService {
  shareDetail$: Observable<InteriorShareStateModel['selectedNode']>;

  constructor(
    private _store: Store,
    private _actions: Actions,
    private _socialShare: SocialShareService,
    private _purchasedDesignService: MyPurchaseDesignService
  ) {
    this.shareDetail$ = this._store.select(InteriorShareState.getSelectedNode);
  }

  bookmark(variables?: BookmarkInteriorDetail['payload']) {
    this._store.dispatch(new BookmarkInteriorDetail(variables));
  }

  comment(variable: CommentInteriorShareDetail['payload']) {
    this._store.dispatch(new CommentInteriorShareDetail(variable));
  }

  deleteComment(variable: DeleteCommentInterior['payload']) {
    this._store.dispatch(new DeleteCommentInterior(variable));
  }

  like(variables?: LikeInteriorShareDetail['payload']) {
    this._store.dispatch(new LikeInteriorShareDetail(variables));
  }

  loadDetail(queryVariables?: LoadInteriorShareByID['payload']) {
    this._store.dispatch(new LoadInteriorShareByID(queryVariables));
  }

  loadMoreComment(queryVariables?: LoadMoreCommentInteriorShare['payload']) {
    this._store.dispatch(new LoadMoreCommentInteriorShare(queryVariables));
  }

  loadMoreReply(queryVariables?: LoadMoreReplyInteriorShare['payload']) {
    this._store.dispatch(new LoadMoreReplyInteriorShare(queryVariables));
  }

  onCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(CommentInteriorShareDetailSuccessful));
  }

  onDeleteCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(DeleteCommentInteriorSuccessful));
  }

  onReplyCompleted() {
    return this._actions.pipe(ofActionCompleted(ReplyInteriorShareDetailSuccessful));
  }

  reply(variable: ReplyInteriorShareDetail['payload']) {
    this._store.dispatch(new ReplyInteriorShareDetail(variable));
  }

  get snapshot() {
    return this._store.selectSnapshot<InteriorShareStateModel>(InteriorShareState);
  }
}
