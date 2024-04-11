import { State, Selector, Action, StateContext } from '@ngxs/store';
import { initialState, CoreStateModel } from './core-state.model';
import {
  LoadLanguage,
  ResetSearchQuery,
  UpdateSearchQuery,
} from './core.actions';
import { Injectable } from '@angular/core';
import { isEquals } from '../../shared/utils';
import { TranslateService } from '@ngx-translate/core';

@State<CoreStateModel>({
  name: 'core',
  defaults: initialState,
})
@Injectable({ providedIn: 'root' })
export class CoreState {
  constructor(private _translate: TranslateService) {}

  @Selector()
  static getLanguage(state: CoreStateModel) {
    return state.language;
  }
  @Selector()
  static getSearchQuery(state: CoreStateModel) {
    return state.searchQuery;
  }

  @Action(LoadLanguage)
  loadLanguage(
    context: StateContext<CoreStateModel>,
    { payload }: LoadLanguage
  ) {
    context.patchState({ language: payload.languageCode ?? 'en' });
    return this._translate.use(payload.languageCode);
  }

  @Action(UpdateSearchQuery)
  updateSearchQuery(
    { getState, patchState }: StateContext<CoreStateModel>,
    { payload }: UpdateSearchQuery
  ) {
    const { searchQuery } = getState();
    if (isEquals(searchQuery, payload.query)) {
      return;
    }
    patchState({ searchQuery: payload.query });
  }
  @Action(ResetSearchQuery)
  resetSearchQuery(context: StateContext<CoreStateModel>) {
    const { searchQuery } = context.getState();
    if (isEquals(searchQuery, '')) {
      return;
    }
    return context.dispatch(new UpdateSearchQuery({ query: '' }));
  }
}
