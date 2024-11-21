import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { environment } from 'src/environments/environment';
import { CoursesDataService } from '../../services/courses-data.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'course-attendance-code',
  templateUrl: './attendance-code.component.html',
  styles: [],
})
export class AttendanceCodeComponent {
  @Input({ required: true })
  course!: Course;

  qrCodeUrl: string = '';
  seeQRCode: boolean = false;

  constructor(
    private courseDataService: CoursesDataService,
    private snackbarService: SnackbarService
  ) {}

  /**
   * Generates a new random code for the course
   */
  onChangeAttendanceCode(): void {
    this.courseDataService
      .generateAttendanceCode()
      .pipe(
        switchMap((attendanceCode) => {
          return this.courseDataService.updateCourse({
            ...this.course,
            codigoAsistencia: attendanceCode,
          });
        })
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSnackbar('Código de asistencia generado');
        },
        error: () => {
          this.snackbarService.showSnackbar(
            'No se pudo generar el código de asistencia'
          );
        },
      });
  }

  /**
   * Shows the QR code
   */
  showQRCode(): void {
    this.qrCodeUrl = `${environment.API_URL}/attendance/code/${this.course.codigoAsistencia}`;
    this.seeQRCode = !this.seeQRCode;
  }
}
