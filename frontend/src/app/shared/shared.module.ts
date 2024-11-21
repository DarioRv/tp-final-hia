import { NgModule } from '@angular/core';
import { MenubarComponent } from './components/menubar/menubar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ContentNotAvailableComponent } from './components/content-not-available/content-not-available.component';
import { BasicCardPlaceholderComponent } from './components/basic-card-placeholder/basic-card-placeholder.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { SnackbarService } from './services/snackbar.service';
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';
import { CommonModule } from '@angular/common';
import { AlertDirective } from './directives/alert.directive';
import { AlertErrorTitleDirective } from './directives/alert-error-title.directive';
import { AlertTitleDirective } from './directives/alert-title.directive';
import { AlertSuccessTitleDirective } from './directives/alert-success-title.directive';
import { AlertWarningTitleDirective } from './directives/alert-warning-title.directive';
import { AlertDescriptionDirective } from './directives/alert-description.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenubarComponent,
    ContentNotAvailableComponent,
    BasicCardPlaceholderComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    ThemeToggleButtonComponent,
    AlertDirective,
    AlertErrorTitleDirective,
    AlertTitleDirective,
    AlertSuccessTitleDirective,
    AlertWarningTitleDirective,
    AlertDescriptionDirective,
  ],
  imports: [CommonModule, PrimeNgModule, MaterialModule, RouterModule],
  exports: [
    MenubarComponent,
    BasicCardPlaceholderComponent,
    ContentNotAvailableComponent,
    LoaderComponent,
    ThemeToggleButtonComponent,
    AlertDirective,
    AlertErrorTitleDirective,
    AlertTitleDirective,
    AlertSuccessTitleDirective,
    AlertWarningTitleDirective,
    AlertDescriptionDirective,
  ],
  providers: [SnackbarService],
})
export class SharedModule {}
