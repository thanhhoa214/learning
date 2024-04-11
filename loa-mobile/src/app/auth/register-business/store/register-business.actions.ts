import { RegisterBusinessMutationVariables } from '@loa-mobile/auth/shared/services';
import {
  CustomizeMutationErrorType,
  LoginInput,
} from '@loa-shared/models/graphql.model';

const enum Actions {
  REGISTER_BUSINESS = '[REGISTER_BUSINESS] Register Business',
  REGISTER_BUSINESS_FAILED = '[REGISTER_BUSINESS] Register Business Failed',
  REGISTER_BUSINESS_SUCCESSFUL = '[REGISTER_BUSINESS] Register Business Successful',
}

export class RegisterBusiness {
  static readonly type = Actions.REGISTER_BUSINESS;
  constructor(public readonly payload: RegisterBusinessMutationVariables) {}
}

export class RegisterBusinessFailed {
  static readonly type = Actions.REGISTER_BUSINESS_FAILED;
  constructor(
    public readonly payload: { errors: CustomizeMutationErrorType[] }
  ) {}
}

export class RegisterBusinessSuccessful {
  static readonly type = Actions.REGISTER_BUSINESS_SUCCESSFUL;
  constructor(public readonly payload: LoginInput) {}
}
