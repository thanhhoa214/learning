import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import {
  Query as ParentQuery,
  QueryDesignsBookmarksArgs,
} from "@loa-shared/models/graphql.model";

const loadMoreBookmarkDesign = gql`
  query LoadMoreBookmarkDesign(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $userId: String
    $searchBy: String
  ) {
    __typename
    designsBookmarks(
      orderBy: "-id"
      before: $before
      after: $after
      first: $first
      last: $last
      userId: $userId
      searchBy: $searchBy
    ) {
      edges {
        node {
          id
          user {
            avatar
            email
            id
            firstName
            lastName
            phone
          }
          design {
            id
            projectName
            thumbnail
            wholeHouse {
              edges {
                node {
                  id
                  roomType
                  preview {
                    id
                    image
                  }
                }
              }
            }
            room {
              id
              size
              roomType
              preview {
                image
                id
              }
            }
            style
            area
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
export class LoadMoreBookmarkDesignQuery extends Query<
  ParentQuery,
  QueryDesignsBookmarksArgs
> {
  document = loadMoreBookmarkDesign;
}
