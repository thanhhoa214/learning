import {
  RegisterCustomerInput,
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';

const enum Actions {
  REGISTER = '[REGISTER] Register',
  REGISTER_FAILED = '[REGISTER] Register Failed',
  REGISTER_SUCCESSFUL = '[REGISTER] Register Successful',
}

export class Register {
  static readonly type = Actions.REGISTER;
  constructor(public readonly payload: RegisterCustomerInput) {}
}
export class RegisterFailed {
  static readonly type = Actions.REGISTER_FAILED;
  constructor(
    public readonly payload: { errors: CustomizeMutationErrorType[] }
  ) {}
}

export class RegisterSuccessful {
  static readonly type = Actions.REGISTER_SUCCESSFUL;
  constructor(public readonly payload: LoginInput) {}
}
