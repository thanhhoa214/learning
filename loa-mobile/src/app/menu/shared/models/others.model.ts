import { FormFieldErrors } from '../../../auth/shared/models';
import { LoginError } from './error-field.model';

export enum AuthErrorMessages {
  AUTH_LOGIN_001 = 'Email is required.',
  AUTH_LOGIN_002 = 'Email is invalid.',
  AUTH_LOGIN_003 = 'Password is required.',
  AUTH_LOGIN_004 = 'Password is at least 6 characters.',
  AUTH_LOGIN_005 = 'Password is not matched.',
  AUTH_LOGIN_006 = 'Confirm password is not matched.',
  AUTH_LOGIN_007 = 'Password is not correct or email is not registered.',
  AUTH_VERIFY_001 = 'Code is required.',
  AUTH_VERIFY_002 = 'Code is 6 characters.',
  AUTH_VERIFY_003 = 'Code is invalid or expired.',
  AUTH_VERIFY_004 = 'Email not found.',
  AUTH_REGISTER_001 = 'Email has been used.',
}

export type FieldType =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'name'
  | 'phone'
  | 'code';

export interface EmailFieldErrors
  extends FormFieldErrors.Required,
    FormFieldErrors.Email,
    FormFieldErrors.Unique,
    FormFieldErrors.Valid,
    FormFieldErrors.NotFound {}

export interface PasswordFieldErrors
  extends FormFieldErrors.Required,
    FormFieldErrors.MinLength,
    FormFieldErrors.Valid,
    LoginError {}

export interface ConfirmPasswordFieldErrors
  extends PasswordFieldErrors,
    FormFieldErrors.Matched {}

export interface CodeFieldErrors
  extends FormFieldErrors.Required,
    FormFieldErrors.MinLength,
    FormFieldErrors.MaxLength,
    FormFieldErrors.Valid {}
