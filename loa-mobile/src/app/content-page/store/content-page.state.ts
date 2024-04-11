import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ClearContentPage, LoadContentPage } from './content-page.actions';
import { tap } from 'rxjs/operators';
import { GetContentPageGQL, GetContentPageQuery } from '../services';
import { isEquals } from '@loa-mobile/shared/utils';

export class ContentPageStateModel {
  contentPage?: GetContentPageQuery['contentPage'];
}

const defaults = {};

@State<ContentPageStateModel>({
  name: 'contentPage',
  defaults,
})
@Injectable()
export class ContentPageState {
  @Selector()
  static contentPage({ contentPage }: ContentPageStateModel) {
    return contentPage;
  }
  @Selector()
  static contentPageId({ contentPage }: ContentPageStateModel) {
    return contentPage.id;
  }

  constructor(private _contentPageQuery: GetContentPageGQL) {}

  @Action(LoadContentPage)
  loadContentPage(
    { getState, patchState }: StateContext<ContentPageStateModel>,
    { payload }: LoadContentPage
  ) {
    const state = getState();
    return this._contentPageQuery.fetch(payload).pipe(
      tap(({ data }) => {
        const { contentPage } = data;

        if (isEquals(contentPage, state.contentPage)) return;
        patchState({ contentPage });
      })
    );
  }

  @Action(ClearContentPage)
  clear({ patchState }: StateContext<ContentPageStateModel>) {
    patchState({ contentPage: undefined });
  }
}
