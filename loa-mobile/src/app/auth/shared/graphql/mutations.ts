import { gql } from 'apollo-angular';

export const registerCustomer = gql`
  mutation authRegisterCustomer($input: RegisterCustomerInput!) {
    authRegisterCustomer(input: $input) {
      status
      user {
        id
        firstName
        lastName
        email
      }
      errors {
        code
        message
        field
      }
    }
  }
`;

export const forgotPassword = gql`
  mutation authForgotPassword($input: ForgotPasswordInput!) {
    authForgotPassword(input: $input) {
      status
      errors {
        code
        message
        field
      }
    }
  }
`;

export const forgotPasswordVerify = gql`
  mutation authConfirmForgotPassword($input: ConfirmForgotPasswordInput!) {
    authConfirmForgotPassword(input: $input) {
      status
      errors {
        code
        message
        field
      }
    }
  }
`;

export const resetPassword = gql`
  mutation userResetPassword($input: ResetPasswordInput!) {
    userResetPassword(input: $input) {
      status
      errors {
        code
        message
        field
      }
    }
  }
`;

export const changePassword = gql`
  mutation userChangePassword($input: ChangePasswordInput!) {
    userChangePassword(input: $input) {
      status
      errors {
        message
        field
      }
    }
  }
`;
