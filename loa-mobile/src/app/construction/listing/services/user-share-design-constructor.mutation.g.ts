import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ShareDesignConstructorMutationMutationVariables = Types.Exact<{
  input: Types.ShareDesignCreateInput;
}>;

export type ShareDesignConstructorMutationMutation = {
  userShareDesignConstructor?: Types.Maybe<
    { __typename?: 'ShareDesignCreatePayload' } & Pick<
      Types.ShareDesignCreatePayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'field' | 'message'
            >
          >
        >;
      }
  >;
};

export const ShareDesignConstructorMutationDocument = gql`
  mutation ShareDesignConstructorMutation($input: ShareDesignCreateInput!) {
    userShareDesignConstructor(input: $input) {
      errors {
        code
        field
        message
      }
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ShareDesignConstructorMutationGQL extends Apollo.Mutation<
  ShareDesignConstructorMutationMutation,
  ShareDesignConstructorMutationMutationVariables
> {
  document = ShareDesignConstructorMutationDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
