import { Injectable } from '@angular/core';
import { MatchValidator } from '../../shared/utils';
import { Resolve } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegisterBusinessFormResolver implements Resolve<any> {
  constructor(private _formBuilder: FormBuilder) {}

  resolve(): FormGroup {
    return this._formBuilder.group({
      businessType: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MatchValidator('password'),
        ],
      ],
      phone: [''],
      companyName: [''],
      companyPhone: [''],
      companyBusinessRegis: [''],
      companyTaxCode: [''],
    });
  }
}
