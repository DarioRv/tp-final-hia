import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { PasswordValidators } from '../../validators/password-validators';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up-page.component.html',
  styles: [
    `
      .sign-up {
        min-height: calc(100vh - 64px);
      }
    `,
  ],
})
export class SignUpPageComponent implements AfterViewInit {
  hide = true;
  isSubmitting: boolean = false;
  @ViewChild('alert')
  verifyEmailAlert?: ElementRef;

  public signUpForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        PasswordValidators.containsLetters,
        PasswordValidators.containsCapitalLetter,
        PasswordValidators.containsSpecialCharacters,
        Validators.minLength(6),
      ],
    ],
    lastname: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private snackbarService: SnackbarService
  ) {}

  ngAfterViewInit(): void {
    this.hideVerifyEmailAlert();
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get lastname() {
    return this.signUpForm.get('lastname');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  /**
   * Gets the user data from the form
   */
  get userData(): RegisterUser {
    const user = {
      correo: this.email?.value,
      contrasena: this.password?.value,
      nombre: `${this.lastname?.value} ${this.name?.value}`,
    } as RegisterUser;
    return user;
  }

  /**
   * Method to submit the form and register the user
   */
  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      this.register();
    } else {
      this.snackbarService.showSnackbar('Por favor, rellene los campos');
      this.hideVerifyEmailAlert();
      this.signUpForm.markAllAsTouched();
    }
  }

  /**
   * Method to register the user and redirect to the dashboard if the user is registered successfully
   */
  register(): void {
    this.authService.registerUser(this.userData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackbarService.showSnackbar('Usuario registrado correctamente');
        this.showVerifyEmailAlert();
      },
      error: (err) => {
        if (err.status == 0) {
          this.snackbarService.showSnackbar(
            'No se pudo conectar con el servidor',
            'OK',
            8000
          );
          this.isSubmitting = false;
          return;
        }
        this.snackbarService.showSnackbar(err.error.message, 'OK', 10000);
        this.isSubmitting = false;
        if (this.emailIsAlreadyTaken(err.error.error)) {
          this.setEmailError();
        }
        this.hideVerifyEmailAlert();
      },
    });
  }

  /**
   * checks if the email is already taken by comparing the error message from the server
   * @param errorMessage
   * @returns
   */
  emailIsAlreadyTaken(errorMessage: string): boolean {
    const emailTakenMessage = 'Ya existe un usuario con este correo';
    return errorMessage === emailTakenMessage;
  }

  /**
   * Sets the email error in the form control
   */
  setEmailError(): void {
    this.email?.setErrors({ emailTaken: true });
  }

  /**
   * Shows the verify email alert
   */
  showVerifyEmailAlert(): void {
    this.verifyEmailAlert?.nativeElement.classList.remove('hidden');
  }

  /**
   * Hides the verify email alert
   */
  hideVerifyEmailAlert(): void {
    this.verifyEmailAlert?.nativeElement.classList.add('hidden');
  }
}
