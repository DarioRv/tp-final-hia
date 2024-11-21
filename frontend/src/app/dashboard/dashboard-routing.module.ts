import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { checkAuthentication } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'start',
        component: HomePageComponent,
        data: { title: 'Guía rápida' },
        title: 'Guías | ASIST.IO',
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
        data: { title: 'Materias' },
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
        data: { title: 'Mi perfil' },
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'start',
      },
    ],
    canActivate: [checkAuthentication],
    canActivateChild: [checkAuthentication],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
