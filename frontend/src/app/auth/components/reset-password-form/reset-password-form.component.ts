import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../../validators/password-validators';
import { AuthenticationService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styles: [
  ]
})
export class ResetPasswordFormComponent implements OnInit {
  token: string = '';
  hidePasswordFieldOne = true;
  hidePasswordFieldTwo = true;
  isSubmitting: boolean = false;
  @Output()
  statusEvent = new EventEmitter<'success' | 'error' | 'fail' | 'pending'>();

  resetPasswordForm: FormGroup = this.formBuilder.group({
    passwordOne: ['', [Validators.required,
                      Validators.minLength(6),
                      PasswordValidators.containsCapitalLetter,
                      PasswordValidators.containsLetters,
                      PasswordValidators.containsSpecialCharacters
                    ]
                  ],
    passwordTwo: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({token}) => {
      this.token = token;
    });
  }

  get passwordOne() {
    return this.resetPasswordForm.get('passwordOne') as FormControl;
  }

  get passwordTwo() {
    return this.resetPasswordForm.get('passwordTwo') as FormControl;
  }

  /**
   * Checks if the password fields are equals
   * @returns true if the password fields are equals, false otherwise
   */
  arePasswordFieldsEquals(): boolean {
    return this.passwordOne?.value === this.passwordTwo?.value;
  }

  /**
   * Sets the error in the passwordTwo field
   */
  setPasswordsError(): void {
    this.passwordTwo?.setErrors({ notEqual: true });
  }

  /**
   * Submits the form if it is valid and the password fields are equals
   * Emits the password to the parent component
   */
  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    if (!this.arePasswordFieldsEquals()) {
      this.setPasswordsError();
      return;
    }

    this.isSubmitting = true;
    this.resetPassword(this.passwordOne.value);
  }

  resetPassword(newPassword: string): void {
    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.statusEvent.emit('success');
      },
      error: (err) => {
        if (err.status === 0) {
          this.isSubmitting = false;
          this.statusEvent.emit('error');
          return;
        }
        this.isSubmitting = false;
        this.statusEvent.emit('fail');
      }
    });
  }
}
