import { Injectable } from '@angular/core';
import { MenuService } from '@loa-mobile/menu/menu.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { QuestionAnswerStateModel, initialState } from './question-answer-state.model';
import { LoadQuestionAnswer} from './question-answer.actions';

@Injectable({ providedIn: 'root' })
@State<QuestionAnswerStateModel>({
  name: 'myQuestionAnswer',
  defaults: initialState,
})
export class QuestionAnswerState {
  @Selector()
  static getNodeConnection({ nodeConnection }: QuestionAnswerStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: QuestionAnswerStateModel) {
    return selectedNode;
  }

  constructor(private _apiService: MenuService) {}

  @Action(LoadQuestionAnswer, { cancelUncompleted: true })
  loadQuestionAnswer(
    { patchState }: StateContext<QuestionAnswerStateModel>,
    { payload }: LoadQuestionAnswer
  ) {
    return this._apiService.getAllQuestionAnswer({ ...payload })
      .pipe(
        tap(({ data }) => {
            patchState({
                nodeConnection: data.designsQA,
            });
        })
      );
    }

}