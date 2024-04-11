import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControlOptions } from '@angular/forms';

export type TypedControls<T> = { [key in keyof T]: any };
export type TypedFormGroup<T> = FormGroup & {
  value: T;
  controls: TypedControls<T>;
};

@Injectable({ providedIn: 'root' })
export class TypedFormBuilder {
  constructor(private _formBuilder: FormBuilder) {}

  group<T>(
    controlsConfig: TypedControls<T>,
    options?: AbstractControlOptions | T | null
  ): TypedFormGroup<T> {
    return this._formBuilder.group(controlsConfig, options) as TypedFormGroup<
      T
    >;
  }
}

// @Component(...)
// export class LoginComponent {
//   formGroup:TypedFormGroup<LoginInput>

//   constructor(private _typedFormBuilder: TypedFormBuilder) {
//     this.formGroup = this._typedFormBuilder.group<{
//       email: string;
//       password: string;
//     }>({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//     console.log(this.formGroup.controls.email);
//   }
// }
