import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { UpdatePasswordRequest } from '../../interfaces/update-password-request.interface';
import { PasswordValidators } from 'src/app/auth/validators/password-validators';

@Component({
  selector: 'password-update-form',
  templateUrl: './password-update-form.component.html',
  styles: [],
})
export class PasswordUpdateFormComponent {
  updatePasswordForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        PasswordValidators.containsCapitalLetter,
        PasswordValidators.containsLetters,
        PasswordValidators.containsSpecialCharacters,
      ],
    ],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  isSubmitting = false;

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  @Output()
  statusEvent = new EventEmitter<'pending' | 'success' | 'fail' | 'error'>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  get currentPassword(): FormControl {
    return this.updatePasswordForm.get('currentPassword') as FormControl;
  }

  get newPassword(): FormControl {
    return this.updatePasswordForm.get('newPassword') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.updatePasswordForm.get('confirmPassword') as FormControl;
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    this.isSubmitting = true;
    if (this.updatePasswordForm.invalid) {
      this.updatePasswordForm.markAllAsTouched();
      this.isSubmitting = false;
      return;
    }

    if (!this.areFieldsEqual()) {
      this.setFieldEqualityError();
      this.isSubmitting = false;
      return;
    }
    this.updatePassword();
  }

  /**
   * Get the form value and build the request body
   */
  get formValue(): UpdatePasswordRequest {
    const requestBody: UpdatePasswordRequest = {
      correo: this.authService.currentUser()!.correo,
      contrasenaActual: this.currentPassword.value,
      contrasenaNueva: this.newPassword.value,
    };

    return requestBody;
  }

  /**
   * Update the user password
   */
  updatePassword(): void {
    const requestBody = this.formValue;

    this.userService.updatePassword(requestBody).subscribe({
      next: () => {
        this.updatePasswordForm.reset();
        this.isSubmitting = false;
        this.statusEvent.emit('success');
      },
      error: (err) => {
        if (err.status === 0) {
          this.statusEvent.emit('error');
          this.isSubmitting = false;
          return;
        }

        if (
          (err.error.message as string).includes(
            'La contraseña actual no coincide con la contraseña ingresada'
          )
        ) {
          this.currentPassword.setErrors({ incorrectPassword: true });
          this.isSubmitting = false;
          return;
        }

        this.statusEvent.emit('fail');
        this.isSubmitting = false;
      },
    });
  }

  areFieldsEqual(): boolean {
    return this.newPassword.value === this.confirmPassword.value;
  }

  setFieldEqualityError(): void {
    this.confirmPassword.setErrors({ notEqual: true });
  }
}
