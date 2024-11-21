import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AttendanceService } from '../../services/attendance.service';
import { SnackbarService } from '../../../../app/shared/services/snackbar.service';

@Component({
  selector: 'code-introduction-page',
  templateUrl: './code-introduction-page.component.html',
  styles: [],
})
export class CodeIntroductionPageComponent {
  form = this.formBuilder.group({
    code: ['', Validators.required],
  });

  isLoading = false;
  courseNotFound = false;

  constructor(
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  get code(): FormControl {
    return this.form.get('code') as FormControl;
  }

  /**
   * Submit the form and redirect to the register attendance page if the attendance code is valid
   */
  onSubmit(): void {
    this.isLoading = true;
    this.courseNotFound = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    this.findCourseByCode(this.code.value);
  }

  /**
   * Find a course by attendance code
   * @param code attendance code to use for the search
   */
  findCourseByCode(code: string): void {
    this.attendanceService.findCourseByCode(code).subscribe({
      next: (course) => {
        if (!course) {
          this.courseNotFound = true;
          this.isLoading = false;
          return;
        }
        this.redirectToRegisterAttendancePage(course.codigoAsistencia!);
        this.isLoading = false;
      },
      error: (err) => {
        this.snackbarService.showSnackbar(
          err.error.message || 'Error al buscar el curso'
        );
        this.isLoading = false;
      },
    });
  }

  /**
   * Redirect to the register attendance page
   * @param attendanceCode attendance code of the course
   */
  redirectToRegisterAttendancePage(attendanceCode: string): void {
    this.router.navigate(['/attendance/code', attendanceCode]);
  }
}
