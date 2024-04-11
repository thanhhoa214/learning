import { FormGroup } from '@angular/forms';
import { FieldType } from './models';
import { getErrorMessage } from './utils';

export abstract class FormHandlerComponent {
  formGroup: FormGroup;

  getErrorMessage(field: FieldType): string {
    const formField = this.formGroup.get(field);
    return getErrorMessage(field, formField);
  }
}
