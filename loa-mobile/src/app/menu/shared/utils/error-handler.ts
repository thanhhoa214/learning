import { AbstractControl } from '@angular/forms';
import {
  ConfirmPasswordFieldErrors,
  PasswordFieldErrors,
} from '@loa-mobile/auth/shared/models';

export function getErrorMessage(field: any, formField: AbstractControl) {
  const EMPTY = '';
  if (formField.valid || !formField.touched || !formField.errors) {
    return EMPTY;
  }
  const { errors } = formField;
  switch (field) {
    case 'password': {
      const { required, minlength, valid } = errors as PasswordFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (!valid) {
        return 'MESSAGE.AUTH.password.invalid';
      }
      return EMPTY;
    }
    case 'confirmPassword': {
      const {
        required,
        minlength,
        isMatching,
      } = errors as ConfirmPasswordFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (!isMatching) {
        return 'MESSAGE.AUTH.password.not_matched';
      }
      return EMPTY;
    }
    case 'newPassword': {
      const { required, minlength, isMatching } = errors as any;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (!isMatching) {
        return 'MESSAGE.AUTH.password.matched';
      }
      return EMPTY;
    }
  }
}
