import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { LoadContentPage, ContentPageState, ClearContentPage } from './store';
import { GetContentPageQuery, GetContentPageQueryVariables } from './services';

@Injectable({ providedIn: 'root' })
export class ContentPageService {
  constructor(private _store: Store, private _actions: Actions) {}
  loadContentPage(queryVariables?: GetContentPageQueryVariables) {
    this._store.dispatch(new LoadContentPage(queryVariables));
  }
  clear(id: string) {
    const isMatched =
      this._store.selectSnapshot(ContentPageState.contentPageId) === id;
    if (!isMatched) this._store.dispatch(new ClearContentPage());
  }
  getContentPage$(): Observable<GetContentPageQuery['contentPage']> {
    return this._store.select(ContentPageState.contentPage);
  }
  getContentPage(): GetContentPageQuery['contentPage'] {
    return this._store.selectSnapshot(ContentPageState.contentPage);
  }
  onLoadContentPage() {
    return this._actions.pipe(ofActionSuccessful(LoadContentPage));
  }
}
