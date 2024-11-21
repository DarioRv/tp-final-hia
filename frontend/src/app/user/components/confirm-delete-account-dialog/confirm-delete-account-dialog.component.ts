import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-confirm-delete-account-dialog',
  templateUrl: './confirm-delete-account-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDeleteAccountDialogComponent {
  password: FormControl = new FormControl('', [Validators.required]);
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { correo: string },
    private userService: UserService,
    private authService: AuthenticationService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  /**
   * Close the dialog with false value
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Confirm the deletion of the account
   */
  onConfirm(): void {
    if (this.password.invalid) {
      this.password.markAllAsTouched();
      return;
    }

    this.deleteAccount();
  }

  /**
   * Delete the account of the current user
   */
  deleteAccount(): void {
    this.loading = true;
    this.userService.deleteAccount(this.data.correo, this.password.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.loading = false;
        this.signOut();
        this.snackbarService.showSnackbar('Cuenta eliminada correctamente');
      },
      error: (err) => {
        if (err.status === 0) {
          this.snackbarService.showSnackbar('No se pudo conectar con el servidor', 'Cerrar', 8000);
          this.loading = false;
          return;
        }

        const passwordErrorMessage = 'La contraseña ingresada no coincide con la contraseña del usuario';
        if (err.error.error === passwordErrorMessage) {
          this.password.setErrors({ incorrect: true });
          this.loading = false;
          return;
        }

        this.snackbarService.showSnackbar('Error al eliminar la cuenta');
        this.loading = false;
      }
    });
  }

  /**
   * Sign out the current user and navigate to the home page
   */
  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

}
