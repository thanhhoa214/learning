import {
  EmailFieldErrors,
  PasswordFieldErrors,
  FieldType,
  ConfirmPasswordFieldErrors,
} from '../models';
import { AbstractControl } from '@angular/forms';

export function getErrorMessage(field: FieldType, formField: AbstractControl) {
  const EMPTY = '';
  if (formField.valid || !formField.touched || !formField.errors) {
    return EMPTY;
  }
  const { errors } = formField;
  switch (field) {
    case 'email': {
      const { required, email, unique, found } = errors as EmailFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.email.required';
      }
      if (email) {
        return 'MESSAGE.AUTH.email.invalid';
      }
      if (!unique) {
        return 'MESSAGE.AUTH.email.used';
      }

      if (!found) {
        return 'MESSAGE.AUTH.email.not_found';
      }
      return EMPTY;
    }
    case 'password': {
      const {
        required,
        minlength,
        invalidAsync,
      } = errors as PasswordFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (invalidAsync) {
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
  }
}

export function getErrorMessageLogin(
  field: FieldType,
  formField: AbstractControl
) {
  const EMPTY = '';
  if (formField.valid || !formField.touched || !formField.errors) {
    return EMPTY;
  }
  const { errors } = formField;
  switch (field) {
    case 'email': {
      const { required, email, unique, found } = errors as EmailFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.email.required';
      }
      if (email) {
        return 'MESSAGE.AUTH.email.invalid';
      }
      if (!unique) {
        return 'MESSAGE.AUTH.email.used';
      }

      if (!found) {
        return 'MESSAGE.AUTH.email.not_found';
      }
      return EMPTY;
    }
    case 'password': {
      const {
        required,
        minlength,
        invalidAsync,
      } = errors as PasswordFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (invalidAsync) {
        return 'MESSAGE.AUTH.password.invalid';
      }
      return EMPTY;
    }
  }
}

export function getErrorMessageForgotPassword(
  field: FieldType,
  formField: AbstractControl
) {
  const EMPTY = '';
  if (formField.valid || !formField.touched || !formField.errors) {
    return EMPTY;
  }
  const { errors } = formField;
  switch (field) {
    case 'email': {
      const { required, email, found } = errors as EmailFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.email.required';
      }
      if (email) {
        return 'MESSAGE.AUTH.email.invalid';
      }
      if (!found) {
        return 'MESSAGE.AUTH.email.not_found';
      }
      return EMPTY;
    }
    case 'password': {
      const {
        required,
        minlength,
        invalidAsync,
      } = errors as PasswordFieldErrors;
      if (required) {
        return 'MESSAGE.AUTH.password.required';
      }
      if (minlength) {
        return 'MESSAGE.AUTH.password.minlength';
      }
      if (invalidAsync) {
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
  }
}
