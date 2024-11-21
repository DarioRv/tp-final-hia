import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthUser } from '../../interfaces/auth-user.interface';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in-page.component.html',
  styles: [
    `
      .sign-in {
        min-height: calc(100vh - 64px);
      }
    `,
  ],
})
export class SignInPageComponent {
  signInForm: FormGroup;
  hide = true;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private snackbarService: SnackbarService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  getFormData() {
    return {
      correo: this.email?.value,
      contrasena: this.password?.value,
    } as AuthUser;
  }

  /**
   * Method to submit the form and login the user
   */
  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isSubmitting = true;
      this.login();
    } else {
      this.snackbarService.showSnackbar('Por favor, rellene los campos');
      this.signInForm.markAllAsTouched();
    }
  }

  /**
   * Method to login and redirect to the dashboard if the user is authenticated successfully
   * or show a snackbar if the user could not be authenticated
   */
  login(): void {
    this.authService.authenticateUser(this.getFormData()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status == 0) {
          this.snackbarService.showSnackbar(
            'No se pudo conectar con el servidor',
            'OK',
            8000
          );
        } else {
          this.snackbarService.showSnackbar(err.error.mensaje, 'OK', 8000);
        }
        this.isSubmitting = false;
      },
    });
  }
}
