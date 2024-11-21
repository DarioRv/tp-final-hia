import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'email-resend-form',
  templateUrl: './email-resend-form.component.html',
  styles: [],
})
export class EmailResendFormComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private snackbarService: SnackbarService
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  /**
   * Resend the verification email
   * @param email The email to resend the verification email
   */
  resendEmail(email: string): void {
    this.isSubmitting = true;
    this.authService.resendVerificationEmail(email).subscribe({
      next: () => {
        this.snackbarService.showSnackbar(
          'Email de verificación reenviado',
          'Cerrar',
          8000
        );
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.showSnackbar(err.error.message, 'Cerrar', 8000);
        this.isSubmitting = false;
      },
    });
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    if (this.email.invalid) {
      this.email.markAllAsTouched();
      this.snackbarService.showSnackbar(
        'El formulario tiene errores',
        'Cerrar',
        8000
      );
      return;
    }
    this.resendEmail(this.email.value);
  }
}
