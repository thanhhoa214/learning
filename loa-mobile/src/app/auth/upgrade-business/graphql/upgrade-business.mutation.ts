import { Injectable } from '@angular/core';
import { Mutation, MutationAuthUpgradeBusinessArgs } from '@loa-shared/models/graphql.model';
import { Mutation as ApolloMutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class AdminUpgradeBusinessMutation extends ApolloMutation<
  Mutation,
  MutationAuthUpgradeBusinessArgs
> {
  document = gql`
    mutation AdminUpgradeBusinessMutation($input: UpgradeBusinessInput!){
      authUpgradeBusiness(input: $input) {
            errors {
              code
              field
              message
            }
            status
            business {
              businessType
              companyName
              companyPhone
              id
              registerationNumber
              taxCode
            }
        }
    }
  `;
}