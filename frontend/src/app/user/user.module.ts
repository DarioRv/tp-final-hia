import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PasswordUpdateFormComponent } from './components/password-update-form/password-update-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordUpdatePageComponent } from './pages/password-update-page/password-update-page.component';
import { ConfirmDeleteAccountDialogComponent } from './components/confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { UserDataUpdateFormComponent } from './components/user-data-update-form/user-data-update-form.component';
import { UpdateUserDataPageComponent } from './pages/update-user-data-page/update-user-data-page.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    PasswordUpdateFormComponent,
    PasswordUpdatePageComponent,
    ConfirmDeleteAccountDialogComponent,
    UserDataUpdateFormComponent,
    UpdateUserDataPageComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [UserMenuComponent],
})
export class UserModule {}
