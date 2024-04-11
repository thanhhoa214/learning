import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RequestDesignMutationVariables = Types.Exact<{
  input: Types.DesignInquiryCreateInput;
}>;

export type RequestDesignMutation = {
  designInquiryCreate?: Types.Maybe<
    { __typename?: 'DesignInquiryCreatePayload' } & Pick<
      Types.DesignInquiryCreatePayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'message'
            >
          >
        >;
      }
  >;
};

export const RequestDesignDocument = gql`
  mutation RequestDesign($input: DesignInquiryCreateInput!) {
    designInquiryCreate(input: $input) {
      errors {
        code
        message
      }
      status
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RequestDesignGQL extends Apollo.Mutation<
  RequestDesignMutation,
  RequestDesignMutationVariables
> {
  document = RequestDesignDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
