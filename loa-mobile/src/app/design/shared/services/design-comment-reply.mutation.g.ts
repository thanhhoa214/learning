import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ReplyCommentDesignMutationVariables = Types.Exact<{
  input: Types.AnswerDesignInput;
}>;

export type ReplyCommentDesignMutation = {
  designAnswer?: Types.Maybe<
    { __typename?: 'AnswerDesignPayload' } & Pick<
      Types.AnswerDesignPayload,
      'status'
    >
  >;
};

export const ReplyCommentDesignDocument = gql`
  mutation ReplyCommentDesign($input: AnswerDesignInput!) {
    designAnswer(input: $input) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ReplyCommentDesignGQL extends Apollo.Mutation<
  ReplyCommentDesignMutation,
  ReplyCommentDesignMutationVariables
> {
  document = ReplyCommentDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
