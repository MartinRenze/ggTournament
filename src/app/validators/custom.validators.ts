import { AbstractControl } from '@angular/forms';

export function crUrlValidator(control: AbstractControl) {
  if (!control.value.startsWith('https://link.clashroyale.com/invite/friend/') && !(control.value == "")) {
    return { urlValid: true };
  }
  return null;
}
