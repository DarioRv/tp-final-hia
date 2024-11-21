import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { RegisterAttendancePageComponent } from './pages/register-attendance-page/register-attendance-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AttendanceHistoryPageComponent } from './pages/attendance-history-page/attendance-history-page.component';
import { CodeIntroductionPageComponent } from './pages/code-introduction-page/code-introduction-page.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';


@NgModule({
  declarations: [
    RegisterAttendancePageComponent,
    LayoutPageComponent,
    AttendanceHistoryPageComponent,
    CodeIntroductionPageComponent,
    AttendanceFormComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AttendanceModule { }
