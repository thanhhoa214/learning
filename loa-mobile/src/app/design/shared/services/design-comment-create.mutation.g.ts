import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCommentDesignMutationVariables = Types.Exact<{
  input: Types.QuestionDesignCreateInput;
}>;

export type CreateCommentDesignMutation = {
  designUserQuestion?: Types.Maybe<
    { __typename?: 'QuestionDesignCreatePayload' } & Pick<
      Types.QuestionDesignCreatePayload,
      'status'
    >
  >;
};

export const CreateCommentDesignDocument = gql`
  mutation CreateCommentDesign($input: QuestionDesignCreateInput!) {
    designUserQuestion(input: $input) {
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCommentDesignGQL extends Apollo.Mutation<
  CreateCommentDesignMutation,
  CreateCommentDesignMutationVariables
> {
  document = CreateCommentDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
