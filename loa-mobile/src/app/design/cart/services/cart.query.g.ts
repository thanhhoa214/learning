import * as Types from '@loa-shared/models/graphql.model';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CartQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CartQuery = {
  cart?: Types.Maybe<
    { __typename?: 'CartNode' } & {
      details: Array<
        { __typename?: 'CartDetailNode' } & {
          design: { __typename?: 'DesignNode' } & Pick<
            Types.DesignNode,
            | 'id'
            | 'projectName'
            | 'style'
            | 'area'
            | 'price'
            | 'promotionalPrice'
            | 'designType'
            | 'typeOfHouse'
            | 'thumbnail'
            | 'tower'
            | 'unitType'
            | 'registeredDesignNumber'
          > & {
              room?: Types.Maybe<
                { __typename?: 'DesignRoomNode' } & Pick<
                  Types.DesignRoomNode,
                  'roomType'
                >
              >;
            };
        }
      >;
    }
  >;
};

export const CartDocument = gql`
  query Cart {
    cart {
      details {
        design {
          id
          projectName
          style
          area
          price
          promotionalPrice
          designType
          typeOfHouse
          thumbnail
          tower
          unitType
          registeredDesignNumber
          room {
            roomType
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CartGQL extends Apollo.Query<CartQuery, CartQueryVariables> {
  document = CartDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
