import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../shared/shared.module';
import { GettingStartedGuideDialogComponent } from './components/getting-started-guide-dialog/getting-started-guide-dialog.component';
import { StudentsListGuideDialogComponent } from './components/students-list-guide-dialog/students-list-guide-dialog.component';
import { AttendanceGuideDialogComponent } from './components/attendance-guide-dialog/attendance-guide-dialog.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    GettingStartedGuideDialogComponent,
    StudentsListGuideDialogComponent,
    AttendanceGuideDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule,
    UserModule,
  ],
  providers: [CookieService],
})
export class DashboardModule {}
