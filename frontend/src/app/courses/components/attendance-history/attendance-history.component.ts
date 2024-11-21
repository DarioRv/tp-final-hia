import { Component, Inject, Input } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RequestStatus } from 'src/app/shared/types/request-status.type';
import { AttendanceService } from '../../services/attendance.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DataRow } from '../../interfaces/data-row.interface';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'course-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css'],
})
export class AttendanceHistoryComponent {
  @Input({ required: true })
  course!: Course;
  historialForm: FormGroup = this.fb.group({
    dateOne: ['', [Validators.required]],
    dateTwo: ['', [Validators.required]],
  });
  attendances: DataRow[] = [];
  displayedColumns: string[] = [];
  status: RequestStatus = 'no status';

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private snackbarService: SnackbarService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }

  get dateOne(): FormControl {
    return this.historialForm.get('dateOne') as FormControl;
  }

  get dateTwo(): FormControl {
    return this.historialForm.get('dateTwo') as FormControl;
  }

  onSubmit(): void {
    if (this.historialForm.invalid) {
      this.historialForm.markAllAsTouched();
      return;
    }

    this.getAttendanceHistory(
      this.course.id,
      this.dateOne.value,
      this.dateTwo.value
    );
  }

  getAttendanceHistory(
    courseId: string,
    dateOne: string,
    dateTwo: string
  ): void {
    this.attendanceService
      .getAttendaceHistory(courseId, dateOne, dateTwo)
      .subscribe({
        next: (att) => {
          this.displayedColumns = att[0];
          this.attendances = this.transformData(att);
        },
        error: (err) => {
          this.snackbarService.showSnackbar(
            'Ha ocurrido un error al obtener el historial de asistencias'
          );
        },
      });
  }

  transformData(data: string[][]): DataRow[] {
    const headers = data[0] as string[];
    const rows = data.slice(1) as string[][];

    return rows.map((row) => {
      const obj: DataRow = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  }

  isAnAttendance(attendance: string): boolean {
    return typeof attendance === 'boolean' && attendance === true;
  }

  isAnAbsence(attendance: string): boolean {
    return typeof attendance === 'boolean' && attendance === false;
  }

  downloadAttendaceHistory(): void {
    if (this.historialForm.invalid) {
      this.historialForm.markAllAsTouched();
      return;
    }

    this.attendanceService
      .downloadAttendaceHistory(
        this.course.id,
        this.dateOne.value,
        this.dateTwo.value
      )
      .subscribe({
        next: (blob) => {
          const fileUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = fileUrl;
          link.setAttribute('style', 'display: none');
          link.download = `asistencia-${this.course.nombre}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(fileUrl);
          link.remove();
          this.snackbarService.showSnackbar(
            'El historial de asistencias se ha descargado'
          );
        },
        error: () => {
          this.snackbarService.showSnackbar(
            'Ocurrió un error al descargar el historial de asistencias'
          );
        },
      });
  }
}
