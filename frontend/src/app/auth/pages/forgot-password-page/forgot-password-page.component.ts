import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  templateUrl: './forgot-password-page.component.html',
  styles: [
  ]
})
export class ForgotPasswordPageComponent {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  status: 'request email' | 'email sent' | 'error' = 'request email';

  constructor(private authService: AuthenticationService, private snackbarService: SnackbarService) { }

  onSubmit(): void {
    if (this.email.invalid) {
      this.snackbarService.showSnackbar('El email es inválido', 'Cerrar');
      return;
    }
    this.forgotPassword();
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.email.value).subscribe({
      next: () => {
        this.status = 'email sent';
      },
      error: (err) => {
        if (err.status == 0) {
          this.status = 'error';
          this.snackbarService.showSnackbar('No se ha podido establecer conexión con el servidor', 'Cerrar');
          return;
        }
        const emailErrorMessage = 'No existe un usuario con este correo';
        if (err.error.error == emailErrorMessage) {
          this.status = 'request email';
          this.setEmailDoesNotExistsError();
          this.snackbarService.showSnackbar(emailErrorMessage, 'Cerrar');
          return;
        }
        this.status = 'error';
        this.snackbarService.showSnackbar(`Ha ocurrido un error: ${err.error.error}`, 'Cerrar');
      }
    });
  }

  /**
   * Sets the email does not exists error
   */
  setEmailDoesNotExistsError(): void {
    this.email.setErrors({emailDoesNotExists: true});
  }
}
