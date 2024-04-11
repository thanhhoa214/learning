import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteCommentDesignMutationVariables = Types.Exact<{
  input: Types.UserDeleteQuestionInput;
}>;

export type DeleteCommentDesignMutation = {
  designUserDeleteQuestion?: Types.Maybe<
    { __typename?: 'UserDeleteQuestionPayload' } & Pick<
      Types.UserDeleteQuestionPayload,
      'status'
    >
  >;
};

export const DeleteCommentDesignDocument = gql`
  mutation DeleteCommentDesign($input: UserDeleteQuestionInput!) {
    designUserDeleteQuestion(input: $input) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteCommentDesignGQL extends Apollo.Mutation<
  DeleteCommentDesignMutation,
  DeleteCommentDesignMutationVariables
> {
  document = DeleteCommentDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
