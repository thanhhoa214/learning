import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import {
  LoadLifeStyleByID,
  LifeStyleState,
  LikeLifeStyleDetail,
  BookmarkLifeStyleDetail,
  CommentLifeStyleDetail,
  ReplyLifeStyleDetail,
  LoadMoreReply,
  LoadMoreComment,
  DeleteComment,
  DeleteReply,
  LifeStyleStateModel,
  CommentLifeStyleDetailSuccessful
} from './store';

@Injectable({ providedIn: 'root' })
export class LifeStyleService {
  lifeStyleDetail$: Observable<LifeStyleStateModel['selectedNode']>;

  constructor(private _store: Store, private _actions: Actions) {
    this.lifeStyleDetail$ = this._store.select(LifeStyleState.getSelectedNode);
  }

  bookmark(variables?: BookmarkLifeStyleDetail['payload']) {
    this._store.dispatch(new BookmarkLifeStyleDetail(variables));
  }

  comment(variable: CommentLifeStyleDetail['payload']) {
    this._store.dispatch(new CommentLifeStyleDetail(variable));
  }

  deleteComment(variable: DeleteComment['payload']) {
    this._store.dispatch(new DeleteComment(variable));
  }

  deleteReply(variable: DeleteReply['payload']) {
    this._store.dispatch(new DeleteReply(variable));
  }

  like(variables?: LikeLifeStyleDetail['payload']) {
    this._store.dispatch(new LikeLifeStyleDetail(variables));
  }

  loadDetail(queryVariables?: LoadLifeStyleByID['payload']) {
    this._store.dispatch(new LoadLifeStyleByID(queryVariables));
  }

  loadMoreComment(queryVariables?: LoadMoreComment['payload']) {
    this._store.dispatch(new LoadMoreComment(queryVariables));
  }

  loadMoreReply(queryVariables?: LoadMoreReply['payload']) {
    this._store.dispatch(new LoadMoreReply(queryVariables));
  }

  onCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(CommentLifeStyleDetailSuccessful));
  }

  onDeleteCommentCompleted() {
    return this._actions.pipe(ofActionCompleted(DeleteComment));
  }

  onReplyCompleted() {
    return this._actions.pipe(ofActionCompleted(ReplyLifeStyleDetail));
  }

  reply(variable: ReplyLifeStyleDetail['payload']) {
    this._store.dispatch(new ReplyLifeStyleDetail(variable));
  }

  get snapshot() {
    return this._store.selectSnapshot<LifeStyleStateModel>(LifeStyleState);
  }
}
