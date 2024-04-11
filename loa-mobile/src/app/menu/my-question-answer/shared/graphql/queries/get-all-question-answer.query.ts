import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Query as ParentQuery,
  QueryDesignsQaArgs,
} from '@loa-shared/models/graphql.model';

const getAllQuestionAnswer = gql`
  query AllQuestionAnswer(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $searchBy: String
    $orderBy: String
    $designId: String
    $userId: String
    $level: Int
    $comment: String
    $status: String
  ) {
    designsQA(
      before: $before
      after: $after
      first: $first
      last: $last
      searchBy: $searchBy
      orderBy: $orderBy
      designId: $designId
      userId: $userId
      level: $level
      comment: $comment
      status: $status
    ) {
      edges {
        cursor
        node {
          comment
          created
          id
          level
          status
          answer {
            edges {
              cursor
              node {
                comment
                created
                id
                level
                design {
                  projectName
                  area
                  id
                }
                user {
                  avatar
                  id
                  lastName
                  phone
                  firstName
                  email
                  userType
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
          user {
            firstName
            lastName
            phone
            email
            avatar
          }
          design {
            room {
              id
              preview {
                id
                image
              }
            }
            wholeHouse {
              edges {
                node {
                  preview {
                    id
                    image
                  }
                  id
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
            projectName
            id
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
@Injectable({ providedIn: 'root' })
export class GetAllQuestionAnswer extends Query<
  ParentQuery,
  QueryDesignsQaArgs
> {
  document = getAllQuestionAnswer;
}
