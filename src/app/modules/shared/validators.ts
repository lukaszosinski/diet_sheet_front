import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function matchingPasswordsValidator(control: FormGroup): null {
  const errorKey = 'passwordsVary';
  const passwordControl = control.get('password') as AbstractControl;
  const confirmPasswordControl = control.get('confirmPassword') as AbstractControl;

  const errors = { ...confirmPasswordControl.errors };
  if (passwordControl.touched || !!confirmPasswordControl.value) {
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ ...errors, [errorKey]: true });
    } else {
      setErrorsWithoutKey(confirmPasswordControl, errors, errorKey);
    }
  }
  return null;
}

function setErrorsWithoutKey(control: AbstractControl, errors: ValidationErrors | null, errorKey: string): void {
  if (!!errors) {
    delete errors[errorKey];
    if (!!Object.keys(errors)) {
      errors = null;
    }
  }
  control.setErrors(errors);
}
