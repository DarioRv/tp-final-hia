import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ManualPageComponent } from './pages/manual-page/manual-page.component';
import { ChangeLogPageComponent } from './pages/change-log-page/change-log-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        title: 'Inicio | ASIST.IO',
      },
      {
        path: 'manual',
        component: ManualPageComponent,
        title: 'Manual de usuario | ASIST.IO',
      },
      {
        path: 'change-log',
        component: ChangeLogPageComponent,
        title: 'Actualizaciones | ASIST.IO',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
