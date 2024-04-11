import { Injectable } from '@angular/core';
import { LanguageCode } from '@loa-shared/models';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { CoreState, LoadLanguage, LoadUrlFailed } from '../store';

@Injectable({ providedIn: 'root' })
export class CoreService {
  constructor(private _store: Store, private _actions: Actions) {}

  get languageCode() {
    return this._store.selectSnapshot(CoreState.getLanguage);
  }

  loadLanguage(languageCode: LanguageCode) {
    this._store.dispatch(new LoadLanguage({ languageCode }));
  }

  dispatchLoadUrlFailed() {
    this._store.dispatch(new LoadUrlFailed());
  }

  onLoadLanguage() {
    return this._actions.pipe<LoadLanguage>(ofActionSuccessful(LoadLanguage));
  }

  onLoadUrlFailed() {
    return this._actions.pipe(ofActionSuccessful(LoadUrlFailed));
  }
}
