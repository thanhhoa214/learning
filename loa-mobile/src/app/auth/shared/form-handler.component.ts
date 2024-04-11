import { FormGroup } from '@angular/forms';
import { SubSinkable } from '@loa-shared/models';
import { FieldType } from './models';
import {
  getErrorMessage,
  getErrorMessageForgotPassword,
  getErrorMessageLogin,
} from './utils';

export abstract class FormHandlerComponent extends SubSinkable {
  formGroup: FormGroup;

  getErrorMessage(field: any): string {
    const formField = this.formGroup.get(field);
    return getErrorMessage(field, formField);
  }

  getErrorMessageLogin(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessageLogin(field, formField);
  }

  getErrorMessageForgotPassword(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessageForgotPassword(field, formField);
  }
}
