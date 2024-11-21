import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  static containsCapitalLetter(control: AbstractControl): ValidationErrors | null {
    if (!/[A-Z]/.test(control.value)) {
      return { containsCapitalLetter: true };
    }
    return null;
  };

  static containsLetters(control: FormControl): ValidationErrors | null {
    if (!/[a-z]/.test(control.value)) {
      return { containsLetters: true };
    }
    return null;
  }

  static containsSpecialCharacters(control: FormControl): ValidationErrors | null {
    if (!/[!@#\$%\^&]/.test(control.value)) {
      return { containsSpecialCharacters: true };
    }
    return null;
  }
}
