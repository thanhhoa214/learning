import { QueryDesignsQaArgs } from '@loa-shared/models/graphql.model';

const enum AddminActions {
  LOAD_QUESTIONS = '[Admin Question Answer] Load Question Answer',
}

export class LoadQuestionAnswer {
  static readonly type = AddminActions.LOAD_QUESTIONS;
  constructor(public readonly payload?: QueryDesignsQaArgs) {}
}
