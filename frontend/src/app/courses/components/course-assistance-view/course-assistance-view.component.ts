import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { AttendanceService } from '../../services/attendance.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'course-assistance-view',
  templateUrl: './course-assistance-view.component.html',
  styles: [],
})
export class CourseAssistanceViewComponent {
  @Input({ required: true, alias: 'courseData' })
  course!: Course;

  constructor(
    private attendanceService: AttendanceService,
    private snackbarService: SnackbarService
  ) {}

  /**
   * Downloads the attendance of the day
   */
  donwloadAttendance(): void {
    this.attendanceService
      .downloadStudentsAttendance(this.course.id)
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
            'La asistencia del día se ha descargado'
          );
        },
        error: () => {
          this.snackbarService.showSnackbar(
            'Ocurrió un error al descargar la asistencia'
          );
        },
      });
  }
}
