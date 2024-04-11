import {
  DesignQuestionAndAnswerNodeConnection,
  DesignQuestionAndAnswerNode,
} from '@loa-shared/models/graphql.model';

export interface QuestionAnswerStateModel {
  nodeConnection?: DesignQuestionAndAnswerNodeConnection;
  selectedNode?: DesignQuestionAndAnswerNode;
}

export const initialState: QuestionAnswerStateModel = {};
