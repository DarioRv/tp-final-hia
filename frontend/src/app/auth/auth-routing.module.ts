import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { isAlreadyAuthenticated } from './guards/sign-in.guard';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password/reset-password-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInPageComponent,
        canActivate: [isAlreadyAuthenticated],
        title: 'Iniciar sesión | ASIST.IO',
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent,
        title: 'Registrarme | ASIST.IO',
      },
      {
        path: 'verify-email/:token',
        component: VerifyEmailPageComponent,
        title: 'Verificar cuenta | ASIST.IO',
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
        title: 'Olvidé mi contraseña | ASIST.IO',
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordPageComponent,
        title: 'Restaurar contraseña | ASIST.IO',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
