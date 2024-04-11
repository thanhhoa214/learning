export interface LoginError {
  invalidAsync?: boolean;
}

export namespace FormFieldErrors {
  export interface Required {
    required: boolean;
  }
  export interface Email {
    email: boolean;
  }
  export interface MinLength {
    minlength: {
      requiredLength: number;
      actualLength: number;
    };
  }
  export interface Matched {
    isMatching: boolean;
  }
  export interface MaxLength {
    maxlength: {
      requiredLength: number;
      actualLength: number;
    };
  }

  export interface Valid {
    valid: boolean;
  }

  export interface Unique {
    unique: boolean;
  }

  export interface NotFound {
    found: boolean;
  }
}
