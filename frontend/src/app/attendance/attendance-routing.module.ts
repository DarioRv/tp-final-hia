import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAttendancePageComponent } from './pages/register-attendance-page/register-attendance-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AttendanceHistoryPageComponent } from './pages/attendance-history-page/attendance-history-page.component';
import { CodeIntroductionPageComponent } from './pages/code-introduction-page/code-introduction-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'code/:attendanceCode',
        component: RegisterAttendancePageComponent
      },
      {
        path: 'history',
        component: AttendanceHistoryPageComponent
      },
      {
        path: 'introduce-code',
        component: CodeIntroductionPageComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
