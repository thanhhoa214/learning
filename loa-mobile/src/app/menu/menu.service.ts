import { Injectable } from '@angular/core';
import { GetAllQuestionAnswer } from './my-question-answer/shared/graphql/queries';
import { QueryDesignsQaArgs } from '@loa-shared/models/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _getAllQuestionAnswer: GetAllQuestionAnswer) {}

  getAllQuestionAnswer(args?: QueryDesignsQaArgs) {
    return this._getAllQuestionAnswer.watch(args).valueChanges;
  }
}
