import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { EmailResendFormComponent } from './components/email-resend-form/email-resend-form.component';
import { ResetPasswordPageComponent } from './pages/reset-password/reset-password-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';



@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    LayoutPageComponent,
    VerifyEmailPageComponent,
    EmailResendFormComponent,
    ResetPasswordPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [CookieService]
})
export class AuthModule { }
