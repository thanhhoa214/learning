import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import {
  Query as ParentQuery,
  QueryDesignsPurchasedArgs,
} from "@loa-shared/models/graphql.model";

const getAllShareDesignConstructor = gql`
  query AllShareDesignConstructor(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $orderBy: String
  ) {
    designsHistoryShareWithCc(
      orderBy: $orderBy
      last: $last
      after: $after
      first: $first
      before: $before
    ) {
      edges {
        node {
          area
          id
          registeredDesignNumber
          projectName
          price
          style
          thumbnail
          share(orderBy: "-id") {
            edges {
              node {
                created
                read
                id
                constructor {
                  avatar
                  id
                  firstName
                  lastName
                  constructor {
                    companyName
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
@Injectable({ providedIn: "root" })
export class GetAllShareDesignConstructor extends Query<
  ParentQuery,
  QueryDesignsPurchasedArgs
> {
  document = getAllShareDesignConstructor;
}
