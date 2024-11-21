import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUserRequest } from '../../interfaces/update-user-request.interface';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'user-data-update-form',
  templateUrl: './user-data-update-form.component.html',
  styles: [
  ]
})
export class UserDataUpdateFormComponent implements OnInit {
  userData = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
  });
  isLoading: boolean = false;

  @Output()
  requestFinishedEvent = new EventEmitter<'success' | 'fail' | 'error'>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.setUserData();
  }

  /**
   * Set the user data in the form
   */
  setUserData(): void {
    const user = this.authService.currentUser();
    this.lastName.setValue(user?.nombre.split(' ')[0]);
    this.name.setValue(user?.nombre.split(' ')[1]);
  }

  get name(): FormControl {
    return this.userData.get('name') as FormControl;
  }

  get lastName(): FormControl {
    return this.userData.get('lastName') as FormControl;
  }

  /**
   * Handle the form submission
   */
  onSubmit(): void {
    this.isLoading = true;
    if (this.userData.invalid) {
      this.userData.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    this.updateUserData({
      id: this.authService.currentUser()!.id,
      nombre: `${this.lastName.value} ${this.name.value}`
    });
  }

  /**
   * Method to update the user data
   * @param userData The user data to update
   */
  updateUserData(userData: UpdateUserRequest): void {
    this.userService.updateUser(userData).subscribe({
      next: () => {
        this.snackbarService.showSnackbar('Tus datos han sido actualizados correctamente');
        this.isLoading = false;
        this.requestFinishedEvent.emit('success');
      },
      error: (err) => {
        this.snackbarService.showSnackbar('Ha ocurrido un error al actualizar tus datos, intenta más tarde');
        this.isLoading = false;
        this.requestFinishedEvent.emit('error');
      }
    });
  }
}
