import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DesignOrderCreateMutationVariables = Types.Exact<{
  input: Types.DesignOrderCreateInput;
}>;

export type DesignOrderCreateMutation = {
  designOrderCreate?: Types.Maybe<
    { __typename?: 'DesignOrderCreatePayload' } & Pick<
      Types.DesignOrderCreatePayload,
      'status'
    > & {
        errors?: Types.Maybe<
          Array<
            { __typename?: 'CustomizeMutationErrorType' } & Pick<
              Types.CustomizeMutationErrorType,
              'code' | 'message' | 'field'
            >
          >
        >;
        order?: Types.Maybe<
          { __typename?: 'OrderNode' } & Pick<Types.OrderNode, 'id'> & {
              details: { __typename?: 'OrderDetailNodeConnection' } & {
                edges: Array<
                  Types.Maybe<
                    { __typename?: 'OrderDetailNodeEdge' } & {
                      node?: Types.Maybe<
                        { __typename?: 'OrderDetailNode' } & {
                          design: { __typename?: 'DesignNode' } & Pick<
                            Types.DesignNode,
                            'id'
                          >;
                        }
                      >;
                    }
                  >
                >;
              };
            }
        >;
      }
  >;
};

export const DesignOrderCreateDocument = gql`
  mutation designOrderCreate($input: DesignOrderCreateInput!) {
    designOrderCreate(input: $input) {
      status
      errors {
        code
        message
        field
      }
      order {
        id
        details {
          edges {
            node {
              design {
                id
              }
            }
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DesignOrderCreateGQL extends Apollo.Mutation<
  DesignOrderCreateMutation,
  DesignOrderCreateMutationVariables
> {
  document = DesignOrderCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
