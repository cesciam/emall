import { FormGroup, ValidatorFn } from '@angular/forms';

export function equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
    const isMatch = target.value === toMatch.value;

    if (!isMatch && target.valid && toMatch.valid) {
      toMatch.setErrors({ 'DoNotMatch': true });
      return { 'DoNotMatch': true };
    }

    return;
  };
}
