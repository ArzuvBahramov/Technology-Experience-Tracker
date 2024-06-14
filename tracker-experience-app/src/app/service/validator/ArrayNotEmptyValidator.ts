import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function arrayNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const array = control.value as any[];
    if (!array || array.length === 0) {
      return { 'arrayEmpty': true };
    }
    return null;
  };
}
