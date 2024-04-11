import {
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormControl,
} from "@angular/forms";
export * from "./constants";
export function getDistanceFromTop(element: HTMLElement) {
  if (element) {
    return window.pageYOffset + element.getBoundingClientRect().top;
  }
  return null;
}

export function isEquals(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function MatchValidator(
  matchTo: string // name of the control to match to
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
      ? null
      : { isMatching: false };
  };
}
export function NotMatchValidator(
  matchTo: string // name of the control to match to
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value != control.parent.controls[matchTo].value
      ? null
      : { isMatching: false };
  };
}
export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });
}

export function ValidValidator(
  value: boolean
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent && !!control.parent.value && value
      ? { valid: true }
      : { valid: false };
  };
}

export function UniqueEmailValidator(
  value: boolean
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent && !!control.parent.value && value
      ? { unique: true }
      : { unique: false };
  };
}

export function FindValidator(
  found: boolean // name of the control to match to
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent && !!control.parent.value && found === true
      ? null
      : { found: false };
  };
}

export function getDataURLFromFile(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (e) {
      reject(e.target.error);
    };
    reader.readAsDataURL(file);
  });
}

export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
