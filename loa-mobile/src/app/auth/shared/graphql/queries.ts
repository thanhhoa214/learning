import gql from 'graphql-tag';

export const getProfile = gql`
  query userProfile {
    userProfile {
      id
      lastName
      firstName
      userType
      email
      phone
      avatar
      created
      loginMethod
      business {
        businessType
        companyName
        companyPhone
        registerationNumber
        taxCode
      }
    }
  }
`;
