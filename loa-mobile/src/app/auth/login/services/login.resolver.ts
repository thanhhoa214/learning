import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Resolve } from '@angular/router';
import { TypedFormBuilder, TypedFormGroup } from './typed-form-builder.service';

interface LoginFormModel {
  email: string;
  password: string;
}
export type LoginFormGroup = TypedFormGroup<LoginFormModel>;

@Injectable({ providedIn: 'root' })
export class LoginResolver implements Resolve<LoginFormGroup> {
  constructor(private _typedFormBuilder: TypedFormBuilder) {}

  resolve(): LoginFormGroup {
    const formGroup = this._typedFormBuilder.group<LoginFormModel>({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    return formGroup;
  }
}
